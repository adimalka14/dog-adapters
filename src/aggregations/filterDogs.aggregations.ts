import { IDogQuery } from '../interfaces/dog.interface';
import { PipelineStage } from 'mongoose';

export function filterDogsAggregation(params: IDogQuery): PipelineStage[] {
    const { page = 1, itemsPerPage = 10 } = params;

    return [
        {
            $match: {
                ...((params.maxAge !== undefined || params.minAge !== undefined) && {
                    age: {
                        ...(params.minAge !== undefined && { $gte: +params.minAge }),
                        ...(params.maxAge !== undefined && { $lte: +params.maxAge }),
                    },
                }),
                ...(params.name !== undefined && {
                    name: {
                        $regex: `.*${params.name}.*`,
                        $options: 'i',
                    },
                }),
                ...(params.race !== undefined && {
                    race: {
                        $in: params.race.split(','),
                    },
                }),
                ...(params.status !== undefined && {
                    status: params.status,
                }),
                ...(params.gender !== undefined && {
                    gender: params.gender,
                }),
            },
        },
        {
            $lookup: {
                let: { ownerId: '$owner' },
                from: 'users',
                as: 'owner',
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$ownerId'],
                            },
                        },
                    },
                    {
                        $project: { first_name: 1, last_name: 1, email: 1, _id: 0 },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$owner',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                age: 1,
                dogName: '$name',
                race: 1,
                gender: 1,
                owner: {
                    fullName: { $concat: ['$owner.first_name', ' ', '$owner.last_name'] },
                    email: '$owner.email',
                },
            },
        },
        {
            $facet: {
                pagination: [
                    {
                        $group: {
                            _id: null,
                            totalItems: { $sum: 1 },
                        },
                    },
                    {
                        $addFields: {
                            page,
                            itemsPerPage,
                            totalPages: {
                                $divide: ['$totalItems', itemsPerPage],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            page: 1,
                            totalItems: 1,
                            itemsPerPage: 1, // Use the dynamic value
                            totalPages: { $ceil: '$totalPages' },
                        },
                    },
                ],
                data: [
                    {
                        $sort: {
                            updatedAt: -1,
                        },
                    },
                    {
                        $skip: (page - 1) * itemsPerPage,
                    },
                    {
                        $limit: itemsPerPage,
                    },
                ],
            },
        },
    ];
}

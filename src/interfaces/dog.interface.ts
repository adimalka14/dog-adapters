export interface IDog {
    _id?: string;
    race?: string;
    gender?: string;
    age?: number;
    vaccines?: number;
    behave?: string[];
    name?: string;
    status?: string;
    owner?: string;
}

export interface IDogQuery {
    status?: string;
    gender?: string;
    race?: string;
    minAge?: number;
    maxAge?: number;
    name?: string;
    page?: number;
    itemsPerPage?: number;
}

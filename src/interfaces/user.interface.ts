export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    _id?: string;
}

// TODO: "isActive" currently not in use.
//  We need to implement email verification or another validation
//  mechanism before enabling this field in the login and register flow.
// Explanation: Activating the isActive check now could create security issues
// if users can re-register or bypass the inactive state without proper verification (e.g., email confirmation).
// Once email validation is implemented, we'll use this field to
// deactivate accounts and prevent login attempts from inactive users.

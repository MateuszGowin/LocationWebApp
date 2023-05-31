export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
}
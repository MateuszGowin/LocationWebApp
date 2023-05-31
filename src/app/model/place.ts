import { Address } from "./address";

export class Place {
    id?: number;
    latitude?: string;
    longitude?: string;
    name?: string;
    type?: string;
    address?: Address;
    is_accepted?: boolean;
}
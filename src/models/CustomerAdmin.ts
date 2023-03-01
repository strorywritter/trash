import { User } from "./User";

export interface CustomerAdmin extends User {
    customerBusinessName: string;
    primaryContactName: string;
    streetAddress?: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber?: string;
    subscriptionLevel?: string;
    name:string;
    vehicleNumber:string;

}

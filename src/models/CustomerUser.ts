import { User } from "./User";

export interface CustomerUser extends User {
    firstName: string;
    lastName: string;
    customerAdminId?: string;
    name:string;
    vehicleNumber:string;
}

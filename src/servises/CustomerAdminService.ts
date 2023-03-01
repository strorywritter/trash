import axios from 'axios';
import { CustomerUser } from '../models/CustomerUser';
import { AppResponse } from "../models/Response";
import { Util } from "../Util";

export class CustomerAdminService {
    public static async getAllUsers(): Promise<AppResponse<CustomerUser[]>> {
        const url = Util.apiAuthUrl(`getAllUsers`);
        return await axios.get<void, AppResponse<CustomerUser[]>>(url);
    }

    public static async addUser(data: CustomerUser): Promise<AppResponse<CustomerUser>> {
        const url = Util.apiAuthUrl("create/user");
        return await axios.post<Partial<CustomerUser>, AppResponse<CustomerUser>>(url, data);
    }
}
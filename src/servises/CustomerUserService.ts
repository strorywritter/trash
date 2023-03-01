import axios from 'axios';
import { CustomerAdmin } from '../models/CustomerAdmin';


import { AppResponse } from "../models/Response";

import { Util } from "../Util";


export class CustomerUserService {
    public static async getCustomerUserDetails(): Promise<AppResponse<any>> {
        const ep = Util.apiAuthUrl("me");

        const res = await axios.get<void, AppResponse<any>>(ep);
        return res;
    }
  
      public static async fuelRequest(id: any, data: any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/consumer/createRequest/" + id);
        return await axios.post<Partial<any>, AppResponse<any>>(url, data);
    }
    public static async getAllRequestUser(id: any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/consumer/getRequestsByUser/" + id);
        const response = await axios.get<Partial<any>, AppResponse<any>>(url);
        console.log("response",response)
        return response;
    }

    public static async updateCustomerUserProfile(data: any, fileToUpload: FileList): Promise<AppResponse<any>> {
        const ep = Util.apiAuthUrl("update/user");
        const formData: FormData = new FormData();
        formData.append("profileDetails", JSON.stringify(data) as any);
        for (const file of fileToUpload) {
            formData.append("profileImage", file);
        }
        return await axios.post<FormData, AppResponse<any>>(ep, formData);
    }

}

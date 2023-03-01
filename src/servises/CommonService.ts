import { Util } from "../Util";
import { AppResponse } from "../models/Response";
import axios from "axios";
export class CommonService {

    public static async customerSignup(data: any): Promise<AppResponse<any>> {
        const url = Util.apiPublicUrl("/register");
        return await axios.post<Partial<any>, AppResponse<any>>(url, data);
    }

    public static async customerVerification(data: any): Promise<AppResponse<any>> {
        const url = Util.apiPublicUrl("verifyByCode");
        return await axios.post<Partial<any>, AppResponse<any>>(url, data);
    }
}

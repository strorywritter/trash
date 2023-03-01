import axios from 'axios';
import { Station } from '../models/Station';


import { AppResponse } from "../models/Response";

import { Util } from "../Util";


export class StationService {
    public static async getAllStations(): Promise<AppResponse<any>> {
        const ep = Util.apiAuthUrl("/station/getStation");

        const res = await axios.get<void, AppResponse<any>>(ep);
        
        return res;
    }
    
    public static async getAllFuelRequests(): Promise<AppResponse<any>> {
        const ep = Util.apiAuthUrl("/consumer/getAllRequests");

        const res = await axios.get<void, AppResponse<any>>(ep);
        
        return res;
    }
    public static async increaseStock(id: any,amount:any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/station/increaseStock/"+ id+"/"+amount);
        const response = await axios.patch<Partial<any>, AppResponse<any>>(url);
        console.log("response",response)
        return response;
    }
    public static async decreseStock(id: any,amount:any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/station/decreaseStock/"+ id+"/"+amount);
        const response = await axios.patch<Partial<any>, AppResponse<any>>(url);
        console.log("response",response)
        return response;
    }
    public static async getStation(id: any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/station/getStation/" + id);
        const response = await axios.get<Partial<any>, AppResponse<any>>(url);
        console.log("response",response)
        return response;
    }
    public static async completeRequest(id: any, data: any): Promise<AppResponse<any>> {
        const url = Util.apiAuthUrl("/consumer/completeRequest/" + id);
        return await axios.patch<Partial<any>, AppResponse<any>>(url, data);
    }
   

}

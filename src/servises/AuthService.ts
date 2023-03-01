import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { User } from "../models/User";
import { Admin} from "../models/Admin";

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserUpdateData {
  email: string;
}

export interface UserReset {
  userId: string;
  token: string
  password: string;
}

export class AuthService {
 
  // public static async getMe(): Promise<AppResponse<User>> {
  //   const res = Util.apiAuthUrl('/register/login');

  //   //const res = await axios.get<void, AppResponse< Admin >>(ep);

  //   return res;
  // }
//   public static async getMe(): Promise<AppResponse<User[]>> {
//     const url = Util.apiAuthUrl(`/register/login`);
//     return await axios.get<void, AppResponse<User[]>>(url);
// }
public static async customerSignin(data: any): Promise<AppResponse<any>> {
  const url = Util.apiPublicUrl("/register/login");
  return await axios.post<Partial<any>, AppResponse<any>>(url, data);
}

}
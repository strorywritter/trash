export interface AppResponse<T> {

    createdAt(createdAt: any): Date;
    success: boolean;
    data: T;
    message: string;
    error?: string;
    errorCode?: number;
    errorData?: unknown;
    loginStatus?:any;
    userName?:any;
    userRole?:any;
    userId?:any;
    station?:any;

  }
  export interface AppResponse2<T> {

    createdAt(createdAt: any): Date;
    success: boolean;
    data: T;
   

  }
  
  export interface AppResponseWithUser<T> {
    UserData: any;
    LeadData: T;
  }
  
export interface  Station{
    _id:string;
    name: string;
    district: string;
    stock: string;
    manager:any;
 
}
export interface StationModel {
    set: Station[];
    count: number;
}
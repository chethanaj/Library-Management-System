export interface User{
id:number;
firstName:string;
lastName:string;
email:string;
contactNumber:number;
address:Address[];
}

export interface Address{
    streetNumber:string;
    city:string;
    country:string;
}

export interface JWTToken{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    contactNumber:number;
    address:Address[];
    roles: Role[];

}

export interface Role{
    name:string
}
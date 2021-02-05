export interface video_list {
    id: number;
    bvid:string;
    created:number;
    title: string;
    length: string;
}

export interface User {
    id: number;
    name:string;
    email:string;
    // password:string;
    item:[];
}

export interface Userdata {
    is_active:boolean
    name:string;
    email:string;
    item:[];
}

export interface Player {
    id: number;
    name: string;
    race:string;
    realName:string;
    nickName:string;
    team:string;
    country:string;
}

export interface winprobability {
    number: number;
    PVT:string;
    PVZ:string;
    TVZ:string;
    date:string;
}
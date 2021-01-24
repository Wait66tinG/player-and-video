export interface video_list {
    id: number;
    bvid:string;
    created:number;
    title: string;
    length: string;
}

export interface Player {
    id: number;
    name: string;
}

export interface winprobability {
    number: number;
    PVT:string;
    PVZ:string;
    TVZ:string;
    date:string;
}
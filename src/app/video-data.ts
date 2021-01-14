export interface video_list {
    id: number;
    bvid:string;
    created:number;
    title: string;
    length: string;
}

export interface time_format {
    id: number;
    bvid:string;
    created:string;
    title: string;
    length: string;
}

export interface Player {
    id: number;
    name: string;
}
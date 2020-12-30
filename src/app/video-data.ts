export interface video_list {
    id: number;
    title: string;
    url: string;
    date: string;
}

export interface Player {
    id: number;
    name: string;
    video_list: video_list[];
}
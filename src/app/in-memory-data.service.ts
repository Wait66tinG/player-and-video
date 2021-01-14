import { Injectable } from '@angular/core';
import { Player } from './video-data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const players = [
      {
        id: 1,
        name: "XY",
        video_list: [
          {
            id: 1,
            title: "2020.12.28XY直播录像鸟哥游戏大厅天梯第一视角星际2",
            url: "https://www.bilibili.com/video/BV1tK411g7u1/",
            date: "2020-12-29 03:32:16"
          },
          {
            id: 2,
            title: "2020.12.27XY直播录像鸟哥游戏大厅天梯第一视角星际2",
            url: "https://www.bilibili.com/video/BV1h5411H7tX/",
            date: "2020-12-28 03:09:55"
          }
        ]
      },
      {
        id: 2,
        name: "PartinG",
        video_list: [
          {
            id: 3,
            title: "2020.12.29PartinG直播录像日常闲聊",
            url: "https://www.bilibili.com/video/BV1CT4y1K7r8/",
            date: "2020-12-29 22:34:40"
          },
          {
            id: 4,
            title: "2020.12.29PartinG直播录像跳跳胖丁神族天梯第一视角星际2",
            url: "https://www.bilibili.com/video/BV1UK4y1V7un/",
            date: "2020-12-29 16:30:08"
          },
          {
            id: 5,
            title: "2020.12.28PartinG直播录像跳跳胖丁神族天梯第一视角星际2",
            url: "https://www.bilibili.com/video/BV1fK4y1L7us/",
            date: "2020-12-28 14:44:37"
          }
        ]
      },
      {
        id: 3,
        name: "TIME",
        video_list: [
          {
            id: 6,
            title: "2020.12.18TIME直播录像开酒人族第一视角星际2",
            url: "https://www.bilibili.com/video/BV1JV411h7g6/",
            date: "2020-12-18 19:09:19"
          }
        ]
      },
    ];
    return { players };
  }
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }
}

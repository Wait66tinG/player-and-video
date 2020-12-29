import { Component, OnInit } from '@angular/core';
import { VIDEOS } from '../mock-data';
import { Video } from '../video-data';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  videos = VIDEOS;

  selected! : Video ;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(video: Video): void {
    this.selected = video;
  }
}

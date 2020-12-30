import { Component, OnInit, Input } from '@angular/core';
import { Player, video_list } from '../video-data';


@Component({
  selector: 'app-player-video-list',
  templateUrl: './player-video-list.component.html',
  styleUrls: ['./player-video-list.component.css']
})
export class PlayerVideoListComponent implements OnInit {
  @Input() player!: Player;

  constructor() { }

  ngOnInit(): void {
  }

}

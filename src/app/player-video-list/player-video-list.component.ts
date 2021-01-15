import { Component, OnInit, Input } from '@angular/core';
import { Player, time_format, video_list } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-player-video-list',
  templateUrl: './player-video-list.component.html',
  styleUrls: ['./player-video-list.component.css']
})

export class PlayerVideoListComponent implements OnInit {
  _player!: Player;
  pictureSrc!: string;
  dataSource: video_list[] = [];
  dataSourceformat:time_format[] = [];

  displayedColumns: string[] = ['title', 'date','length', 'url'];

  constructor(
    private VideolistService: VideolistService,
    public http:HttpClient,
  ) {
  }


  ngOnInit(): void {
  }
  @Input() set player(data: Player) {
    this._player = data;
    this.pictureSrc = `assets/image/${data?.name}.png`;
    this.getPlayerVideos()
  }
  
  getPlayerVideos(): void {
    this.VideolistService.getPlayerVideos(this._player.name)
      .subscribe(dataSource => this.dataSource = dataSource);
  }
}
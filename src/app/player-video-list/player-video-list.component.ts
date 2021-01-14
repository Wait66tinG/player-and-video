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

  displayedColumns: string[] = ['date', 'length', 'url'];

  today: number = Date.now();
  
  // pictureSrc: string = "../../assets/image/TIME.png" ;

  constructor(
    private VideolistService: VideolistService,
    public http:HttpClient,
  ) {
    // Create 100 users
  }


  ngOnInit(): void {
  }
  @Input() set player(data: Player) {
    this._player = data;
    this.pictureSrc = `assets/image/${data?.name}.png`;
    this.getPlayerVideos()
    // this.formatUnixTime(this.dataSource)
  }
  
  getPlayerVideos(): void {
    this.VideolistService.getPlayerVideos(this._player.name)
      .subscribe(dataSource => this.dataSource = dataSource);
  }

  formatUnixTime(videolist:video_list[]):void{
    // for (let index = 0; index < videolist.length; index++) {
    //   // const element = array[index];
    //   this.dataSourceformat[index].bvid = videolist[index].bvid
    //   this.dataSourceformat[index].created = moment(videolist[index].created).format()
    //   this.dataSourceformat[index].id = videolist[index].id
    //   this.dataSourceformat[index].length = videolist[index].length
    //   this.dataSourceformat[index].title = videolist[index].title
      console.log("1",videolist[0].created)
    
  }
}
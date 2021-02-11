import { Component, OnInit } from '@angular/core';
import { Discuss, Player, video_list } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discuss-main',
  templateUrl: './discuss-main.component.html',
  styleUrls: ['./discuss-main.component.css']
})
export class DiscussMainComponent implements OnInit {
  player!: Player;
  playername!:string
  pictureSrc!: string;
  // rawdata: video_list[] = [];
  discussdata:any;
  a! :number;
  newvideolist: video_list[] = [];
  displayedColumns: string[] = ['name'];
  // player!:Player
  dataSource: any;
  newvideolistdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginator2!: MatPaginator;
  constructor(
    private VideolistService: VideolistService,
    public http: HttpClient,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // this.getnewVideo()
    this.getPlayer()
    // this.getPlayerVideos()

  }

  getnewVideo(): void {
    this.VideolistService.getNewVideos()
      .subscribe(newVideo => {
        this.newvideolist = newVideo;
        // this.newvideolistdata = new MatTableDataSource(this.newvideolist);
        // this.newvideolistdata.paginator2 = this.paginator2;
      });
  }

  getPlayer(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
        this.playername = params.get("name")!
        this.pictureSrc = `assets/image/${this.playername}.png`;
        return this.VideolistService.getplayer(params.get("name")!);
      }
        )).subscribe(player => {
          this.player = player
          if (player) {
            this.getDiscuss(player)
          }
        });

  }

  getDiscuss(player:Player):void{
    this.VideolistService.getdiscuss(player.id.toString())
    .subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.a = 1;
      if(data.length==0){
        this.a = 0;
      }
    })
  }

  // getPlayerVideos(): void {
  //   this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>{
  //       this.playername = params.get("name")!
  //       // console.log("params.get('name')=",params.get("name"))
  //       this.pictureSrc = `assets/image/${this.playername}.png`;
  //       return this.VideolistService.getPlayerVideos(params.get("name")!);
  //     }
  //       ))
  //     // this.VideolistService.getPlayerVideos(this._player?.name)
  //     .subscribe(rawdata => {
  //       this.rawdata = rawdata;
  //       this.dataSource = new MatTableDataSource(this.rawdata);
  //       this.dataSource.paginator = this.paginator;
  //       // console.log(rawdata)
  //     });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

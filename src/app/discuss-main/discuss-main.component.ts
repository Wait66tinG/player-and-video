import { Component, OnInit } from '@angular/core';
import { Discuss, Player, Userdata, video_list } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-discuss-main',
  templateUrl: './discuss-main.component.html',
  styleUrls: ['./discuss-main.component.css']
})
export class DiscussMainComponent implements OnInit {
  player!: Player;
  playername!: string
  pictureSrc!: string;
  // rawdata: video_list[] = [];
  discussdata: any;
  discuss!: string;
  panelOpenState = false;
  haveDiscuss!: number;
  newvideolist: video_list[] = [];
  displayedColumns: string[] = ['name'];
  private userlogin = 'http://localhost:8000/postDiscuss/';
  dataSource: any;
  newvideolistdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginator2!: MatPaginator;
  userdata: Userdata = {
    id:0,
    is_active: false,
    name: '',
    email: '',
    item: []
  }
  constructor(
    private VideolistService: VideolistService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private LoginService: LoginService,
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
      switchMap((params: ParamMap) => {
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

  getDiscuss(player: Player): void {
    this.VideolistService.getdiscuss(player.id.toString())
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.haveDiscuss = 1;
        if (data.length == 0) {
          this.haveDiscuss = 0;
        }
      })
  }
  postDiscuss(discuss: string): void {
    if (discuss) {
      this.http.post<any>(this.userlogin,
        { "player":this.player, "user": this.userdata.id,
        "date":this.player, "context": discuss })
        .subscribe(rawdata => {
          localStorage.setItem("token", rawdata.token);
          this.cookielogin()
        });
    }
  }
  // onSubmit() {
  //   if (!this.email?.errors && !this.password?.errors) {
  //     this.http.post<any>(this.userlogin,
  //       { "email": this.loginForm.value.email, "password": this.loginForm.value.password })
  //       .subscribe(rawdata => {

  //         // console.log('123', rawdata, this.isActive);
  //         localStorage.setItem("token", rawdata.token);
  //         this.cookielogin()

  //       });
  //   }
  // }

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
  cookielogin(): void {
    this.LoginService.getLoginStatus()
      .subscribe(userdata => {
        this.userdata.id = userdata.id;
        // this.isActive = userdata.is_active;
        this.userdata.is_active = userdata.is_active;
        this.userdata.name = userdata.name;
        this.userdata.email = userdata.email;
        this.userdata.item = userdata.item;
        this.router.navigateByUrl('/home');
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

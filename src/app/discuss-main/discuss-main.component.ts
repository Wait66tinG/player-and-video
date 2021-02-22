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
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-discuss-main',
  templateUrl: './discuss-main.component.html',
  styleUrls: ['./discuss-main.component.css']
})
export class DiscussMainComponent implements OnInit {
  // discussuserid!:number
  player!: Player;
  playername!: string
  pictureSrc!: string;
  discussdata: any;
  discuss!: string;
  panelOpenState = false;
  haveDiscuss!: number;
  newvideolist: video_list[] = [];
  displayedColumns: string[] = ['name'];
  private postdiscuss = 'http://localhost:8000/discuss/post';
  private deletediscuss = 'http://localhost:8000/discuss/delete';
  dataSource: any;
  newvideolistdata: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginator2!: MatPaginator;
  userdata: Userdata = {
    id: 0,
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
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // this.getnewVideo()
    this.getPlayer()
    // this.getPlayerVideos()
    this.cookielogin()

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
        // console.log(data)
        if (data.length == 0) {
          this.haveDiscuss = 0;
        }
      })
  }

  postDiscuss(discuss: string): void {
    if (discuss && discuss.length <= 255) {
      this.http.post<any>(this.postdiscuss,
        {
          "player": this.player.id, "user": this.userdata.id,
          "date": '0', "context": discuss
        })
        .subscribe(rawdata => {
          this.discuss = '',
          this.panelOpenState = false,
          this.getPlayer()
          // console.log(rawdata)
        });
      // this.router.navigateByUrl(`/home`);
      // this.router.navigateByUrl(`/discuss(popup:dddplayer/${this.playername})`);

    }
    else {
      this.openDialog()
    }
    this.getPlayer()
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  deleteDiscuss(discussid: number): void {
    const url = this.deletediscuss + `?id=${discussid}`
    this.http.put<any>(url, {})
      .subscribe(rawdata => {
        // console.log(rawdata),
        // this.getPlayer()
      });

    // this.router.navigateByUrl(`/home`);
    // this.router.navigateByUrl(`/discuss(popup:dddplayer/${this.playername})`);
  }

  cookielogin(): void {
    this.LoginService.getLoginStatus()
      .subscribe(userdata => {
        this.userdata.id = userdata.id;
        this.userdata.is_active = userdata.is_active;
        this.userdata.name = userdata.name;
        this.userdata.email = userdata.email;
        this.userdata.item = userdata.item;

      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./discuss-main.component.css']
})
export class DialogContentExampleDialog { }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Userdata } from '../video-data';
import { VideolistService } from '../videolist.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {
  userdata: Userdata = {
    id:0,
    is_active: false,
    name: '',
    email: '',
    item: []
  }
  private deletediscuss = 'http://localhost:8000/discuss/delete';
  displayedColumns: string[] = ['name'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  discussdata: any;
  dataSource: any;
  haveDiscuss!: number;
  constructor(
    private router: Router,
    private LoginService: LoginService,
    private VideolistService: VideolistService,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.cookielogin()
    
  }
  logout():void{
    this.router.navigateByUrl('/login(popup:login)');
    this.LoginService.logout();
  }
  
  cookielogin(): void {
    this.LoginService.getLoginStatus()
      .subscribe(userdata => {
        this.userdata.id = userdata.id;
        // this.isActive = userdata.is_active;
        this.userdata.is_active = userdata.is_active;
        this.userdata.name = userdata.name;
        this.userdata.email = userdata.email;
        this.userdata.item = userdata.item;
        this.getDiscuss(userdata.id);
      })
  }
  
  getDiscuss(userid:number): void {
    this.VideolistService.getdiscussByUser(userid.toString())
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

  
}

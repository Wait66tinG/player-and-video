import { Component, OnInit, Input } from '@angular/core';
import { Player, video_list } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-player-video-list',
  templateUrl: './player-video-list.component.html',
  styleUrls: ['./player-video-list.component.css', '../app.component.css']
})

export class PlayerVideoListComponent implements OnInit {
  _player!: Player;
  pictureSrc!: string;
  rawdata: video_list[] = [];
  displayedColumns: string[] = ['title','created','length','bvid'];
  // displayedColumns: string[] = ['title'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    
  }
  constructor(
    private VideolistService: VideolistService,
    public http: HttpClient,
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
    this.VideolistService.getPlayerVideos(this._player?.name)
      .subscribe(rawdata => {
        this.rawdata = rawdata
        this.dataSource = new MatTableDataSource(this.rawdata);
        this.dataSource.paginator = this.paginator;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
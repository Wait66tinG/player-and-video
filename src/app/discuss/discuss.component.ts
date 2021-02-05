import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Player } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrls: ['./discuss.component.css']
})
export class DiscussComponent implements OnInit {
  players!: Player[];
  selected!: Player;
  public list: any;
  dataSource: any;
  displayedColumns: string[] = ['name'];
  constructor(
    private VideolistService: VideolistService,
    public http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.router.navigate(['',{outlets: {popup:['dddplayer','']}}]);
  }
  onSelect(players: Player): void {
    this.selected = players;
  }
  getPlayers(): void {
    this.VideolistService.getPlayers()
      .subscribe(players => {
        this.players = players
        this.dataSource = new MatTableDataSource(this.players);
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

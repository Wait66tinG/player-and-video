import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Player } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

const headers = new HttpHeaders({
  'accept': 'application/json'
});
@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
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
    this.router.navigate(['',{outlets: {popup:['whichplayer','']}}]);
  }
  onSelect(players: Player): void {
    this.selected = players;
  }

  getPlayers(): void {
    this.VideolistService.getPlayers()
      .subscribe(players => {
        this.players = players
        this.dataSource = new MatTableDataSource(this.players);
        // console.log(players)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

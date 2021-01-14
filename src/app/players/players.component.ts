import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Player } from '../video-data';
import { VideolistService } from '../videolist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
  public list:any;
  constructor(
    private VideolistService: VideolistService,
    public http:HttpClient,
    ) { }

  ngOnInit(): void {
    this.getPlayers();
  }
  onSelect(players: Player): void {
    this.selected = players;
  }
  getPlayers(): void {
    this.VideolistService.getPlayers()
      .subscribe(players => this.players = players);
  }
  // getdata():void{
  //   let api = "http://localhost:8000/get";
  //   this.http.get(api).subscribe((response:any)=>{
  //     console.log(response);
  //     this.list=response.result.json();
  //   })

  // }

}

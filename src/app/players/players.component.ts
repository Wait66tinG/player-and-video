import { Component, OnInit } from '@angular/core';
import { PLAYERS } from '../mock-data';
import { Player } from '../video-data';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players = PLAYERS;

  selected! : Player ;
  
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(players: Player): void {
    this.selected = players;
  }
}

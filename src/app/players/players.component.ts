import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Player } from '../video-data';
import { VideolistService } from '../videolist.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players!: Player[];
  selected!: Player;

  constructor(
    private VideolistService: VideolistService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(players: Player): void {
    this.selected = players;
  }
  getHeroes(): void {
    this.VideolistService.getHeroes()
        .subscribe(players => this.players = players);
  }

}

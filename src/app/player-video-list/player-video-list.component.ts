import { Component, OnInit, Input } from '@angular/core';
import { Player, video_list } from '../video-data';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-player-video-list',
  templateUrl: './player-video-list.component.html',
  styleUrls: ['./player-video-list.component.css']
})

export class PlayerVideoListComponent implements OnInit {
  _player!: Player;
  pictureSrc!: string;
  dataSource: video_list[] = [];

  displayedColumns: string[] = ['title', 'date', 'url'];

  // pictureSrc: string = "../../assets/image/TIME.png" ;

  constructor() {
    // Create 100 users
  }


  ngOnInit(): void {
  }
  @Input() set player(data: Player) {
    this._player = data;
    this.pictureSrc = `../../assets/image/${data?.name}.png`;
    this.dataSource = this._player?.video_list;
  }
}
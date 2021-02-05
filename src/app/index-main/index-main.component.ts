import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {
  slides = [{ 'image': `assets/image/sc2.png` },
  { 'image': `assets/image/sc2INno.png` },
  { 'image': `assets/image/sc2yamato.png` }];
  constructor() { }

  ngOnInit(): void {
  }

}

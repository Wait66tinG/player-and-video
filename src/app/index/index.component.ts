import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { winprobability } from '../video-data';
import { VideolistService } from '../videolist.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  winprobability!: winprobability;
  // slides = [{ 'image': '../assets/image/sc2.png' },
  // { 'image': '../assets/image/sc2INno.png' },
  // { 'image': '../assets/image/sc2yamato.png' }];

  slides = [{ 'image': `assets/image/sc2.png` },
  { 'image': `assets/image/sc2INno.png` },
  { 'image': `assets/image/sc2yamato.png` }];


  constructor(
    private VideolistService: VideolistService,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getWinprobability()
  }
  getWinprobability(): void {
    this.VideolistService.getWinprobability()
      .subscribe(Object => {
        this.winprobability = Object;
      });
  }
}

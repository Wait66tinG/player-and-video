import { Injectable } from '@angular/core';
import { Player } from './video-data';
import { PLAYERS } from './mock-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {

  constructor(

  ) { }
  getHeroes(): Observable<Player[]> {
    return of(PLAYERS);
  }
}

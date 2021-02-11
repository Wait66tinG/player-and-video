import { Injectable } from '@angular/core';
import { Discuss, Player, User, Userdata, video_list, winprobability } from './video-data';
import { observable, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideolistService {
  private playersUrl = 'http://127.0.0.1:8000/getPlayers';  // URL to web api
  private playerVideosUrl = 'http://127.0.0.1:8000/getPlayersVideo';  // URL to web api
  private newVideosUrl = 'http://127.0.0.1:8000/getNewReport';  // URL to web api
  private winprobability = 'http://127.0.0.1:8000/getWinprobability1';  // URL to web api
  private playerdata = 'http://localhost:8000/getPlayerData';
  private playerdiscuss = 'http://localhost:8000/getDiscussByPlayer';
  // 服务器版本
  // private playersUrl = '/getPlayers';  // URL to web api
  // private playerVideosUrl = '/getPlayersVideo';  // URL to web api
  // private newVideosUrl = '/getNewReport';  // URL to web api
  // private winprobability = '/getWinprobability1';  // URL to web api
  // private cookieloginURL = 'http://localhost:8000/items/cookie';
  constructor(
    private http: HttpClient,

  ) { }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      console.log(`${operation} failed: ${error.headers}`);

      console.log(`${operation} failed: ${result}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }
  getPlayerVideos(player: string): Observable<video_list[]> {
    return this.http.get<video_list[]>(this.playerVideosUrl, { params: { player: player } })
      .pipe(
        catchError(this.handleError<video_list[]>('getPlayerVideos', []))
      );
  }
  getNewVideos(): Observable<video_list[]> {
    return this.http.get<video_list[]>(this.newVideosUrl)
      .pipe(
        catchError(this.handleError<video_list[]>('getNewVideos', []))
      );
  }
  getWinprobability(): Observable<winprobability> {
    return this.http.get<winprobability>(this.winprobability)
      .pipe(
        catchError(this.handleError<winprobability>('getWinprobability',))
      );
  }

  getplayer(player:string): Observable<Player> {
    return this.http.get<Player>(this.playerdata,{ params: { player: player }})
      .pipe(
        catchError(this.handleError<Player>('getPlayer',))
      );
  }

  getdiscuss(player:string): Observable<Discuss[]> {
    return this.http.get<Discuss[]>(this.playerdiscuss,{ params: { player: player }})
      .pipe(
        catchError(this.handleError<Discuss[]>('getdiscuss',[]))
      );
  }
  // getLoginStatus(): Observable<Userdata> {
  //   const token = localStorage.getItem("token");
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
  //   };
  //   return this.http.get<any>(this.cookieloginURL, httpOptions)
  // }
  
}

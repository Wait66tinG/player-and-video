import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { IndexComponent } from './index/index.component'
import { LoginComponent } from './login/login.component';
import { PlayerVideoListComponent } from './player-video-list/player-video-list.component';
import { IndexMainComponent } from './index-main/index-main.component';
import { LoginMainComponent } from './login-main/login-main.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { AuthGuard } from './auth.guard';
import { DiscussComponent } from './discuss/discuss.component';
import { DiscussMainComponent } from './discuss-main/discuss-main.component';
const routes: Routes = [
  {
    path: 'player',
    component: PlayersComponent
  },
  {
    path: 'discuss',
    component: DiscussComponent,
  },
  {
    path: '', 
    component: IndexComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home', 
    component: HomeMainComponent , 
    outlet: "popup",
    canActivate: [AuthGuard],
  },
  {
    path: 'index', 
    component: IndexMainComponent , 
    outlet: "popup"
  },
  {
    path: 'login', 
    component: LoginMainComponent, 
    outlet: "popup"
  },
  {
    path: 'whichplayer/:name', 
    component: PlayerVideoListComponent, 
    outlet: "popup"
  },
  {
    path: 'dddplayer/:name', 
    component: DiscussMainComponent,
    outlet: "popup"
  },

  {
    path: 'signup', 
    component: SignUpComponent, 
    outlet: "popup"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
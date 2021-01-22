import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import {IndexComponent} from './index/index.component'
const routes: Routes = [
  { path: 'player', component:PlayersComponent },
  { path: '', component:IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
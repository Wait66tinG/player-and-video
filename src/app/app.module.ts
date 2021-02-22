import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { FormsModule } from '@angular/forms';
import { PlayerVideoListComponent } from './player-video-list/player-video-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Material } from './material/material.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { LoginMainComponent } from './login-main/login-main.component';
import { IndexMainComponent } from './index-main/index-main.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { DiscussComponent } from './discuss/discuss.component';
import { DiscussMainComponent } from './discuss-main/discuss-main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerVideoListComponent,
    IndexComponent,
    LoginComponent,
    LoginMainComponent,
    IndexMainComponent,
    SignUpComponent,
    HomeComponent,
    HomeMainComponent,
    DiscussComponent,
    DiscussMainComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Material,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

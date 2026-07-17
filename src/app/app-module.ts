import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Header } from './layouts/public-layout/header/header';
import { Footer } from './layouts/public-layout/footer/footer';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { UserLayout } from './layouts/user-layout/user-layout';
import { Navbar } from './layouts/user-layout/navbar/navbar';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { Sidebar } from './layouts/user-layout/sidebar/sidebar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    App,
    PublicLayout,
    Header,
    Footer,
    AuthLayout,
    UserLayout,
    Navbar,
    Sidebar,

  ],
  imports: [BrowserModule, AppRoutingModule, LoadingBarRouterModule, FormsModule,ReactiveFormsModule,HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

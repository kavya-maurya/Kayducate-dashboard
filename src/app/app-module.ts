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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { FooterAdmin } from './layouts/admin-layout/footer-admin/footer-admin';
import { NavbarAdmin } from './layouts/admin-layout/navbar-admin/navbar-admin';
import { SidebarAdmin } from './layouts/admin-layout/sidebar-admin/sidebar-admin';
import { AdminModule } from './features/admin/admin-module';

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
    AdminLayout,
    FooterAdmin,
    NavbarAdmin,
    SidebarAdmin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}

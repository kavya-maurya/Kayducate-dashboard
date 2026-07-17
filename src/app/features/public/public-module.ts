import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [Home, About, Contact],
  imports: [CommonModule, PublicRoutingModule, FormsModule, HttpClientModule],
})
export class PublicModule {}

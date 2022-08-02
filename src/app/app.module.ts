import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeaderComponent } from './common/header/header.component';
import { FilterComponent } from './common/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from './views/loading/loading.component';  
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    HeaderComponent,
    FilterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxCurrencyModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-gaurd/auth.garud';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout/main-layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DevExtremeModule } from './shared/modules/devExtreme.module';
import { SharedModule } from './shared/modules/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DevExtremeModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

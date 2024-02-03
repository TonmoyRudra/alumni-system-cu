import { SharedModule } from './../../shared/modules/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';



@NgModule({
  declarations: [
    //MainLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LayoutModule { }

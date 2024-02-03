import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../components/header/header.component';
import { FooterComponent } from './../components/footer/footer.component';
import { NgModule } from '@angular/core';
import { UploaderFromExcelComponent } from '../components/uploader-from-excel/uploader-from-excel.component';
import { DevExtremeModule } from './devExtreme.module';
// import { NullWithDefaultPipe } from '../pipe/null-with-default.pipe';
import { OrderByPipe } from '../pipe/order-by.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule,DevExtremeModule, RouterModule],
  declarations: [
    UploaderFromExcelComponent,
    FooterComponent,
    HeaderComponent,
    OrderByPipe
    // NullWithDefaultPipe
  ],
  exports: [UploaderFromExcelComponent, FooterComponent, HeaderComponent, DevExtremeModule],
})
export class SharedModule {}

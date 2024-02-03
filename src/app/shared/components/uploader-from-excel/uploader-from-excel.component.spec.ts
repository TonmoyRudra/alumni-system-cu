import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderFromExcelComponent } from './uploader-from-excel.component';

describe('UploaderFromExcelComponent', () => {
  let component: UploaderFromExcelComponent;
  let fixture: ComponentFixture<UploaderFromExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploaderFromExcelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

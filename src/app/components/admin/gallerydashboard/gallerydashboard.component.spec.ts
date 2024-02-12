import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerydashboardComponent } from './gallerydashboard.component';

describe('GallerydashboardComponent', () => {
  let component: GallerydashboardComponent;
  let fixture: ComponentFixture<GallerydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerydashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

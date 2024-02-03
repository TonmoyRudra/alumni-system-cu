import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtransactionapproveComponent } from './eventtransactionapprove.component';

describe('EventtransactionapproveComponent', () => {
  let component: EventtransactionapproveComponent;
  let fixture: ComponentFixture<EventtransactionapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventtransactionapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventtransactionapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

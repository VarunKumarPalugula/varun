import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingCallComponent } from './outgoing-call.component';

describe('OutgoingCallComponent', () => {
  let component: OutgoingCallComponent;
  let fixture: ComponentFixture<OutgoingCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingCallComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

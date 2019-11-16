import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallComponent } from './call.component';

describe('CallComponent', () => {
  let component: CallComponent;
  let fixture: ComponentFixture<CallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

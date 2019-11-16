import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FqaComponent } from './fqa.component';

describe('FqaComponent', () => {
  let component: FqaComponent;
  let fixture: ComponentFixture<FqaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FqaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

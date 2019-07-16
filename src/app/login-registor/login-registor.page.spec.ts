import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistorPage } from './login-registor.page';

describe('LoginRegistorPage', () => {
  let component: LoginRegistorPage;
  let fixture: ComponentFixture<LoginRegistorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegistorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

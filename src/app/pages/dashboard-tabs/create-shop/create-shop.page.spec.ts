import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShopPage } from './create-shop.page';

describe('CreateShopPage', () => {
  let component: CreateShopPage;
  let fixture: ComponentFixture<CreateShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

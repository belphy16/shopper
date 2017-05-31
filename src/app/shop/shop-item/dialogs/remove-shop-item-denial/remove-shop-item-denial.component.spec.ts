import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveShopItemDenialComponent } from './remove-shop-item-denial.component';

describe('RemoveShopItemDenialComponent', () => {
  let component: RemoveShopItemDenialComponent;
  let fixture: ComponentFixture<RemoveShopItemDenialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveShopItemDenialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveShopItemDenialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

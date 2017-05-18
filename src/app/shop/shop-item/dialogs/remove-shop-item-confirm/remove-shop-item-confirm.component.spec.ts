import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveShopItemConfirmComponent } from './remove-shop-item-confirm.component';

describe('RemoveShopItemConfirmComponent', () => {
  let component: RemoveShopItemConfirmComponent;
  let fixture: ComponentFixture<RemoveShopItemConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveShopItemConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveShopItemConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

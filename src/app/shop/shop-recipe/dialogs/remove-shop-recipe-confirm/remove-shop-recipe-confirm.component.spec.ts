import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveShopRecipeConfirmComponent } from './remove-shop-recipe-confirm.component';

describe('RemoveShopRecipeConfirmComponent', () => {
  let component: RemoveShopRecipeConfirmComponent;
  let fixture: ComponentFixture<RemoveShopRecipeConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveShopRecipeConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveShopRecipeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

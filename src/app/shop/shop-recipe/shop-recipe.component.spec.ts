import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRecipeComponent } from './shop-recipe.component';

describe('ShopRecipeComponent', () => {
  let component: ShopRecipeComponent;
  let fixture: ComponentFixture<ShopRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRecipesComponent } from './shop-recipes.component';

describe('ShopRecipesComponent', () => {
  let component: ShopRecipesComponent;
  let fixture: ComponentFixture<ShopRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

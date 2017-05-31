import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartItemCommentComponent } from './add-cart-item-comment.component';

describe('AddCartItemCommentComponent', () => {
  let component: AddCartItemCommentComponent;
  let fixture: ComponentFixture<AddCartItemCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCartItemCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartItemCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

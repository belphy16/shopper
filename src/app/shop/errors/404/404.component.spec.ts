import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { 404; Component; } from; './404.component';

describe('404Component', () => {
  let component: 404 Component;
  let fixture: ComponentFixture<404 Component > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

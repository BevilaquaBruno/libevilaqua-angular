import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTagComponent } from './form-tag.component';

describe('FormTagComponent', () => {
  let component: FormTagComponent;
  let fixture: ComponentFixture<FormTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTagComponent]
    });
    fixture = TestBed.createComponent(FormTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

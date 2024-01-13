import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPublisherComponent } from './detail-publisher.component';

describe('DetailPublisherComponent', () => {
  let component: DetailPublisherComponent;
  let fixture: ComponentFixture<DetailPublisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPublisherComponent]
    });
    fixture = TestBed.createComponent(DetailPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

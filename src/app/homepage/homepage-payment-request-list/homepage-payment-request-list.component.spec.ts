import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagePaymentRequestListComponent } from './homepage-payment-request-list.component';
describe('HomepagePaymentRequestListComponent', () => {
  let component: HomepagePaymentRequestListComponent;
  let fixture: ComponentFixture<HomepagePaymentRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepagePaymentRequestListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagePaymentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

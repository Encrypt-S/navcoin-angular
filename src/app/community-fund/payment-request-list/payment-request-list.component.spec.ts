import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRequestListComponent } from './payment-request-list.component';

describe('PaymentRequestListComponent', () => {
  let component: PaymentRequestListComponent;
  let fixture: ComponentFixture<PaymentRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

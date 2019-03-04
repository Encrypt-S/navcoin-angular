import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTransactionsCardComponent } from './detailed-transactions-card.component';

describe('DetailedTransactionsCardComponent', () => {
  let component: DetailedTransactionsCardComponent;
  let fixture: ComponentFixture<DetailedTransactionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedTransactionsCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTransactionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

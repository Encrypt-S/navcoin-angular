import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsViewComponent } from './proposals-view.component';

describe('ProposalsViewComponent', () => {
  let component: ProposalsViewComponent;
  let fixture: ComponentFixture<ProposalsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

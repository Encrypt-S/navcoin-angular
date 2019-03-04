import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageProposalListComponent } from './homepage-proposal-list.component';

describe('ProposalsViewComponent', () => {
  let component: HomepageProposalListComponent;
  let fixture: ComponentFixture<HomepageProposalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageProposalListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfundStatsComponent } from './cfund-stats.component';

describe('CfundStatsComponent', () => {
  let component: CfundStatsComponent;
  let fixture: ComponentFixture<CfundStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfundStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfundStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

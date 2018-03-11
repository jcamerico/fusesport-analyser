import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetStatsComponent } from './compet-stats.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ParticipantVisitorService} from "../../participant-visitor.service";

describe('CompetStatsComponent', () => {
  let component: CompetStatsComponent;
  let fixture: ComponentFixture<CompetStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetStatsComponent ],
      imports: [ NgbModule.forRoot() ],
      providers: [ParticipantVisitorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

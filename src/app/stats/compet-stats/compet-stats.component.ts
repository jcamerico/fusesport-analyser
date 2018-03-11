import {Component, Input, OnInit} from '@angular/core';
import {ParticipantVisitorService} from "../../participant-visitor.service";

@Component({
  selector: 'app-compet-stats',
  templateUrl: './compet-stats.component.html',
  styleUrls: ['./compet-stats.component.css']
})
export class CompetStatsComponent implements OnInit {

  @Input('competition') competition: string;

  constructor(private participantVisitor: ParticipantVisitorService) { }

  ngOnInit() {
  }

}

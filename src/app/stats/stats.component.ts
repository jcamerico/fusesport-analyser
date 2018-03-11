import { Component, OnInit } from '@angular/core';
import {ParticipantVisitorService} from "../participant-visitor.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private currentCompetition: string;


  constructor(private participantVisitor: ParticipantVisitorService) { }


  ngOnInit() {}

  getTotalNumberOfParticipants() {
    return this.participantVisitor.getIdCount();
  }

  getCompetitions(){
    return this.participantVisitor.getCompetitions();
  }

  isReady(){
    return this.participantVisitor.isReady();
  }


}

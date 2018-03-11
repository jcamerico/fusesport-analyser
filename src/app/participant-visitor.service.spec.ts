import { TestBed, inject } from '@angular/core/testing';

import { ParticipantVisitorService } from './participant-visitor.service';
import {Participant} from "./participant.model";

describe('ParticipantVisitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantVisitorService]
    });
  });

  it('should be created', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    expect(service).toBeTruthy();
  }));

  it('should store a list of unique ids', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.account = '12345';
    const p2 = new Participant();
    p2.account = '12345';
    service.visit(p1);
    service.visit(p2);
    expect(service.getIdCount()).toBe(1);
  }));

  it('should store a list of unique and sorted competitions', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.competition = 'Competition B';
    const p2 = new Participant();
    p2.competition = 'Competition A';
    const p3 = new Participant();
    p3.competition = 'Competition B';
    service.visit(p1);
    service.visit(p2);
    service.visit(p3);
    expect(service.getCompetitions().length).toBe(2);
    expect(service.getCompetitions()[0]).toBe('Competition A');
    expect(service.getCompetitions()[1]).toBe('Competition B');
  }));

  it('should return the right number of participants per competition', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.account = '1';
    p1.competition = 'Competition B';
    const p2 = new Participant();
    p2.account = '2';
    p2.competition = 'Competition A';
    const p3 = new Participant();
    p3.account = '3';
    p3.competition = 'Competition B';
    const p4 = new Participant();
    p4.account = '3';
    p4.competition = 'Competition B';
    service.visit(p1);
    service.visit(p2);
    service.visit(p3);
    service.visit(p4);
    expect(service.getNumberOfParticipants('Competition A')).toBe(1);
    expect(service.getNumberOfParticipants('Competition B')).toBe(2);
  }));

  it('should return the right number of teams', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.account = '1';
    p1.competition = 'Competition B';
    p1.teamname = 'Team A';
    const p2 = new Participant();
    p2.account = '2';
    p2.competition = 'Competition B';
    p2.teamname = 'Team B';
    const p3 = new Participant();
    p3.account = '3';
    p3.competition = 'Competition B';
    p3.teamname = 'Team B';
    const p4 = new Participant();
    p4.account = '4';
    p4.competition = 'Competition B';
    p4.teamname = service.NO_TEAM_ASSIGNED;
    const p5 = new Participant();
    p5.account = '5';
    p5.competition = 'Competition A';
    p5.teamname = 'Team C';
    service.visit(p1);
    service.visit(p2);
    service.visit(p3);
    service.visit(p4);
    service.visit(p5);
    expect(service.getNumberOfTeams('Competition B')).toBe(2);
    expect(service.getNumberOfTeams('Competition A')).toBe(1);
  }));

  it('should return the sorted list of teams', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.account = '1';
    p1.competition = 'Competition B';
    p1.teamname = 'Team A';
    const p2 = new Participant();
    p2.account = '2';
    p2.competition = 'Competition B';
    p2.teamname = 'Team B';
    const p3 = new Participant();
    p3.account = '3';
    p3.competition = 'Competition B';
    p3.teamname = 'Team B';
    const p4 = new Participant();
    p4.account = '4';
    p4.competition = 'Competition B';
    p4.teamname = service.NO_TEAM_ASSIGNED;
    const p5 = new Participant();
    p5.account = '5';
    p5.competition = 'Competition B';
    p5.teamname = 'Team C';
    service.visit(p1);
    service.visit(p2);
    service.visit(p3);
    service.visit(p4);
    service.visit(p5);
    expect(service.getTeams('Competition B').length).toBe(4);
    expect(service.getTeams('Competition B')[0]).toBe(service.NO_TEAM_ASSIGNED);
    expect(service.getTeams('Competition B')[1]).toBe('Team A');
    expect(service.getTeams('Competition B')[2]).toBe('Team C');
    expect(service.getTeams('Competition B')[3]).toBe('Team B');
  }));

  it('should return the sorted list of team members', inject([ParticipantVisitorService], (service: ParticipantVisitorService) => {
    const p1 = new Participant();
    p1.account = '1';
    p1.competition = 'Competition B';
    p1.teamname = 'Team B';
    const p2 = new Participant();
    p2.account = '2';
    p2.competition = 'Competition B';
    p2.teamname = 'Team B';
    const p3 = new Participant();
    p3.account = '3';
    p3.competition = 'Competition B';
    p3.teamname = 'Team B';
    const p4 = new Participant();
    p4.account = '4';
    p4.competition = 'Competition A';
    p4.teamname = 'Team B';
    service.visit(p2);
    service.visit(p3);
    service.visit(p1);
    service.visit(p4);
    expect(service.getTeamMembers('Competition B', 'Team B').length).toBe(3);
    expect(service.getTeamMembers('Competition B', 'Team B')[0].account).toBe('1');
    expect(service.getTeamMembers('Competition B', 'Team B')[1].account).toBe('2');
    expect(service.getTeamMembers('Competition B', 'Team B')[2].account).toBe('3');
  }));

});

import { Injectable } from '@angular/core';
import {Participant} from "./participant.model";

@Injectable()
export class ParticipantVisitorService {

  readonly NO_TEAM_ASSIGNED = '(Team not yet assigned)';
  private ids = [];
  private competitions = [];

  private participantsPerTeam = new Map<string, Participant[]>();
  private participantsPerCompetition = new Map<string, string[]>();
  private teamsPerCompetition = new Map<string, string[]>();
  private ready =  false;

  constructor() { }

  visit(participant: Participant) {

    // Unique number of participants
    const id = participant.account;
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }

    // Participants per competition
    const competition = participant.competition;
    if (!this.competitions.includes(competition)){
      this.competitions.push(competition);
    }
    if (!this.participantsPerCompetition.get(competition)) {
      this.participantsPerCompetition.set(competition, [id]);
    } else if (!this.participantsPerCompetition.get(competition).includes(id)) {
      this.participantsPerCompetition.get(competition).push(id);
    }

    // Participants per team
    const teamName = participant.teamname;
    let teamParticipants = this.participantsPerTeam.get(teamName);
    if (!teamParticipants){
      this.participantsPerTeam.set(teamName, [participant]);
    } else {
      teamParticipants.push(participant);
    }

    // Teams per competition
    if (!this.teamsPerCompetition.get(competition)) {
      this.teamsPerCompetition.set(competition, [teamName]);
    } else {
      if (!this.teamsPerCompetition.get(competition).includes(teamName)) {
        this.teamsPerCompetition.get(competition).push(teamName);
      }
    }

  }

  setReady(ready: boolean) {
    this.ready = ready;
  }

  isReady(){
    return this.ready;
  }

  getIdCount() {
    return this.ids.length;
  }

  getCompetitions() {
    this.competitions.sort();
    return this.competitions;
  }

  getNumberOfParticipants(competition: string) {
    return this.participantsPerCompetition.get(competition).length;
  }

  getNumberOfTeams(competition: string) {
    const numberOfTeams = this.teamsPerCompetition.get(competition).length;
    if (this.teamsPerCompetition.get(competition).includes(this.NO_TEAM_ASSIGNED)) {
      return numberOfTeams - 1;
    } else {
      return numberOfTeams;
    }
  }

  getTeams(competition: string) {
    const teams = this.teamsPerCompetition.get(competition);
    teams.sort((team1: string, team2: string) => {
      if (team1 === this.NO_TEAM_ASSIGNED){
        return -1;
      }else if (team2 === this.NO_TEAM_ASSIGNED){
        return 1;
      }
      const team1Members = this.getTeamMembers(competition, team1).length;
      const team2Members = this.getTeamMembers(competition, team2).length;
      if (team1Members > team2Members) {
        return 1;
      } else if (team1Members < team2Members){
        return -1
      } else {
        return team1.localeCompare(team2);
      }
    });
    return teams;
  }

  getTeamMembers(competition: string, team: string) {
    const teamMembers = [];
    const idsAdded = [];
    for (let participant of this.participantsPerTeam.get(team) ) {
      if (participant.competition === competition && !idsAdded.includes(participant.account)) {
        teamMembers.push(participant);
        idsAdded.push(participant.account);
      }
    }
    teamMembers.sort((p1: Participant, p2: Participant) => {
       if (+p1.account > +p2.account) {
         return 1;
       } else if (+p1.account < +p2.account){
         return -1
       } else {
         return 0;
       }
    })
    return teamMembers;
  }

}


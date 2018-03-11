import {ParticipantVisitorService} from "./participant-visitor.service";
export class Participant {

  competition: string;
  account: string;
  teamcode: string;
  teamname: string;
  teamcolors: string;
  position: string;
  role: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;

  accept(participantVisitor: ParticipantVisitorService) {
    participantVisitor.visit(this);
  }

}

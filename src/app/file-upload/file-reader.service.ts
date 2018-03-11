import { Injectable } from '@angular/core';
import {Participant} from "../participant.model";
import {ParticipantVisitorService} from "../participant-visitor.service";

@Injectable()
export class FileReaderService {

  constructor() { }

  readParticipants(file: any, participantVisitor: ParticipantVisitorService) {
    const reader: FileReader = this.createFileReader();
    participantVisitor.setReady(false);
    reader.readAsText(file);
    reader.onload = () => {
      const csv: string = reader.result;
      const allTextLines = csv.split(/[\r\n\r]/);
      const headers = allTextLines[0].split(',');
      for (let i = 1; i < allTextLines.length; i++) {
        // We cannot split the content purely on the comma because addresses have comma in it, so it must be commas outside quotes
        let data = allTextLines[i].split(',\"');
        if (data.length === headers.length) {
          const participant = new Participant();
          for (let j = 0; j < headers.length; j++) {
            const headerName = this.cleanHeader(headers[j]);
            participant[headerName] = this.cleanValue(data[j]);
          }
          participant.accept(participantVisitor);
        }
      }
      participantVisitor.setReady(true);
    }
  }

  private createFileReader() {
      return new FileReader();
  }

  private cleanHeader(value: string) {
    let cleanedString = value.replace(/\s/g, "");
    while (cleanedString.indexOf('\"') !== -1) {
      cleanedString = cleanedString.replace('\"', "");
    }
    return cleanedString.replace('#', '').toLowerCase();
  }

  private cleanValue(value: string) {
    let cleanedString = value;
    while (cleanedString.indexOf('\"') !== -1) {
      cleanedString = cleanedString.replace('\"', "");
    }
    return cleanedString;
  }

}

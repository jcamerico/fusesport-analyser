import { Component, OnInit } from '@angular/core';
import {FileReaderService} from "./file-reader.service";
import {ParticipantVisitorService} from "../participant-visitor.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(private fileReaderService: FileReaderService, private participantVisitor: ParticipantVisitorService) { }

  ngOnInit() {
  }

  loadCsvFile(fileInput: any) {
    const fileRead = fileInput.target.files[0];
    this.fileReaderService.readParticipants(fileRead, this.participantVisitor);
  }
}

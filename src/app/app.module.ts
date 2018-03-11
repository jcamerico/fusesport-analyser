import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {FileReaderService} from "./file-upload/file-reader.service";
import {ParticipantVisitorService} from "./participant-visitor.service";
import {StatsModule} from "./stats/index";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploadComponent,
  ],
  imports: [
    FormsModule,
    StatsModule,
    BrowserModule,
  ],
  providers: [FileReaderService, ParticipantVisitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

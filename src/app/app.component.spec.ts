import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {HeaderComponent} from "./header/header.component";
import {StatsModule} from "./stats/index";
import {FormsModule} from "@angular/forms";
import {FileReaderService} from "./file-upload/file-reader.service";
import {ParticipantVisitorService} from "./participant-visitor.service";
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FileUploadComponent,
        HeaderComponent,
      ],
      imports: [
        FormsModule,
        StatsModule
      ],
      providers: [
        FileReaderService,
        ParticipantVisitorService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

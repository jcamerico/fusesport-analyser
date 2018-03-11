import {StatsComponent} from "./stats.component";
import {CompetStatsComponent} from "./compet-stats/compet-stats.component";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [StatsComponent, CompetStatsComponent],
  imports: [CommonModule, NgbModule.forRoot(), FormsModule],
  exports: [StatsComponent]
})
export class StatsModule {

}

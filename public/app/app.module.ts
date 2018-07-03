import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component"
import {EventUtility} from "./Utilities/EventUtility.service";
import {GridUtility} from "./Utilities/GridUtility.service";
import {PageQuantityUtility} from "./Utilities/PageQuantityUtility.service";
import {ProjectTrackerComponent} from "./ProjectTracker.component";
import { ProjectTrackerAdminViewModel } from "./ViewModels/ProjectTrackerAdminViewModel.service";
import { ProjectTrackerDetailRecordViewModel } from "./ViewModels/ProjectTrackerDetailRecordViewModel.service";
import { ProjectTrackerDetailViewModel } from "./ViewModels/ProjectTrackerDetailViewModel.service";
import { ProjectTrackerListViewModel } from "./ViewModels/ProjectTrackerListViewModel.service";
import { ProjectsDataAccess } from './DataAccess/ProjectsDataAccess.service';
import { ProjectStatusesDataAccess } from './DataAccess/ProjectStatusesDataAccess.service';
import { ProjectTypesDataAccess } from './DataAccess/ProjectTypesDataAccess.service';
import { ProjectPhasesDataAccess } from './DataAccess/ProjectPhasesDataAccess.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        UpgradeModule
    ],
    declarations: [
        AppComponent,
        ProjectTrackerComponent
    ],
    providers: [
        EventUtility,
        GridUtility,
        PageQuantityUtility,
        ProjectTrackerAdminViewModel,
        ProjectTrackerDetailRecordViewModel,
        ProjectTrackerDetailViewModel,
        ProjectTrackerListViewModel,
        ProjectsDataAccess, 
        ProjectStatusesDataAccess,
        ProjectTypesDataAccess,
        ProjectPhasesDataAccess
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ProjectTrackerComponent
    ]

})
export class AppModule { }

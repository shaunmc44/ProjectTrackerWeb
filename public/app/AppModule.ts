import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { EventUtility } from "./Utilities/EventUtility.service";
import { GridUtility } from "./Utilities/GridUtility.service";
import { PageQuantityUtility } from "./Utilities/PageQuantityUtility.service";
import { ProjectTrackerComponent } from "./ProjectTracker.component";
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
        PageQuantityUtility
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ProjectTrackerComponent
    ]
})
export class AppModule {
}
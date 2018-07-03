import { Component } from "@angular/core";
import { ProjectTrackerAdminViewModel } from "./ViewModels/ProjectTrackerAdminViewModel.service";

@Component({
    selector: 'project-tracker',
    template: `
        <div class='ng-view'></div>
    `
})
export class AppComponent {}
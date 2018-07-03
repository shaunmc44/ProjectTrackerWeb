import{Component, Inject} from "@angular/core";
import {EVENT_PROJECT_LIST_LOADED} from "../app/ViewModels/ProjectTrackerListViewModel.service";
import {EventUtility} from "./Utilities/EventUtility.service";
import {GridUtility} from "./Utilities/GridUtility.service";
import {PageQuantityUtility} from "./Utilities/PageQuantityUtility.service";
import {ProjectTrackerAdminViewModel} from "./ViewModels/ProjectTrackerAdminViewModel.service";
import {ProjectTrackerListViewModel} from "./ViewModels/ProjectTrackerListViewModel.service";
import {ProjectTrackerDetailViewModel} from "./ViewModels/ProjectTrackerDetailViewModel.service";
import {ProjectTrackerDetailRecordViewModel} from "./ViewModels/ProjectTrackerDetailRecordViewModel.service";
import {ProjectsDataAccess} from "./DataAccess/ProjectsDataAccess.service";
import {ProjectStatusesDataAccess} from "./DataAccess/ProjectStatusesDataAccess.service";
import {ProjectTypesDataAccess} from "./DataAccess/ProjectTypesDataAccess.service";
import {ProjectPhasesDataAccess} from "./DataAccess/ProjectPhasesDataAccess.service";

@Component({
    selector: 'project-tracker',
    templateUrl: 'ProjectTracker.component.html',
    providers: [
                ProjectTrackerAdminViewModel,
                ProjectTrackerListViewModel,
                ProjectTrackerDetailViewModel,
                ProjectTrackerDetailRecordViewModel,
                ProjectsDataAccess,
                ProjectStatusesDataAccess,
                ProjectTypesDataAccess,
                ProjectPhasesDataAccess
            ]
})
export class ProjectTrackerComponent {

    isHidden: boolean;
    isErrorHidden: boolean;
    filteredProjects: any;

    constructor(@Inject(ProjectTrackerAdminViewModel) private viewModel, @Inject(EventUtility) private EventUtility, @Inject(GridUtility) private projectGrid, @Inject(PageQuantityUtility) private projectPageQuantity) {

        this.isHidden = this.viewModel.Message === '';
        this.isErrorHidden = this.viewModel.ErrorMessage === '';

        this.projectGrid.ItemsPerPage = this.projectPageQuantity.GetDefaultPageQuantity(50).toString();

        EventUtility.Subscribe(EVENT_PROJECT_LIST_LOADED, (Message, AllProjects) => {
            this.projectGrid.SetNumberOfItems(AllProjects.length);
        });

        // this.$watch('filteredProjects', function (filteredProjects) {
        //     if (filteredProjects != undefined && this.projectGridFilter !== undefined) {
        //         if (this.projectGridFilter !== "") {
        //             this.projectGrid.SetNumberOfItems(this.filteredProjects.length);
        //             this.viewModel.Message = this.filteredProjects.length + " project(s) were found.";
        //         }
        //         else {
        //             this.projectGrid.SetNumberOfItems(this.viewModel.List.AllProjects.length);
        //             this.viewModel.Message = this.viewModel.List.AllProjects.length + " project(s) were found.";
        //         }
        //     }
        // }, true);
    }

    IsFormValid(isValid) {
        if (!isValid)
            return "radioInvalid";
        else
            return "";
    }
}


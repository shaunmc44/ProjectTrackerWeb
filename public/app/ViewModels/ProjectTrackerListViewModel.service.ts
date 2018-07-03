import ProjectModel from "../Models/ProjectModel";
import {EventUtility} from "../Utilities/EventUtility.service";
import { Injectable, Inject } from "@angular/core";
import {ProjectsDataAccess} from "../DataAccess/ProjectsDataAccess.service";
import {iProjectModel} from '../Models/ProjectModel';
export var EVENT_PROJECT_LIST_LOADED = "ProjectList_Loaded";
export var EVENT_PROJECT_LIST_ERROR = "ProjectList_Error";

@Injectable()
export class ProjectTrackerListViewModel {
    isBusy: boolean;
    AllProjects: ProjectModel[];

    constructor(@Inject(ProjectsDataAccess) private ProjectsDataAccess, @Inject(EventUtility) private EventUtility) {
        this.AllProjects = [];

        this.LoadItems(null);
    }

    RaiseItemsLoaded(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_LIST_LOADED, Message, this.AllProjects);
    }

    RaiseError(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_LIST_ERROR, Message);
    }

    IsBusy() {
        return this.isBusy;
    }

    LoadItems(PassThroughMessage) {
        this.AllProjects.length = 0;
        this.isBusy = true;

        this.ProjectsDataAccess.SelectAll()
        .subscribe(
            (result : iProjectModel[]) => {
           
            for(var i =0; i < (result as any).value.length; i++) {
                this.AllProjects.push(new ProjectModel((result as any).value[i]));
            }

            if (PassThroughMessage) {
                this.RaiseItemsLoaded(PassThroughMessage);
            }
            else {
                this.RaiseItemsLoaded("Projects were retrieved successfully");
            }
        }, (error) => {
            this.RaiseError(error.Message);
        });

        this.isBusy = false;
    }


    CanExecuteReloadCommand() {
        return !this.isBusy;
    }

    ReloadCommand(PassThroughMessage) {
        if (this.CanExecuteReloadCommand()) {
            this.LoadItems(PassThroughMessage);
        }
    }
}
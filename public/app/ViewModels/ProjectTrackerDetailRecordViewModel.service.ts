import TypeModel from "../Models/TypeModel";
import StatusModel from "../Models/StatusModel";
import PhaseModel from "../Models/PhaseModel";
import {EventUtility} from "../Utilities/EventUtility.service";
import {ProjectsDataAccess} from "../DataAccess/ProjectsDataAccess.service";
import {ProjectStatusesDataAccess} from "../DataAccess/ProjectStatusesDataAccess.service";
import {ProjectTypesDataAccess} from "../DataAccess/ProjectTypesDataAccess.service";
import {ProjectPhasesDataAccess} from "../DataAccess/ProjectPhasesDataAccess.service";
import ProjectModel, { iProjectModel } from '../Models/ProjectModel';
import {iPhaseModel} from '../Models/PhaseModel';
import {iStatusModel} from '../Models/StatusModel';
import {iTypeModel} from '../Models/TypeModel';
export var EVENT_PROJECT_DETAIL_RECORD_SELECTED = "ProjectDetailRecord_Selected";
export var EVENT_PROJECT_DETAIL_RECORD_SAVED = "ProjectDetailRecord_Saved";
export var EVENT_PROJECT_DETAIL_RECORD_DELETED = "ProjectDetailRecord_Deleted";
export var EVENT_PROJECT_DETAIL_RECORD_ERROR = "ProjectDetailRecord_Error";

import {Injectable, Inject} from "@angular/core";

@Injectable()
export class ProjectTrackerDetailRecordViewModel {

    displayMode: string;
    isNew: boolean;
    Project: any;
    AllPhases: any;
    AllTypes: any;
    AllStatuses: any;
    isBusy: boolean;
    canSave: boolean;
    canEdit: boolean;

    readonly DISPLAY_MODE_LIST = "LIST";
    readonly DISPLAY_MODE_NONE = "";
    readonly DISPLAY_MODE_INSERT = "INSERT";
    readonly DISPLAY_MODE_UPDATE = "UPDATE";

    constructor(@Inject(ProjectsDataAccess) private ProjectsDataAccess, @Inject(ProjectStatusesDataAccess) private ProjectStatusesDataAccess, @Inject(ProjectPhasesDataAccess) private ProjectPhasesDataAccess, @Inject(ProjectTypesDataAccess) private ProjectTypesDataAccess, @Inject(EventUtility) private EventUtility) {
        
        this.displayMode = this.DISPLAY_MODE_NONE;
        this.isNew = false;
        this.Project = null;
        this.AllPhases = [];
        this.AllTypes = [];
        this.AllStatuses = [];
        this.isBusy = false;
        this.canSave = true;
        this.canEdit = true;
        this.Project = new ProjectModel(null);


        this.LoadPhases();
        this.LoadTypes();
        this.LoadStatuses();
    }


    RaiseSelected(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_SELECTED, Message);
    }

    RaiseSaved(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_SAVED, Message);
    }

    RaiseDeleted(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_DELETED, Message);
    }

    RaiseError(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_ERROR, Message);
    }

    IsInInsertMode() {
        return this.displayMode === this.DISPLAY_MODE_INSERT;
    }

    IsInUpdateMode() {
        return this.displayMode === this.DISPLAY_MODE_UPDATE;
    }


    SetProject(Project) {
        if (Project.ProjectId != 0) {
            this.ProjectsDataAccess.Select(Project.ProjectId)
            .subscribe(
                (Result: iProjectModel) => {
                    Project.Reload(Result);
                    this.Project = Project;
                    this.displayMode = this.DISPLAY_MODE_UPDATE;
                    this.RaiseSelected("'" + Result.ProjectName + "' was loaded successfully");

                }, (error) => {
                    this.RaiseError(error.Message);
                });
        }
        else {
            this.Project = Project;
            this.displayMode = this.DISPLAY_MODE_INSERT;
        }
    }

    ClearProject() {
        if (this.IsInUpdateMode()) {
            this.ProjectsDataAccess.Select(this.Project.ProjectId)
            .subscribe(
                (Result: iProjectModel) => {
                    this.Project.Reload(Result);
                    this.Project = null;
                });
        } else {
            this.Project = null;
        }

        this.displayMode = this.DISPLAY_MODE_NONE;
    }

    IsBusy() {
        return this.isBusy;
    }

    CanExecuteSaveCommand = function () {
        return this.Project != null && this.IsInInsertMode() && !this.isBusy && this.canSave;
    }

    CanExecuteEditCommand() {
        return this.Project != null && this.IsInUpdateMode() && !this.isBusy && this.canEdit;
    }

    SaveCommand(form) {
        if ((this.CanExecuteSaveCommand() || this.CanExecuteEditCommand()) && form.form.valid)
            this.save();
    }


    //TODO: this will change
    save() {
        this.isBusy = true;

        if (this.isNew) {
            this.ProjectsDataAccess.Save(this.Project.ToObject())
            .subscribe(
                (Result: iProjectModel) => {
                    this.isBusy = false;
                    this.isNew = false;
                    this.RaiseSaved("Project saved successfully");
                    this.displayMode = this.DISPLAY_MODE_LIST;
                },
                (Error) => {
                    this.isBusy = false;
                    this.RaiseError("an error occurred");
                });
        }
        else {
            this.ProjectsDataAccess.Update(this.Project.ToObject())
            .subscribe(
                (Result: iProjectModel) => {
                    this.isBusy = false;
                    this.RaiseSaved("Project saved successfully");
                    this.displayMode = this.DISPLAY_MODE_LIST;
                },
                (Error) => {
                    this.isBusy = false;
                    this.RaiseError("an error occurred");
                });
        }
    }

    CanExecuteResetCommand() {
        return this.Project != null && (this.IsInInsertMode() || this.IsInUpdateMode()) && !this.isBusy;
    }

    ResetCommand() {
        if (this.CanExecuteResetCommand()) {
            if (this.IsInUpdateMode()) {
                this.isBusy = true;

                this.ProjectsDataAccess.Select(this.Project.ProjectId)
                .subscribe(
                    (Result : iProjectModel) => {
                        this.isBusy = false;

                        this.Project.Reload(Result);
                        this.RaiseSelected("Project reloaded.");
                    }, (error) => {
                        this.RaiseError(error.Message);
                    });
            }
            else if (this.IsInInsertMode()) {
                this.Project.Clear();
            }
        }
    }

    LoadPhases() {
        this.AllPhases.length = 0;
        this.isBusy = true;

        this.ProjectPhasesDataAccess.SelectAll()
        .subscribe(
            (result : iPhaseModel[]) => {
                for(var i = 0;i < (result as any).value.length; i++) {
                    this.AllPhases.push(new PhaseModel((result as any).value[i]));
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }

    LoadTypes() {
        this.AllTypes.length = 0;
        this.isBusy = true;

        this.ProjectTypesDataAccess.SelectAll()
        .subscribe(
            (result : iTypeModel[]) => {
                for(var i = 0;i < (result as any).value.length; i++) {
                    this.AllTypes.push(new TypeModel((result as any).value[i]));
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }

    LoadStatuses() {
        this.AllTypes.length = 0;
        this.isBusy = true;

        this.ProjectStatusesDataAccess.SelectAll()
        .subscribe(
            (result : iStatusModel[]) => {
                for(var i = 0;i < (result as any).value.length; i++) {
                    this.AllStatuses.push(new StatusModel((result as any).value[i]));
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }
}
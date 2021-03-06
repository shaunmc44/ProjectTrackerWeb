﻿import ProjectModel from "../Models/ProjectModel";
import {EVENT_PROJECT_DETAIL_RECORD_SAVED, EVENT_PROJECT_DETAIL_RECORD_SELECTED, 
        EVENT_PROJECT_DETAIL_RECORD_DELETED, EVENT_PROJECT_DETAIL_RECORD_ERROR} 
from "./ProjectTrackerDetailRecordViewModel.service";
import {EVENT_PROJECT_LIST_ERROR, EVENT_PROJECT_LIST_LOADED, ProjectTrackerListViewModel} from "./ProjectTrackerListViewModel.service";
import {Injectable, Inject} from "@angular/core";
import {ProjectTrackerDetailViewModel} from "./ProjectTrackerDetailViewModel.service";
import {EventUtility} from "../Utilities/EventUtility.service";

@Injectable()
export class ProjectTrackerAdminViewModel {

    displayMode: string;
    reloadList: boolean;
    Message: string;
    ErrorMessage: string;
    canSave: boolean;
    canEdit: boolean;

    readonly DISPLAY_MODE_NONE = "";
    readonly DISPLAY_MODE_LIST = "LIST";
    readonly DISPLAY_MODE_DETAIL = "DETAIL";

    constructor(@Inject(ProjectTrackerListViewModel) private List, @Inject(ProjectTrackerDetailViewModel) private Detail, @Inject(EventUtility) private EventUtility) {
        this.displayMode = this.DISPLAY_MODE_NONE;
        this.reloadList = false;
        this.Message = "Loading...";
        this.ErrorMessage = "";
        this.canSave = true;
        this.canEdit = true;

        this.EventUtility.Subscribe(EVENT_PROJECT_LIST_LOADED, this.ProjectList_Loaded);
        this.EventUtility.Subscribe(EVENT_PROJECT_LIST_ERROR, this.ProjectList_Error);

        this.EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_SELECTED, this.ProjectDetailRecord_Selected);
        this.EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_SAVED, this.ProjectDetailRecord_Saved);
        this.EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_DELETED, this.ProjectDetailRecord_Deleted);
        this.EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_ERROR, this.ProjectDetail_Error);

    }

    IsInListMode() { return this.displayMode === this.DISPLAY_MODE_LIST; }
    IsInDetailMode() { return this.displayMode === this.DISPLAY_MODE_DETAIL; }

    SetMessage(Message) {
        this.Message = Message;
        this.ErrorMessage = "";
    }

    SetErrorMessage(Message) {
        this.Message = "";
        this.ErrorMessage = Message;
    }

    public ProjectList_Loaded = (Message) => {
        this.SetMessage(Message);

        if (this.displayMode == this.DISPLAY_MODE_NONE) {
            this.displayMode = this.DISPLAY_MODE_LIST;
        }
    }

    public ProjectList_Error = (Message) => {
        this.SetErrorMessage(Message);
    }



    public ProjectDetailRecord_Selected = (Message) => {
        this.SetMessage(Message);
    }


    public ProjectDetailRecord_Saved = (Message) => {
        this.SetMessage(Message);
        this.reloadList = true;
        this.Detail.ClearProject();
        this.displayMode = this.DISPLAY_MODE_LIST;
    }

    public ProjectDetailRecord_Deleted = (Message) => {
        this.reloadList = true;
        this.CloseCommand(Message);
    }

    public ProjectDetail_Error = (Message) => {
        this.SetErrorMessage(Message);
    }

    IsBusy() {
        return this.Detail.IsBusy() || this.List.IsBusy();
    }

    SelectProject(Project) {
        this.Detail.SetProject(Project);
        this.displayMode = this.DISPLAY_MODE_DETAIL;
        this.reloadList = false;
    }

    CanExecuteCloseCommand() {
        return this.IsInDetailMode() && !this.IsBusy();
    }

    CloseCommand(Message) {
        if (this.CanExecuteCloseCommand()) {
            this.Detail.ClearProject();
            this.displayMode = this.DISPLAY_MODE_LIST;

            if (this.reloadList) {
                this.List.ReloadCommand(Message);
                this.reloadList = false;
            }
            this.Detail.Record.isNew = false;
            this.SetMessage(Message);
        }
    }


    CanExecuteNewCommand() {
        return this.IsInListMode() && !this.IsBusy() && this.canSave;
    };

    NewCommand() {
        if (this.CanExecuteNewCommand()) {
            this.Detail.SetProject(new ProjectModel(null));
            this.displayMode = this.DISPLAY_MODE_DETAIL;
            this.SetMessage("A new project was created successfully.");
            this.Detail.Record.isNew = true;
        }
    }


    CanExecuteEditCommand() {
        return this.IsInListMode() && !this.IsBusy() && this.canEdit;
    }
}

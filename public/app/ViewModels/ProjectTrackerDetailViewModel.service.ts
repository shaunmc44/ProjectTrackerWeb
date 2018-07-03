import {ProjectTrackerDetailRecordViewModel} from "./ProjectTrackerDetailRecordViewModel.service";
import {Injectable, Inject} from "@angular/core";

@Injectable()
export class ProjectTrackerDetailViewModel {

    Project: any;
    displayMode: string;

    readonly DISPLAY_MODE_NONE = "NONE";
    readonly DISPLAY_MODE_RECORD = "RECORD";


    constructor(@Inject(ProjectTrackerDetailRecordViewModel) private Record) {

        this.displayMode = this.DISPLAY_MODE_NONE;
        this.Project = null;
    }
    IsInRecordMode() {
        return this.displayMode == this.DISPLAY_MODE_RECORD;
    }

    IsBusy() {
        return this.Record.IsBusy()
    }

    SetProject(Project) {
        this.Project = Project;
        this.Record.SetProject(Project);

        this.displayMode = this.DISPLAY_MODE_RECORD;
    }

    ClearProject() {
        this.Project = null;
        this.Record.ClearProject();

        this.displayMode = this.DISPLAY_MODE_RECORD;
    }

    CanExecuteRecordCommand() {
        return this.Project != null && !this.IsInRecordMode() && !this.IsBusy();
    }

    RecordCommand() {
        if (this.CanExecuteRecordCommand()) {
            this.Record.SetProject(this.Project);
            this.displayMode = this.DISPLAY_MODE_RECORD;
        }
    }
}

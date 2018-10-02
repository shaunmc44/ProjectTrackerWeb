import {DateUtility} from "../Utilities/DateUtility";

export interface iProjectModel {
    ProjectId: number;
    ProjectName: string;
    ProjectTypeId: number;
    ProjectStatusId: number;
    IsInternalIT: boolean;
    ProjectOwner: string;
    ProjectManager: string;
    StartDate: Date;
    ProjectPhaseId: number;
    PhasePercentComplete: number;
    PhaseEndDate: Date;
    OverallPercentComplete: number;
    ProjectEndDate: Date;
    IsWaiting: boolean;
    Comments: string;
}

export default class ProjectModel {
    ProjectId: number;
    ProjectName: string;
    ProjectTypeId: number;
    ProjectStatusId: number;
    IsInternalIT: boolean;
    ProjectOwner: string;
    ProjectManager: string;
    StartDate: Date;
    ProjectPhaseId: number;
    PhasePercentComplete: number;
    PhaseEndDate: Date;
    OverallPercentComplete: number;
    ProjectEndDate: Date;
    IsWaiting: boolean;
    Comments: string;
    ProjectPhaseName: string;
    ProjectTypeName: string;
    ProjectStatusName: string;
    DateUtility: any;

    constructor(Project) {
        this.DateUtility = new DateUtility();
        if (Project !== null) {
            this.ProjectId = Project.ProjectId;
            this.ProjectName = Project.ProjectName;
            this.ProjectTypeId = Project.ProjectTypeId;
            this.ProjectStatusId = Project.ProjectStatusId;
            this.IsInternalIT = Project.IsInternalIT;
            this.ProjectOwner = Project.ProjectOwner;
            this.ProjectManager = Project.ProjectManager;
            this.StartDate = Project.StartDate !== null ? new Date(Project.StartDate) : null;
            this.ProjectPhaseId = Project.ProjectPhaseId;
            this.PhasePercentComplete = Project.PhasePercentComplete;
            this.PhaseEndDate = Project.PhaseEndDate !== null ? new Date(Project.PhaseEndDate) : null;
            this.OverallPercentComplete = Project.OverallPercentComplete;
            this.ProjectEndDate = Project.ProjectEndDate !== null ? new Date(Project.ProjectEndDate) : null;
            this.IsWaiting = Project.IsWaiting;
            this.Comments = Project.Comments;

            this.ProjectPhaseName = Project.ProjectPhase.ProjectPhaseName;
            this.ProjectTypeName = Project.ProjectType.ProjectTypeName;
            this.ProjectStatusName = Project.ProjectStatus.ProjectStatusName;
        }
        else {
            this.ProjectId = 0;
            this.ProjectName = null;
            this.ProjectTypeId = 1;
            this.ProjectStatusId = 1;
            this.IsInternalIT = null;
            this.ProjectOwner = null;
            this.ProjectManager = null;
            this.StartDate = null;
            this.ProjectPhaseId = 1;
            this.PhasePercentComplete = 0;
            this.PhaseEndDate = null;
            this.OverallPercentComplete = 0;
            this.ProjectEndDate = null;
            this.IsWaiting = null;
            this.Comments = null;
        }
    }

    Reload(NewProject) {
        this.ProjectId = NewProject.ProjectId;
        this.ProjectName = NewProject.ProjectName;
        this.ProjectTypeId = NewProject.ProjectTypeId;
        this.ProjectStatusId = NewProject.ProjectStatusId;
        this.IsInternalIT = NewProject.IsInternalIT;
        this.ProjectOwner = NewProject.ProjectOwner;
        this.ProjectManager = NewProject.ProjectManager;
        this.StartDate = NewProject.StartDate !== null ? new Date(NewProject.StartDate) : null;
        this.ProjectPhaseId = NewProject.ProjectPhaseId;
        this.PhasePercentComplete = NewProject.PhasePercentComplete;
        this.PhaseEndDate = NewProject.PhaseEndDate !== null ? new Date(NewProject.PhaseEndDate) : null;
        this.OverallPercentComplete = NewProject.OverallPercentComplete;
        this.ProjectEndDate = NewProject.ProjectEndDate !== null ? new Date(NewProject.ProjectEndDate) : null;
        this.IsWaiting = NewProject.IsWaiting;
        this.Comments = NewProject.Comments;
    }

    Clear() {
        this.ProjectName = null;
        this.ProjectTypeId = null;
        this.ProjectStatusId = null;
        this.IsInternalIT = null;
        this.ProjectOwner = null;
        this.ProjectManager = null;
        this.StartDate = null;
        this.ProjectPhaseId = null;
        this.PhasePercentComplete = null;
        this.PhaseEndDate = null;
        this.OverallPercentComplete = null;
        this.ProjectEndDate = null;
        this.IsWaiting = null;
        this.Comments = null;
    }

    ToObject() {
        return {
            ProjectId: this.ProjectId,
            ProjectName: this.ProjectName,
            ProjectTypeId: this.ProjectTypeId,
            ProjectStatusId: this.ProjectStatusId,
            IsInternalIT: this.IsInternalIT === true ? true : false,
            ProjectOwner: this.ProjectOwner,
            ProjectManager: this.ProjectManager,
            StartDate: this.StartDate,
            ProjectPhaseId: this.ProjectPhaseId,
            PhasePercentComplete: this.PhasePercentComplete,
            PhaseEndDate: this.PhaseEndDate,
            OverallPercentComplete: this.OverallPercentComplete,
            ProjectEndDate: this.ProjectEndDate,
            IsWaiting: this.IsWaiting === true ? true : false,
            Comments: this.Comments
        };
    }
}

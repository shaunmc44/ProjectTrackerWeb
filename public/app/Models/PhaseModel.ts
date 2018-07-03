export interface iPhaseModel{
    ProjectPhaseId: number;
    ProjectPhaseName: string;
    ProjectPhaseDescription: string;
}

export default class PhaseModel {
    ProjectPhaseId: number;
    ProjectPhaseName: string;
    ProjectPhaseDescription: string;

    constructor(Phase) {

        this.ProjectPhaseId = Phase.ProjectPhaseId;
        this.ProjectPhaseName = Phase.ProjectPhaseName;
        this.ProjectPhaseDescription = Phase.ProjectPhaseDescription;
    }
}


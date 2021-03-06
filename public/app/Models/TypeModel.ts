﻿export interface iTypeModel {
    ProjectTypeId: number;
    ProjectTypeName: string;
    ProjectTypeDescription: string;
}

export default class TypeModel {
    ProjectTypeId: number;
    ProjectTypeName: string;
    ProjectTypeDescription: string;

    constructor(Type) {

        this.ProjectTypeId = Type.ProjectTypeId;
        this.ProjectTypeName = Type.ProjectTypeName;
        this.ProjectTypeDescription = Type.ProjectTypeDescription;
    }
}
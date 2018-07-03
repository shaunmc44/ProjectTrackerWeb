import getBaseUrl from './baseUrl';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { iProjectModel } from '../Models/ProjectModel';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectsDataAccess
{
    odataUrl: string;
    constructor(private http: HttpClient) {
        const rootUrl = getBaseUrl();
        this.odataUrl = rootUrl + "odata/Projects";
    }

    
    SelectAll(): Observable<iProjectModel>{
        return this.http.get<iProjectModel>(`${this.odataUrl}?$expand=ProjectPhase,ProjectType,ProjectStatus&$orderby=ProjectName`);
    }

    Select(projectId : number): Observable<iProjectModel>{
        var url = `${this.odataUrl}(${projectId})`;
        return this.http.get<iProjectModel>(url);
    }

    Update(project: iProjectModel): Observable<iProjectModel>{
        return this.http.put<iProjectModel>(`${this.odataUrl}(${project.ProjectId})`, project);
    }

    Save(project: iProjectModel): Observable<iProjectModel>{
        return this.http.post<iProjectModel>(`${this.odataUrl}(${project.ProjectId}`, project);
    }

    Delete(projectId: number): Observable<{}>{
        return this.http.delete(`${this.odataUrl}(${projectId})`);
    }
}

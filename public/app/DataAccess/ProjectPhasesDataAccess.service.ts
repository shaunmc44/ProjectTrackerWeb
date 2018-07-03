import getBaseUrl from './baseUrl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {iPhaseModel} from '../Models/PhaseModel'

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable()
export class ProjectPhasesDataAccess {
    odataUrl: string;

    constructor(private http: HttpClient) {
        const rootUrl = getBaseUrl();
        this.odataUrl = rootUrl + "odata/ProjectPhases";
    }

    SelectAll():Observable<iPhaseModel[]>{
        return this.http.get<iPhaseModel[]>(this.odataUrl);
    }

    Select(key : number){
        return this.http.get<iPhaseModel>(this.odataUrl + '(' + key + ')');
    }
}

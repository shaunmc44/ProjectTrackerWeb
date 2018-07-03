import getBaseUrl from './baseUrl';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { iStatusModel } from '../Models/StatusModel';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectStatusesDataAccess {
    odataUrl: string;

    constructor(private http : HttpClient) {
        const rootUrl = getBaseUrl();
        this.odataUrl = rootUrl + "odata/ProjectStatuses";
    }

    SelectAll() : Observable<iStatusModel[]>{
        return this.http.get<iStatusModel[]>(this.odataUrl);
    }

    Select(key : number) : Observable<iStatusModel>{
        return this.http.get<iStatusModel>(this.odataUrl + '(' + key + ')');
    }
}

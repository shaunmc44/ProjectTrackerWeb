import getBaseUrl from './baseUrl';
import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { iTypeModel } from '../Models/TypeModel';
import {Observable} from 'rxjs';
@Injectable()
export class ProjectTypesDataAccess {

    odataUrl: string;
    constructor(private http : HttpClient) {
        const rootUrl = getBaseUrl();
        this.odataUrl = rootUrl + "odata/ProjectTypes";
    }

    SelectAll() : Observable<iTypeModel[]>{
        return this.http.get<iTypeModel[]>(this.odataUrl);
    }

    Select(key : number) : Observable<iTypeModel>{
        return this.http.get<iTypeModel>(this.odataUrl+ '(' + key + ')');
    }
}

import getBaseUrl from './baseUrl';
import * as angular from "angular";
angular.module("ProjectTrackerApp").service("ProjectStatusesDataAccess", class ProjectStatusesDataAccess {
    odataUrl: string;

    constructor($resource) {
        const rootUrl = getBaseUrl();
        
        this.odataUrl = rootUrl + "odata/ProjectStatuses";
        return $resource("", {},
            {
                'SelectAll': { method: "GET", url: `${this.odataUrl}` },
                'Select': { method: 'GET', params: { key: "@key" }, url: `${this.odataUrl}(:key)` }
            });
    };
});

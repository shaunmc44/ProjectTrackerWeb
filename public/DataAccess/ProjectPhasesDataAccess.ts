import getBaseUrl from './baseUrl';
import * as angular from "angular";
angular.module("ProjectTrackerApp").service("ProjectPhasesDataAccess", class ProjectPhasesDataAccess {
    odataUrl: string;

    constructor($resource) {
        const rootUrl = getBaseUrl();

        this.odataUrl = rootUrl + "odata/ProjectPhases";
        return $resource("", {},
            {
                'SelectAll': { method: "GET", url: `${this.odataUrl}` },
                'Select': { method: 'GET', params: { key: "@key" }, url: `${this.odataUrl}(:key)` }
            });
    }
});

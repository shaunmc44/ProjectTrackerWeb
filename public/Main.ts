import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
import { AppModule } from "./app/AppModule";
import {EventUtility} from "./app/Utilities/EventUtility.service";
import {GridUtility} from "./app/Utilities/GridUtility.service";
import {PageQuantityUtility} from "./app/Utilities/PageQuantityUtility.service";
import { ProjectTrackerAdminViewModel } from './app/ViewModels/ProjectTrackerAdminViewModel.service';
import { ProjectTrackerDetailRecordViewModel } from './app/ViewModels/ProjectTrackerDetailRecordViewModel.service';
import { ProjectTrackerDetailViewModel } from './app/ViewModels/ProjectTrackerDetailViewModel.service';
import { ProjectTrackerListViewModel } from './app/ViewModels/ProjectTrackerListViewModel.service';
import {ProjectsDataAccess} from './app/DataAccess/ProjectsDataAccess.service';
import {ProjectTypesDataAccess} from './app/DataAccess/ProjectTypesDataAccess.service';
import {ProjectStatusesDataAccess} from './app/DataAccess/ProjectStatusesDataAccess.service';
import {ProjectPhasesDataAccess} from './app/DataAccess/ProjectPhasesDataAccess.service';
import {ProjectTrackerComponent} from './app/ProjectTracker.component';

declare var angular: angular.IAngularStatic;

var $element: JQuery = $("#ProjectTrackerApp");
var element: Element = $element.get(0);

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    angular.module('ProjectTrackerApp')
        .factory('EventUtility', downgradeInjectable(EventUtility))
        .factory('GridUtility', downgradeInjectable(GridUtility))
        .factory('PageQuantityUtility', downgradeInjectable(PageQuantityUtility))
        .factory('ProjectTrackerAdminViewModel', downgradeInjectable(ProjectTrackerAdminViewModel))
        .factory('ProjectTrackerDetailRecordViewModel', downgradeInjectable(ProjectTrackerDetailRecordViewModel))
        .factory('ProjectTrackerDetailViewModel', downgradeInjectable(ProjectTrackerDetailViewModel))
        .factory('ProjectTrackerListViewModel', downgradeInjectable(ProjectTrackerListViewModel))
        .factory('ProjectsDataAccess', downgradeInjectable(ProjectsDataAccess))
        .factory('ProjectStatusesDataAccess', downgradeInjectable(ProjectStatusesDataAccess))
        .factory('ProjectTypesDataAccess', downgradeInjectable(ProjectTypesDataAccess))
        .factory('ProjectPhasesDataAccess', downgradeInjectable(ProjectPhasesDataAccess))
        .directive('projectTracker', downgradeComponent({
            component: ProjectTrackerComponent
        }));

    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(element, ['ProjectTrackerApp']);
    console.log('hybrid app bootstrapped');
})
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import { AppModule } from "./app/app.module";
import {EventUtility} from "./app/Utilities/EventUtility.service";
import {GridUtility} from "./app/Utilities/GridUtility.service";
import {PageQuantityUtility} from "./app/Utilities/PageQuantityUtility.service";

declare var angular: angular.IAngularStatic;

var $element: JQuery = $("#ProjectTrackerApp");
var element: Element = $element.get(0);

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    angular.module('ProjectTrackerApp')
        .factory('EventUtility', downgradeInjectable(EventUtility))
        .factory('GridUtility', downgradeInjectable(GridUtility))
        .factory('PageQuantityUtility', downgradeInjectable(PageQuantityUtility));

    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(element, ['ProjectTrackerApp']);
    console.log('hybrid app bootstrapped');
})
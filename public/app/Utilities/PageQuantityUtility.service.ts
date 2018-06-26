import {Injectable} from "@angular/core";

Injectable()
export class PageQuantityUtility {
    GetDefaultPageQuantity(DefaultSelectedValue) {
        if (DefaultSelectedValue === undefined || DefaultSelectedValue === null)
        { return 20; } else { return DefaultSelectedValue; }
    }
}

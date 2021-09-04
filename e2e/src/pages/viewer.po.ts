import { browser, by, element } from "protractor";

export class ViewerPage {
    navigateTo() {
        return browser.get("/#/viewer-layout/registros") as Promise<any>;
    }

    getTable() {
        return element(by.css("tbody")).getText() as Promise<string>;
    }

    navigateToChart(){
        return browser.get("/#/viewer-layout/diagrama-barras") as Promise<any>;
    }

    getForm(){
        return element(by.css("form")).getText() as Promise<string>;
    }
}

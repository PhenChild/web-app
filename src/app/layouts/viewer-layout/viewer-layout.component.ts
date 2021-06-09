import { Component, OnInit } from "@angular/core";
import {ViewEncapsulation} from "@angular/core";

@Component({
    selector: "app-viewer-layout",
    templateUrl: "./viewer-layout.component.html",
    styleUrls: ["./viewer-layout.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class ViewerLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}

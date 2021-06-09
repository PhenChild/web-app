import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SidebarViewerComponent } from "./sidebar-viewer/sidebar-viewer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SidebarViewerComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SidebarViewerComponent
    ]
})
export class ComponentsModule { }

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarViewerComponent } from "./sidebar-viewer.component";

describe("SidebarViewerComponent", () => {
    let component: SidebarViewerComponent;
    let fixture: ComponentFixture<SidebarViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SidebarViewerComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});

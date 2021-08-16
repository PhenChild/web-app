import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";

import { DiagramaBarrasComponent } from "./diagrama-barras.component";

describe("DiagramaBarrasComponent", () => {
    let component: DiagramaBarrasComponent;
    let fixture: ComponentFixture<DiagramaBarrasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ DiagramaBarrasComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DiagramaBarrasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it("should create", () => {
        expect(component).toBeTruthy();
    }); */
});

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";

import { HorariosComponent } from "./horarios.component";

describe("HorariosComponent", () => {
    let component: HorariosComponent;
    let fixture: ComponentFixture<HorariosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ HorariosComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HorariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it("should create", () => {
        expect(component).toBeTruthy();
    });*/
});

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";

import { InstrumentosComponent } from "./instrumentos.component";

describe("InstrumentosComponent", () => {
    let component: InstrumentosComponent;
    let fixture: ComponentFixture<InstrumentosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ InstrumentosComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InstrumentosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it("should create", () => {
        expect(component).toBeTruthy();
    }); */
});

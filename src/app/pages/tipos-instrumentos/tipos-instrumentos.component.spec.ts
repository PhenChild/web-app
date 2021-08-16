import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";

import { TiposInstrumentosComponent } from "./tipos-instrumentos.component";

describe("TiposInstrumentosComponent", () => {
    let component: TiposInstrumentosComponent;
    let fixture: ComponentFixture<TiposInstrumentosComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ TiposInstrumentosComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TiposInstrumentosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it("should create", () => {
        expect(component).toBeTruthy();
    });*/
});

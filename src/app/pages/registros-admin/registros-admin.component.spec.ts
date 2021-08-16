import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";

import { RegistrosAdminComponent } from "./registros-admin.component";

describe("RegistrosAdminComponent", () => {
    let component: RegistrosAdminComponent;
    let fixture: ComponentFixture<RegistrosAdminComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ RegistrosAdminComponent ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrosAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});

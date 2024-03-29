import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";
import { Estacion } from "src/app/modelos/estacion";

import { RolesComponent } from "./roles.component";

describe("RolesComponent", () => {
    let component: RolesComponent;
    let fixture: ComponentFixture<RolesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ RolesComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RolesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /* it("Selecciona una estación.", () => {
        component.selectEstacion(new Estacion);
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        expect(table.style.display).toEqual('none');
    }); */
});

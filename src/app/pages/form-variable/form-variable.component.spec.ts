import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormVariableComponent } from "./form-variable.component";

describe("FormVariableComponent", () => {
    let component: FormVariableComponent;
    let fixture: ComponentFixture<FormVariableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ FormVariableComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormVariableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});

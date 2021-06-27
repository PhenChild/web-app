import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it("Existe token de acceso", () => {
        expect(guard.canActivate()).toBeTrue();
    });
});

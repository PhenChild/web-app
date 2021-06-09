import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { authLayoutRoutes } from "./auth-layout.routing";
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ToastrModule } from "ngx-toastr";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(authLayoutRoutes),
        FormsModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthLayoutModule { }

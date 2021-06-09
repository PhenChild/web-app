import { NgModule } from "@angular/core";
import { CommonModule, } from "@angular/common";
import { BrowserModule  } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { ViewerLayoutComponent } from "./layouts/viewer-layout/viewer-layout.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/admin-layout/usuarios",
        pathMatch: "full",
    }, {
        path: "admin-layout",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
                canActivate: [AuthGuard]
            }
        ]
    }, {
        path: "auth-layout",
        component: AuthLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
            }
        ]
    },
    {
        path: "viewer-layout",
        component: ViewerLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import('./layouts/viewer-layout/viewer-layout.module').then(m => m.ViewerLayoutModule)
            }
        ]
    }, {
        path: "**",
        redirectTo: "dashboard"
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }

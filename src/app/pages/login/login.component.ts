import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms';
import { AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor( private authService: AuthService,
    private router: Router) {}

  usuario = {
    email: "",
    password: "",
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(formLogin: NgForm){
    this.authService.login(this.usuario)
    .subscribe(
      data => {
        sessionStorage.setItem("token",data as string)
        this.router.navigate(['/admin-layout/usuarios'])
      },
      err => {
        console.log("Errorrr")
        console.log(err)
      }
    )
  }

}

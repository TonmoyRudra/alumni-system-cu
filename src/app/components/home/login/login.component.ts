import { Router } from '@angular/router';
import { GlobalService } from './../../../shared/service/global/global.service';
import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginResponce: any;

  constructor(public autenticationService: AutenticationService,
    public globalService: GlobalService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    this.globalService.showSpinner(true);
    console.log(signInForm.value);
    // const signInData= new SignInData(signInForm.value.usrnm,signInForm.value.psw);
    // this.autenticationService.autenticate(signInData);
    this.autenticationService
      .signIn(signInForm.value.usrnm, signInForm.value.psw)
      .subscribe(
        (result) => {
          console.log(result);
          //const sUser: any = result.user;//this.autenticationService.getSessionUser();
          if(result){

            this.loginResponce = result;
            this.router.navigateByUrl('/');
            setTimeout(() => {
              window.location.reload();
            }, 500);
            // this.autenticationService.logout();
            // this.globalService.showSwal(
              //   'Unauthorized',
              //   'You are not authorized to access this system',
              //   'warning'
              // );
            } else{
              this.globalService.showSpinner(false);
              this.globalService.showSwal(
                  'Unauthorized',
                  'You are not authorized to access this system. Please check your username and password.',
                  'warning'
                );
            }

        },
        (err) => {
          this.autenticationService.logout();
          console.log(err);
          console.log(err.status);
          this.globalService.showSpinner(false);
          this.globalService.showSwal('Error', err.error.message,'error')
          // if (err.status == 404) {
          //   Swal.fire(
          //     'Not Found',
          //     'Username or Password  not match',
          //     'warning'
          //   );
          // }
        }
      );
  }

}

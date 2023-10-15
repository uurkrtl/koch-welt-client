import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  errorMessage: string="";
  successMessage: string="";

  constructor(private formBuilder: FormBuilder, private authService:AuthService){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        console.log(response)
        localStorage.setItem("token",response)

        this.errorMessage=""
        this.successMessage="Login successful"
      },responseError=>{
        this.errorMessage=responseError.error
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }
  }

}
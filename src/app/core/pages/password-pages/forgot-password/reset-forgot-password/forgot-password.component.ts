import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup
  submitted = false;
  loading = false;
  error = '';

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router) { 
  }

  ngOnInit(): void {
    
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })

  }

  get field() {
    return this.forgotPasswordForm.controls;
  }
  
  /**
   * Handles form submition , send user email and redirects the user
   * to the password confirm page to change the forgotten password.
   *
   * @param form - FormGroup object
   */
  
   onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    } 
    this.loading = true;
    this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe( data => {
      this.router.navigate(['users/reset_password_confirm/:uid/:token']);
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

}
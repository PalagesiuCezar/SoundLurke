import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { MustMach } from 'src/app/shared/validators/authentication.validators';


@Component({
  selector: 'app-reset-forgot-password-confirm',
  templateUrl: './reset-forgot-password-confirm.component.html',
  styleUrls: ['./reset-forgot-password-confirm.component.scss']
})
export class ResetForgotPasswordConfirmComponent implements OnInit {

  forgotPasswordConfirmForm : FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor( private userService: UserService,
               private FormBuilder: FormBuilder,
               private router: Router,
               private route: ActivatedRoute) {  
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.params.uid;
    const token = this.route.snapshot.params.token;
    
    this.forgotPasswordConfirmForm = this.FormBuilder.group({
      uid: uid,
      token: token,
      new_password: ['', [Validators.required]],
      re_new_password: ['',[Validators.required]],
    }, {
      validators: MustMach('new_password','re_new_password')
    });
  }
  /***
   * Getter method to retrieve the form control elements for
   * better access in the HTML document.
   *
   * @return dict
   */
  get field() {
    return this.forgotPasswordConfirmForm.controls;
  }
  /**
   * Handles form submition , user is setting a new password
   * and then is redirected to login page
   *
   * @param form - FormGroup object
   */

  onSubmit(form : FormGroup){
    this.submitted = true;
    if (this.forgotPasswordConfirmForm.invalid){
      return;
    }
    
    this.loading = true;
    this.userService.forgotPasswordConfirm(this.forgotPasswordConfirmForm.value).subscribe( data => {
      this.router.navigate(['auth/login']);
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }
}

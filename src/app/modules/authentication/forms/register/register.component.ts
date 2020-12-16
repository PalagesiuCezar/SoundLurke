import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMach} from '../../../../shared/validators/authentication.validators';
import {UserService} from '../../../../core/services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      user_type: '1',
      confirmPassword: ['', [Validators.required]],
      termsConditions: ['', Validators.requiredTrue],
    }, {
      validator: MustMach('password', 'confirmPassword')
    });
  }

  /***
   * Getter method to retrieve the form control elements for
   * better access in the HTML document.
   *
   * @return dict
   */
  get field() {
    return this.registerForm.controls;
  }

  /**
   * Handles form submition , register user and redirects the user
   * to the login page to authenticate.
   *
   * @param form - FormGroup object
   */
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(data => {
      this.router.navigate(['auth/login']);
    }, error => {
      console.log(error);
      this.loading = false;
    });


  }

}

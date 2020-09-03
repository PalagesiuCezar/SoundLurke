import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /***
   * Getter method to retrieve the form control elements for
   * better access in the HTML document.
   *
   * @returns dict
   */
  get field() {
    return this.loginForm.controls;
  }

  /**
   * Handles form submition , logs user and navigates back to the
   * previous URL requested by the user.
   *
   * @param form - FormGroup object
   */
  onSubmit(form: FormGroup) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.field.email.value, this.field.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.error = error;
        console.log(error);
        this.loading = false;
      });


  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-email-acivation-successful-page',
  templateUrl: './email-acivation-successful-page.component.html',
  styleUrls: ['./email-acivation-successful-page.component.scss']
})

export class EmailAcivationSuccessfulPageComponent implements OnInit {

  EmailActivationSuccessful : FormGroup;
  submitted = false;
  loading = false;
  error = '';

  constructor( private userService : UserService, 
               private router: Router,
               private route: ActivatedRoute,
               private FormBuilder : FormBuilder ) { 
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.params.uid;
    const token = this.route.snapshot.params.token;

    this.EmailActivationSuccessful = this.FormBuilder.group({
      uid : uid,
      token : token,
    })
  }
  /***
   * Getter method to retrieve the form control elements for
   * better access in the HTML document.
   *
   * @return dict
   */
  get field() {
    return this.EmailActivationSuccessful.controls;
  }

  onSubmit(form : FormGroup){
    this.submitted = true;
    if (this.EmailActivationSuccessful.invalid){
      return;
    }

    this.loading = true;
    this.userService.activationEmail(this.EmailActivationSuccessful.value).subscribe(data => {
      this.router.navigate(['auth/login']);

    }, error => {
      console.log(error);
      this.loading = false;
    }
    )
  }

}

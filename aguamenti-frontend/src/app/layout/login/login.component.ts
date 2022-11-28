import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

interface Option {
  value: 'sign_up' | 'sign_in';
  view: string;
};

const SIGNIN = 0;
const SIGNUP = 1;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options: Option[] = [
    { value: 'sign_in', view: 'Sign In' },
    { value: 'sign_up', view: 'Sign Up' },
  ];

  modeSelect: FormControl;
  loginForm: FormGroup;
  hidePass: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.modeSelect = new FormControl(this.options[0].value, Validators.required);

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', this.modeSelect.value === 'sign_up' ? Validators.required : [])
    });

  }

  ngOnInit(): void {
  }

  onSubmitDetails() {
    console.log(this.loginForm.value);
    switch (this.modeSelect.value) {
      case 'sign_up':
        {
          this.api
            .register(this.loginForm.value)
            .subscribe(data => {
              this.router.navigate(['']);
            }
            );
        }
        break;

      case 'sign_in':
        {
          this.api
            .login(this.loginForm.value)
            .subscribe(data => {
              this.router.navigate(['']);
            }
            );

        }
        break;

      default:
        break;
    }
  }
}

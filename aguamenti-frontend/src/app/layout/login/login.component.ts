import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Option {
  value: string;
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

  }
}

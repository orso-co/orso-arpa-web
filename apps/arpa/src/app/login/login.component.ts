import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SessionService } from '@arpa/core';
// import { NotificationsService } from '../../../../@arpa/services/notifications.service';
// import { AuthService } from '../../../../@arpa/services/auth.service';
// import { FormErrorService } from '@arpa/services';

@Component({
  selector: 'arpa-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginFormGroup: UntypedFormGroup;
  hide = true;
  notificationsService = {
    error: (_: string, __: string) => {
      console.log({ _, __ });
    },
    info: (_: string, __: string) => {
      console.log({ _, __ });
    },
    success: (_: string, __: string) => {
      console.log({ _, __ });
    },
  };
  authService = {
    login: (_: unknown) => of(_),
    forgotPassword: (username: string) => of(username),
    resendConfirmationLink: (username: string) => of(username),
  };
  formErrorService = {
    handleError: (_: unknown, __: string) => {
      console.log({ _, __ });
    },
  };

  constructor(
    formBuilder: UntypedFormBuilder,
    private router: Router,
    private sessionService: SessionService //private notificationsService: NotificationsService, //private authService: AuthService, // private formErrorService: FormErrorService
  ) {
    this.loginFormGroup = formBuilder.group({
      usernameOrEmail: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn()) {

      console.log('is logged in');
      this.sessionService
        .resumeSession()
        .pipe(tap(() => this.router.navigate(['/'])))
        .subscribe();
    }
  }

  submit(): void {
    this.sessionService
      .login({ ...this.loginFormGroup.value })
      .pipe(first())
      .subscribe(
        () => {
          console.log('success!');
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 401) {
            this.notificationsService.error('USER_CREDENTIALS', 'views');
          } else if (error.status === 403) {
            this.notificationsService.error(error.title, 'views');
          } else if (Object.keys(error.errors).length) {
            Object.keys(error.errors).forEach((e) => {
              error.errors[e].forEach((message: string) => {
                this.notificationsService.error(message, 'views');
                if (message.startsWith('Your email address is not confirmed')) {
                  // ToDo: This could lead to spamming users.
                  this.resendConfirmationLink();
                }
              });
            });
          }
        }
      );
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

  resendConfirmationLink(): void {
    this.authService
      .resendConfirmationLink(this.loginFormGroup.value.usernameOrEmail)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.info('RESEND_DONE', 'views');
      });
  }

  forgotPassword(): void {
    this.authService
      .forgotPassword(this.loginFormGroup.value.usernameOrEmail)
      .pipe(first())
      .subscribe(
        () => {
          this.notificationsService.success(
            'FORGOT_PASSWORD_SEND_MAIL_SUCCESS',
            'views'
          );
        },
        (error) => {
          this.formErrorService.handleError(this.loginFormGroup, error);
        }
      );
  }
}

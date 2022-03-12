import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/show']);
    }
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.authService.login(this.checkoutForm.value);
    //   .pipe(first())
    //   .subscribe({
    //     next(x) {
    //       console.log(x);
    //     },
    //     error(err) {
    //       Swal.fire({
    //         title: 'เข้าสู่ระบบล้มเหลว!',
    //         text: err?.error?.message,
    //         icon: 'error',
    //       });
    //     },
    //   });
  }
}

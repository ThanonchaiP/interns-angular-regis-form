import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { FormService } from 'src/app/services/form.service';
import { Gender } from 'src/app/models/gender.model';
import { Observable } from 'rxjs';
import { Race } from 'src/app/models/race.model';
import { Size } from 'src/app/models/size.model';
import { ClientService } from 'src/app/services/client.service';
import { Amphoe, Province, Tambon } from 'src/app/models/address.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  //option
  genders: Observable<Gender[]>;
  races: Observable<Race[]>;
  sizes: Observable<Size[]>;
  provinces: Observable<Province[]>;
  amphoes: Array<Amphoe[]> = [];
  tambons: Array<Tambon[]> = [];

  //Datepicker
  minDate: Date = new Date(1900, 0, 1);
  maxDate: Date = new Date();

  //Form
  checkoutForm: FormGroup;
  submitted: boolean = false;
  selectedImage: string = 'https://www.w3schools.com/howto/img_avatar.png';
  fileUpload: File;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private formService: FormService,
    private clientService: ClientService
  ) {}

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      first_name: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Zก-๙ ]{0,20}')],
      ],
      last_name: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Zก-๙ ]{0,20}')],
      ],
      gender_id: [null, Validators.required],
      birthday: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      addresses: this.formBuilder.array([]),
      race_id: [null, Validators.required],
      shirt_size_id: [null, Validators.required],
      image: null,
    });
    this.getOption();
    this.addAddress();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }

  get address() {
    return this.checkoutForm.controls['addresses'] as FormArray;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) return;
    const alert = await Swal.fire({
      title: 'ลงทะเบียน!',
      text: 'คุณแน่ใจใช่ไหมว่าข้อมูลที่กรอกไว้ถูกต้อง?',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
    });

    if (alert.isConfirmed) {
      let res = this.clientService.register(this.checkoutForm.value);
      if (res) {
        Swal.fire('ลงทะเบียนสำเร็จ', '', 'success');
        this.clearForm(this.checkoutForm);
        this.selectedImage = 'https://www.w3schools.com/howto/img_avatar.png';
      }
    }
  }

  onChangeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let fileUpload = event.target.files[0];
      this.checkoutForm.patchValue({
        image: fileUpload,
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(fileUpload);
    }
  }

  addAddress() {
    const addressForm = this.formBuilder.group({
      house_no: [null, Validators.required],
      sub_district_id: [null, Validators.required],
      district_id: [null, Validators.required],
      province_id: [null, Validators.required],
      postcode: [null, [Validators.required, Validators.pattern('[0-9]{5}')]],
    });
    this.address.push(addressForm);
  }

  deleteAddress(lessonIndex: number) {
    this.address.removeAt(lessonIndex);
    delete this.amphoes[lessonIndex];
  }

  getOption() {
    this.genders = this.formService.getGender();
    this.races = this.formService.getRace();
    this.sizes = this.formService.getShirtSize();
    this.provinces = this.formService.getProvince();
  }

  getAmphoe(e: any, index: number) {
    this.formService.getAmphoe(e.target.value).subscribe((amphoes) => {
      this.amphoes[index] = amphoes;
    });
    this.address
      .at(index)
      .patchValue({ sub_district_id: null, district_id: null });
  }

  getTambon(e: any, index: number) {
    this.address.at(index).patchValue({ sub_district_id: null });
    this.formService
      .getTambon(e.target.value)
      .subscribe((tambons) => (this.tambons[index] = tambons));
  }

  backClicked() {
    this.location.back();
  }

  clearForm(form: FormGroup) {
    this.submitted = false;
    this.formDirective.resetForm();
    form.reset();
  }
}

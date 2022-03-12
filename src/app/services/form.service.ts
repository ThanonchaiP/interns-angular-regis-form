import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Gender } from '../models/gender.model';
import { Race } from '../models/race.model';
import { Size } from '../models/size.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getGender() {
    return this.http.get<Gender[]>(`${this.apiUrl}/genders`);
  }

  getRace() {
    return this.http.get<Race[]>(`${this.apiUrl}/races`);
  }

  getShirtSize() {
    return this.http.get<Size[]>(`${this.apiUrl}/shirt_sizes`);
  }
  //Address
  getProvince() {
    return this.http.get<any[]>(`${this.apiUrl}/provinces`);
  }
  getAmphoe(province_id: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/districts?search_province=${province_id}`
    );
  }
  getTambon(amphoe_id: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/sub_districts?search_district=${amphoe_id}`
    );
  }
}

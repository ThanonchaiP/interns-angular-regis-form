import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, ClientShow } from '../models/client.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  options = {
    withCredentials: true,
  };

  register(data: any) {
    let fomrData = new FormData();
    fomrData.append('client[first_name]', data.first_name);
    fomrData.append('client[last_name]', data.last_name);
    fomrData.append('client[gender_id]', data.gender_id);
    fomrData.append('client[birthday]', data.birthday);
    fomrData.append('client[email]', data.email);
    fomrData.append('client[phone]', data.phone);
    fomrData.append('client[race_id]', data.race_id);
    fomrData.append('client[shirt_size_id]', data.shirt_size_id);
    if (data.image) fomrData.append('client[image]', data.image);

    return this.http
      .post<Client>(`${this.apiUrl}/clients`, fomrData)
      .subscribe((res) => {
        data.addresses.map((address: any) => (address.client_id = res.id));
        this.http
          .post<any>(`${this.apiUrl}/addresses/creates`, {
            address: { addresses: data.addresses },
          })
          .subscribe();
      });
  }

  getclient(): Observable<ClientShow[]> {
    return this.http.get<ClientShow[]>(`${this.apiUrl}/clients`).pipe(
      map((user: ClientShow[]) => {
        return user.map((show) => ({ ...show }));
      })
    );
  }

  getClientById(path: string) {
    return this.http.get<ClientShow>(path);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }

  serachClient(path: string): Observable<ClientShow[]> {
    return this.http.get<ClientShow[]>(path).pipe(
      map((user: ClientShow[]) => {
        return user.map((show) => ({ ...show }));
      })
    );
  }
}

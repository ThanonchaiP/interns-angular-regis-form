import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientShow,Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-showaddress',
  templateUrl: './showaddress.component.html',
  styleUrls: ['./showaddress.component.scss'],
})
export class ShowaddressComponent implements OnInit {
  client_Show: ClientShow;
  path: string;
  id: number;
  imageUrl: string;
  constructor(
    public route: ActivatedRoute,
    private clientService: ClientService,
    private _location: Location
  ) {
    this.id = this.route.snapshot.params['ID'];
    this.path = `${environment.apiUrl}/clients/` + this.id;
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.path).subscribe((resp) => {
      this.client_Show = resp;
      this.imageUrl = resp.image && `${environment.apiUrl}/` + resp.image;
    });
  }
  backClicked() {
    this._location.back();
  }
}

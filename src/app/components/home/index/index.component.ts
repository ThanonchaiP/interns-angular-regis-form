import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';
import { environment } from 'src/environments/environment';
import { ClientShow } from '../../../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  path: string;
  displayedColumns: string[] = [
    'ลำดับ',
    'ชื่อ',
    'เพศ',
    'ประเภท',
    'ค่าลงทะเบียน',
    'ไซส์เสื้อ',
    'E-mail',
    'ดูข้อมูลเพิ่มเติม',
    'ลบผู้สมัคร',
  ]; //
  fristName?: string;
  lastName?: string;
  client_Show: ClientShow[] = [];

  dataSource = new MatTableDataSource<ClientShow>(this.client_Show);

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClient();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getClient() {
    this.clientService.getclient().subscribe((show: ClientShow[]) => {
      this.client_Show = show;
      this.dataSource = new MatTableDataSource<ClientShow>(this.client_Show);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async delectClient(id: number) {
    const alert = await Swal.fire({
      title: 'ลบข้อมูล!',
      text: 'คุณแน่ใจใช่ไหมว่าต้องการลบข้อมูลนี้?',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
    });

    if (alert.isConfirmed) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.getClient();
      });
    }
  }

  search(term: string) {
    const name = term.split(' ');
    this.fristName = name[0];
    this.lastName = name[1];
    if (name.length > 1) {
      this.path =
        `${this.apiUrl}/clients?search_name=` +
        this.fristName +
        '&' +
        'search_lastname=' +
        this.lastName;
    } else {
      this.path = `${this.apiUrl}/clients?search_name=` + this.fristName;
    }

    this.clientService
      .serachClient(this.path)
      .subscribe((show: ClientShow[]) => {
        this.client_Show = show;
        this.dataSource = new MatTableDataSource<ClientShow>(this.client_Show);
      });
  }

  clickedRows = new Set<ClientShow>();
}

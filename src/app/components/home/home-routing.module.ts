import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ShowaddressComponent } from './showaddress/showaddress.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: ':ID', component: ShowaddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

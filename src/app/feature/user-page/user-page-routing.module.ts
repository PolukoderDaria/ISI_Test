import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page.component';

const routes: Routes = [
  {
    path: 'new',
    component: UserPageComponent
  },
  {
    path: ':id',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }

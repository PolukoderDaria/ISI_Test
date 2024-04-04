import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './feature/list-page/list-page.component';
import { ForbiddenComponent } from './feature/forbidden/forbidden.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users-list',
  },
  {
    path: 'users-list',
    component: ListPageComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./feature/user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

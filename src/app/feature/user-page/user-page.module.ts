import { NgModule } from '@angular/core';
import { UserPageComponent } from './components/user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UserPageModule { }

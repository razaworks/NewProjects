import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { MyProfilePageModule } from '../my-profile/my-profile.module';
import { MembersPageModule } from '../members/members.module';
import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderModule,
    // MyProfilePageModule,
    // MembersPageModule,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../login/login.component";
import {
  NzButtonModule,
  NzFormModule, NzGridModule,
  NzInputModule, NzLayoutModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const nzModules = [
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzToolTipModule,
  NzLayoutModule,
  NzGridModule
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...nzModules],
  exports: [...nzModules, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

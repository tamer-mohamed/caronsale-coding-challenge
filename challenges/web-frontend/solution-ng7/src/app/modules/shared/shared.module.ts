import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzAlertModule,
  NzButtonModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzToolTipModule,
} from "ng-zorro-antd";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const nzModules = [
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzToolTipModule,
  NzLayoutModule,
  NzGridModule,
  NzAlertModule,
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...nzModules],
  exports: [...nzModules, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

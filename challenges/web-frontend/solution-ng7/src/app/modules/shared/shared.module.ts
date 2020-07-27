import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule, NzCarouselModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzTagModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const nzModules = [
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzToolTipModule,
  NzLayoutModule,
  NzGridModule,
  NzAlertModule,
  NzCardModule,
  NzTagModule,
  NzCarouselModule
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...nzModules],
  exports: [...nzModules, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

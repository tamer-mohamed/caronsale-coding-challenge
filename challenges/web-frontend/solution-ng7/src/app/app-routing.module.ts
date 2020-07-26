import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/login/login.component";
import { AuthGuardService as AuthGuard  } from "./shared/services/auth-guard/auth-guard.service";
import {OverviewComponent} from './modules/overview/overview.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: OverviewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

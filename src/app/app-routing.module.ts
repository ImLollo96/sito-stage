import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'table',component:TableComponent,canActivate:[AuthGuard]},
  {path:'grid', component:GridComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

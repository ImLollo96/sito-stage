import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { TableComponent } from './table/table.component';
import { StandardGuard } from './shared/standard.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'table', component: TableComponent, canActivate: [AuthGuard] },
	{ path: 'grid', component: GridComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'staff', component: StaffPageComponent, canActivate: [StandardGuard] }
];
//data: { roles: 'standard'}
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

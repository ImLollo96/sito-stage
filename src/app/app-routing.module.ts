import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './routes/grid/grid.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { StaffPageComponent } from './routes/staff-page/staff-page.component';
import { TableComponent } from './routes/table/table.component';
import { StandardGuard } from './services/standard.guard';
import { EditorComponent } from './routes/editor/editor.component';
import { RealTimeComponent } from './routes/real-time/real-time.component';
import { ChatComponent } from './routes/chat/chat.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'table', component: TableComponent, canActivate: [AuthGuard] },
	{ path: 'grid', component: GridComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'staff', component: StaffPageComponent, canActivate: [StandardGuard] },
	{ path: 'editor', component: EditorComponent, canActivate: [StandardGuard] },
	{ path: 'realtime', component: RealTimeComponent, canActivate: [StandardGuard] },
	{ path: 'chat', component: ChatComponent, canActivate: [StandardGuard] }
];
//data: { roles: 'standard'}
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

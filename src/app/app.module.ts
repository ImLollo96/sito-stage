import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, LogoutSnackBarComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { GridComponent } from './grid/grid.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { DialogGridComponent } from './dialog-grid/dialog-grid.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { StandardGuard } from './shared/standard.guard';
import { DialogStaffComponent } from './dialog-staff/dialog-staff.component';



export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		TableComponent,
		GridComponent,
		LoginComponent,
		DialogExampleComponent,
		DialogGridComponent,
		LogoutSnackBarComponent,
  		StaffPageComponent,
    	DialogStaffComponent,

	],
	entryComponents: [DialogExampleComponent, DialogGridComponent,LogoutSnackBarComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatCommonModule,
		MatCardModule,
		MatMenuModule,
		MatSidenavModule,
		LayoutModule,
		MatListModule,
		MatTableModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		SocialLoginModule,
		MatDialogModule,
		MatProgressBarModule,
		MaterialFileInputModule,
		NgxSkeletonLoaderModule,
		MatSlideToggleModule,
		MatSelectModule,
		TranslateModule.forRoot(
			{
				loader: {
					provide: TranslateLoader,
					useFactory: HttpLoaderFactory,
					deps: [HttpClient]
				}
			}
		),
		ColorPickerModule,
		MatButtonToggleModule,
		MatSnackBarModule,
	],
	providers: [AuthGuard,StandardGuard,HttpClient,
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider('111898526119-bip3c2ncalj0hfe5s3k4cop1dde36tok.apps.googleusercontent.com')
					}
				]
			} as SocialAuthServiceConfig
		}],
	bootstrap: [AppComponent]
})
export class AppModule { }

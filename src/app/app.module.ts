import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, LogoutSnackBarComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
/** ROUTES */
import { HomeComponent } from './routes/home/home.component';
import { TableComponent } from './routes/table/table.component';
import { GridComponent } from './routes/grid/grid.component';
import { LoginComponent } from './routes/login/login.component';
import { StaffPageComponent } from './routes/staff-page/staff-page.component';
import { EditorComponent } from './routes/editor/editor.component';
/** SERVICES */
import { StandardGuard } from './services/standard.guard';
import { AuthGuard } from './services/auth.guard';
/** COMPONENTS */
import { DialogExampleComponent } from './components/dialog/dialog-example/dialog-example.component';
import { DialogGridComponent } from './components/dialog/dialog-grid/dialog-grid.component';
import { DialogStaffComponent } from './components/dialog/dialog-staff/dialog-staff.component';
import { DialogEditorComponent } from './components/dialog/dialog-editor/dialog-editor.component'; 




export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function MSALInstanceFactory(): PublicClientApplication{
	return new PublicClientApplication({
		auth: {
			clientId: 'f2b3da48-8f94-44d2-a6a8-9bf621588b4c',
			redirectUri: 'http://localhost:4200'
		}
	})
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
     	EditorComponent,
     	DialogEditorComponent,

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
		MatProgressSpinnerModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule,
		MsalModule
	],
	providers: [AuthGuard,StandardGuard,HttpClient,MsalService,
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
		},
		{
			provide: MSAL_INSTANCE,
			useFactory: MSALInstanceFactory
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

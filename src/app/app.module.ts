import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/heder.component'
import {FooterComponent} from './footer/footer.component';
import { PaginatorComponent } from './paginator/paginator.component'
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component'
import {RouterModule,Routes} from '@angular/router'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormComponent } from './clientes/form.component'
import { FormsModule } from '@angular/forms'
import {registerLocaleData} from '@angular/common'
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule} from '@angular/material-moment-adapter'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import {AuthGuard} from './usuarios/guards/auth.guard';
import {RoleGuard} from './usuarios/guards/role.guard';
import {TokenInterceptor} from './usuarios/interceptors/token.interceptor'
import {AuthTokenInterceptor} from './usuarios/interceptors/auth.interceptor'


registerLocaleData(localeES,'es');

const routes :Routes =[
  {path:'', redirectTo:'/clientes',pathMatch:'full'},
  {path:'directivas', component:DirectivaComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'clientes/page/:page/:cant', component:ClientesComponent},
  {path:'clientes/form', component:FormComponent,canActivate:[AuthGuard,RoleGuard],data: {role: 'ROLE_ADMIN'}},
  {path:'clientes/form/:id', component:FormComponent,canActivate:[AuthGuard,RoleGuard],data: {role: 'ROLE_ADMIN'}  },
  {path:'login', component:LoginComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
     MatMomentDateModule
  ],
  providers: [
    {provide:LOCALE_ID,useValue:'es'},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }

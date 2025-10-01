import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
 
import { TableComponent } from '../screens/table/table.component';
import { LoginComponent } from '../screens/login/login.component';
import { AlwaysAuthGuard } from './always-auth.guard';
import { AddAnimalsComponent } from 'src/screens/add-animals/add-animals.component';
import { ConsumeComponent } from 'src/screens/consume/consume.component';
import { WeatherComponent } from 'src/screens/weather/weather.component';
import { StrangerComponent } from 'src/screens/stranger/stranger.component';
import { LoginGuard } from './loginGuard';



const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent },
  {
    path: 'animals',
    canActivate: [AlwaysAuthGuard],  //⚡
    children: [
      { path: 'table', component: TableComponent },
      { path: 'animals', component: AddAnimalsComponent },
      { path: 'consume', component: ConsumeComponent },
      { path: 'weather', component: WeatherComponent },
      { path: 'stranger', component: StrangerComponent }
    ]
  },
  { path: '**', redirectTo: 'login' } //🚧-Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

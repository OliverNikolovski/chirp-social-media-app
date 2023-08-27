import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {CenterPanelComponent} from "./components/center-panel/center-panel.component";
import {PostViewComponent} from "./components/post-view/post-view.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'timeline',
        pathMatch: 'full'
      },
      {
        path: 'timeline',
        component: CenterPanelComponent
      },
      {
        path: 'post/:id',
        component: PostViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

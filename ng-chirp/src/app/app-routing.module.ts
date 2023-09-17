import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {CenterPanelComponent} from "./components/center-panel/center-panel.component";
import {PostViewComponent} from "./components/post-view/post-view.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {FollowersComponent} from "./components/followers/followers.component";
import {FollowingComponent} from "./components/following/following.component";

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
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

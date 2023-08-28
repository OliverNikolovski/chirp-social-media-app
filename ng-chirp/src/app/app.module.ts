import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {HomeComponent} from "./components/home/home.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegisterComponent} from "./components/register/register.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from '@angular/material/icon';
import {LeftPanelComponent} from "./components/left-panel/left-panel.component";
import {CenterPanelComponent} from "./components/center-panel/center-panel.component";
import {RightPanelComponent} from "./components/right-panel/right-panel.component";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {AddPostComponent} from "./components/add-post/add-post.component";
import {PostComponent} from "./components/post/post.component";
import {RelativeTimePipe} from "./pipes/relative-time.pipe";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {AddCommentDialog} from "./dialogs/add-comment/add-comment.dialog";
import {ProfilePicOrDefaultPipe} from "./pipes/profile-pic-or-default.pipe";
import {SharePostDialog} from "./dialogs/share-post/share-post.dialog";
import {PostViewComponent} from "./components/post-view/post-view.component";
import {PostViewCardComponent} from "./components/post-view-card/post-view-card.component";
import {FormatDatePipe} from "./pipes/format-date.pipe";
import {CommentComponent} from "./components/comment/comment.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    LeftPanelComponent,
    CenterPanelComponent,
    RightPanelComponent,
    TimelineComponent,
    AddPostComponent,
    PostComponent,
    RelativeTimePipe,
    AddCommentDialog,
    ProfilePicOrDefaultPipe,
    SharePostDialog,
    PostViewComponent,
    PostViewCardComponent,
    FormatDatePipe,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

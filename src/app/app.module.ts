import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MomentModule } from 'ngx-moment';
import { DatePipe } from '@angular/common';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { NoticeComponent } from './components/notice/notice.component';
import { addNoticeComponent } from './components/addnotice/addnotice.component';
import { AllPublicationsComponent } from './components/allPublications/allpublications.controller';

// Servicios
import { DpaService } from './services/dpa.service';
import { PublicationService } from './services/publication.service';
import { FollowService } from './services/follow.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    NoticeComponent,
    addNoticeComponent,
    AllPublicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
  ],
  providers: [DpaService, DatePipe, PublicationService, FollowService],
  bootstrap: [AppComponent],
})
export class AppModule {}

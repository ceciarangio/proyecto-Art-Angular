import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsProfileComponent } from './artists-profile/artists-profile.component';
import { ArtWorkComponent } from './art-work/art-work.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './Home/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddArtComponent } from './add-art/add-art.component';




@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    ArtistsProfileComponent,
    ArtWorkComponent,
    HomeComponent,
    AddArtComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { HomeComponent } from './Home/home/home.component';
import { ArtistsProfileComponent } from './artists-profile/artists-profile.component';
import { ArtWorkComponent } from './art-work/art-work.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'artists', component:ArtistsComponent},
  {path: 'artists-profile', component:ArtistsProfileComponent},
  {path: 'art-works', component: ArtWorkComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

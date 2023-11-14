import { Component, OnInit } from '@angular/core';
import { artistasI } from '../Models/artista.model';
import { ArtistsService } from '../artists.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artistsList$: Observable<artistasI[]> = this.artistsService.getArtists();


  constructor(private artistsService: ArtistsService, private router: Router) {}

  ngOnInit() {
    this.artistsList$ = this.artistsService.getArtists();
  }

  deleteArtist(id: number) {
    this.artistsService.deleteArtist(id).subscribe(() => {
      this.artistsList$ = this.artistsService.getArtists();
    });
  }

  viewArtist(id: number) {
    this.router.navigate(['/artist', id]);
  }
}
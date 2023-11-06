import { Component, OnInit } from '@angular/core';
import { artistasI } from '../Models/artista.model';
import { ArtistsService } from '../artists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artistsList: artistasI[] = [];

  constructor(private artistsService: ArtistsService, private router: Router){}

  ngOnInit(){
    this.getArtists();
  }

  getArtists() {
    this.artistsService.getArtists().subscribe((res) => {
      this.artistsList = res;
      console.log('listado de artistas: ', this.artistsList); // Agregar este log
    },
    (error) => {
      console.log('error: ', error);
    });
  }

  deleteArtist(id: number) {
    this.artistsService.deleteArtist(id).subscribe(() => {
      this.getArtists(); // Actualiza la lista de artistas después de eliminar uno
    });
  }

  viewArtist(id: number){
    this.router.navigate(['/artist', id]);

}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { ArtWorkService } from '../art-work.service';
import { obraI } from '../Models/obra.model';
import { artistasI } from '../Models/artista.model';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.scss']
})
export class AddArtComponent implements OnInit{

  artWorkList: obraI[] = [];
  artistsList: artistasI[] = [];
  selectedObra: obraI = { id: 0, name: '', date: '', description: '', image: '', artistId: 1, artist: '' };

  constructor(
    private artWorkService: ArtWorkService,
    private artistsService: ArtistsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getArtistsAndObras();
  }

  selectedArtistId: number | undefined;

  getArtistsAndObras() {
    this.artistsService.getArtists().subscribe((artists) => {
      this.artistsList = artists;

      this.artWorkService.getObras().subscribe((obras) => {
        obras.forEach(obra => {
          obra.artistId = obra.artistId || 1;
        });

        this.artWorkList = obras;
      }, (error) => {
        console.log('Error al obtener obras: ', error);
      });
    }, (error) => {
      console.log('Error al obtener artistas: ', error);
    });
  }

  loadNewArtWork() {
    this.selectedObra.artistId = this.selectedObra.artistId || 1;

    // Generar un ID manualmente
    this.selectedObra.id = Date.now(); // Utilizando la marca de tiempo como ID

    this.artWorkService.addArtWork(this.selectedObra).subscribe(() => {
      this.getArtistsAndObras();
    });
  }
}
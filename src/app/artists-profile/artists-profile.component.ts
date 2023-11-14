import { ArtistsService } from './../artists.service';
import { Component, OnInit } from '@angular/core';
import { artistasI } from '../Models/artista.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-artists-profile',
  templateUrl: './artists-profile.component.html',
  styleUrls: ['./artists-profile.component.scss']
})
export class ArtistsProfileComponent implements OnInit {
  newArtist: artistasI = {
    id: '',
    nombre: '',
    apellido: '',
    pais: '',
    nombreArtistico: '',
    biografia: '',
    imagen: ''
  };

  artistsList: artistasI[] = [];

  constructor(private artistsService: ArtistsService) {}

  ngOnInit() {
    this.getArtists();
  }

  getArtists() {
    this.artistsService.getArtists().subscribe((res) => {
      this.artistsList = res;
    });
  }

  addNewArtist(form: NgForm) {
    this.artistsService.addArtist(this.newArtist).subscribe((artist) => {
      console.log('Artista agregado: ', artist);
      this.getArtists(); // Actualiza la lista de artistas después de agregar uno nuevo
      form.resetForm(); // Reinicia el formulario
    });
  }
}

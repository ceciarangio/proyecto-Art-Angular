// import { ArtWorkService } from './../art-work.service';
// import { Component, OnInit } from '@angular/core';
// import { obraI } from '../Models/obra.model';
// import { Router } from '@angular/router';
// import { artistasI } from '../Models/artista.model';
// import { ArtistsService } from '../artists.service';

// @Component({
//   selector: 'app-art-work',
//   templateUrl: './art-work.component.html',
//   styleUrls: ['./art-work.component.scss']
// })
// export class ArtWorkComponent implements OnInit {

//   artWorkList: obraI[] = [];
//   artistsList: artistasI[] = [];

//   obra: obraI = {
//     id: 0,
//     name: '',
//     date: '',
//     description: '',
//     image: '',
//     artistId: 1,
//     artist: '',
//     likes: 0, // Inicializar los "Me gusta" a 0
//     comments: []
//   };


//   addComment(newComment: string) {
//     if (this.obra) {
//       if (!this.obra.comments) {
//         this.obra.comments = [];
//       }
//       this.obra.comments.push(newComment);
//       this.updateStoredObra();
//     }
//   }

//   updateStoredObra() {
//     localStorage.setItem('currentObra', JSON.stringify(this.obra));
//   }
//   like() {
//     this.obra.likes++; // Incrementar el contador de "Me gusta" al hacer clic
//   };

//   constructor(private artWorkService: ArtWorkService, private artistsService: ArtistsService, private router: Router) {}

//   ngOnInit() {
//     this.getArtistsAndObras();
//     const storedObra = localStorage.getItem('currentObra');
//     if (storedObra) {
//       this.obra = JSON.parse(storedObra);
//     }
//   }

//   getArtistsAndObras() {
//     this.artistsService.getArtists().subscribe((artists) => {
//       this.artistsList = artists;
//       console.log('Lista de artistas: ', this.artistsList);

//       // Una vez que los artistas se han cargado, se obtienen las obras
//       this.artWorkService.getObras().subscribe((obras) => {
//         this.artWorkList = obras;
//         console.log('Lista de obras: ', this.artWorkList);
//       }, (error) => {
//         console.log('Error al obtener obras: ', error);
//       });
//     }, (error) => {
//       console.log('Error al obtener artistas: ', error);
//     });
//   }

//   getArtistName(artistId: number): string {
//     const artist = this.artistsList.find((artist) => artist.id === artistId);
//     return artist ? `${artist.nombre} ${artist.apellido}` : 'Artista Desconocido';
//   }

//   deleteObras(id: number) {
//     this.artWorkService.deleteObras(id).subscribe(() => {
//       this.getArtistsAndObras(); // Actualiza la lista de artistas y obras después de eliminar una obra
//     });
//   }

//   viewObras(id: number) {
//     this.router.navigate(['/artworks', id]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from './../art-work.service';
import { Router } from '@angular/router';
import { artistasI } from '../Models/artista.model';
import { obraI } from '../Models/obra.model';
import { ArtistsService } from '../artists.service';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.scss']
})
export class ArtWorkComponent implements OnInit {
  artWorkList: obraI[] = [];
  artistsList: artistasI[] = [];
  selectedObra: obraI = { id: 0, name: '', date: '', description: '', image: '', artistId: 1, artist: '', likes: 0, comments: [] };

  constructor(private artWorkService: ArtWorkService, private artistsService: ArtistsService, private router: Router) {}

  ngOnInit() {
      this.loadStoredObras();
      this.getArtistsAndObras();
    }

    loadStoredObras() {
      const storedObras: obraI[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('currentObra_')) {
          const obra = JSON.parse(localStorage.getItem(key) || '');
          storedObras.push(obra);
        }
      }
      this.artWorkList = storedObras;
    }


  getArtistsAndObras() {
    this.artistsService.getArtists().subscribe((artists) => {
      this.artistsList = artists;
      console.log('Lista de artistas: ', this.artistsList);

      this.artWorkService.getObras().subscribe((obras) => {
        this.artWorkList = obras;
        console.log('Lista de obras: ', this.artWorkList);
      }, (error) => {
        console.log('Error al obtener obras: ', error);
      });
    }, (error) => {
      console.log('Error al obtener artistas: ', error);
    });
  }

  getArtistName(artistId: number): string {
    const artist = this.artistsList.find((artist) => artist.id === artistId);
    return artist ? `${artist.nombre} ${artist.apellido}` : 'Artista Desconocido';
  }

  deleteObras(id: number) {
    this.artWorkService.deleteObras(id).subscribe(() => {
      this.getArtistsAndObras();
    });
  }

  viewObras(id: number) {
    this.router.navigate(['/artworks', id]);
  }

  addComment(obra: obraI, newComment: string) {
    if (!obra.comments) {
      obra.comments = [];
    }
    obra.comments.push(newComment);
    this.updateStoredObra(obra);
  }

  like(obra: obraI) {
    if (!obra.likes) {
      obra.likes = 0;
    }
    obra.likes++;
    this.updateStoredObra(obra);
  }

  updateStoredObra(obra: obraI) {
    localStorage.setItem(`currentObra_${obra.id}`, JSON.stringify(obra));
  }

}

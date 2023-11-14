// import { Component, OnInit } from '@angular/core';
// import { ArtWorkService } from './../art-work.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { artistasI } from '../Models/artista.model';
// import { obraI } from '../Models/obra.model';
// import { ArtistsService } from '../artists.service';

// @Component({
//   selector: 'app-art-work',
//   templateUrl: './art-work.component.html',
//   styleUrls: ['./art-work.component.scss']
// })
// export class ArtWorkComponent implements OnInit {
//   artWorkList: obraI[] = [];
//   artistsList: artistasI[] = [];
//   selectedObra: obraI = { id: 0, name: '', date: '', description: '', image: '', artistId: 1, artist: '' };


//   // En el constructor
//   constructor(
//     private artWorkService: ArtWorkService,
//     private artistsService: ArtistsService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.loadStoredObras();
//     this.getArtistsAndObras();

//     this.route.paramMap.subscribe(params => {
//       const obraId = Number(params.get('id'));
//       if (!isNaN(obraId)) {
//         this.loadArtWork(obraId);
//       }
//     });
//   }

//   loadStoredObras() {
//     const storedObras: obraI[] = [];
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.startsWith('currentObra_')) {
//         const obra = JSON.parse(localStorage.getItem(key) || '');
//         storedObras.push(obra);
//       }
//     }
//     this.artWorkList = storedObras;
//   }

//   getArtistsAndObras() {
//     this.artistsService.getArtists().subscribe((artists) => {
//       this.artistsList = artists;

//       this.artWorkService.getObras().subscribe((obras) => {
//         obras.forEach(obra => {
//           obra.artistId = obra.artistId || 1;
//         });

//         this.artWorkList = obras;
//       }, (error) => {
//         console.log('Error al obtener obras: ', error);
//       });
//     }, (error) => {
//       console.log('Error al obtener artistas: ', error);
//     });
//   }

//   loadArtWork(id: number) {
//     this.artWorkService.getObrasById(id).subscribe((obra) => {
//       this.selectedObra = obra;
//     });
//   }

//   getArtistName(artistId: number): string {
//     const artist = this.artistsList.find((artist) => artist.id === artistId);
//     return artist ? `${artist.nombre} ${artist.apellido}` : 'Artista Desconocido';
//   }

//   deleteObras(id: number) {
//     this.artWorkService.deleteObras(id).subscribe(() => {
//       this.getArtistsAndObras();
//     });
//   }

//   viewObras(id: number) {
//     this.router.navigate(['/artworks', id]);
//   }


//   selectedArtistId: number | undefined;


// }


import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from './../art-work.service';
import { ArtistsService } from '../artists.service';
import { obraI } from '../Models/obra.model';
import { artistasI } from '../Models/artista.model';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.scss']
})
export class ArtWorkComponent implements OnInit {
  artWorkList: obraI[] = [];
  artistsList: artistasI[] = [];
  selectedObra: obraI = { id: 0, name: '', date: '', description: '', image: '', artistId: 1, artist: '', likes: 0 };

  constructor(
    private artWorkService: ArtWorkService,
    private artistsService: ArtistsService
  ) {}

  ngOnInit() {
    this.getArtistsAndObras();
  }

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

  getArtistName(artistId: number): string {
    const artist = this.artistsList.find((artist) => artist.id === artistId);
    return artist ? `${artist.nombre} ${artist.apellido}` : 'Artista Desconocido';
  }



  deleteObras(id: number) {
    this.artWorkService.deleteObras(id).subscribe(() => {
      this.getArtistsAndObras();
    });
  }

  likeArtWork(id: number) {
    this.artWorkService.likeArtWork(id).subscribe(
      (response) => {
        console.log('Like successful', response);
        // Realiza alguna acción adicional si es necesario
      },
      (error) => {
        console.error('Error al dar like:', error);
      }
    );

}
}
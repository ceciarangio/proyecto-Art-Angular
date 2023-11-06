// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { artistasI } from './Models/artista.model';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ArtistsService {

//   url: string = 'http://localhost:3000/artists';

//   constructor(private http: HttpClient) {}

//   addArtist(artist: artistasI): Observable<artistasI>{
//     return this.http.post<artistasI>(this.url, artist);
//   }

//   // getArtists(): Observable<artistasI[]>{
//   //   return this.http.get<artistasI[]>(this.url);
//   // }
//   getArtists(): Observable<artistasI[]> {
//     return this.http.get<artistasI[]>(this.url).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error al obtener artistas:', error);
//         return throwError('Something went wrong');
//       })
//     );
//   }

//   getArtistsById(id: number): Observable<artistasI[]>{
//     return this.http.get<artistasI[]>(`${this.url}/${id}`);
//   }

//   deleteArtist(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.url}/${id}`);
//   }

// }


// artists.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  artistsUrl: string = 'http://localhost:3000/artists';
  artworksUrl: string = 'http://localhost:3000/artworks';

  constructor(private http: HttpClient) {}

  addArtwork(artwork: any): Observable<any> {
    return this.http.post<any>(this.artworksUrl, artwork);
  }

  addArtworkToArtist(artistId: number, artwork: any): Observable<any> {
    const artistArtworksUrl = `${this.artistsUrl}/${artistId}/artworks`;
    return this.http.post<any>(artistArtworksUrl, artwork);
  }

  addArtist(artist: any): Observable<any> {
    return this.http.post<any>(this.artistsUrl, artist);
  }

  getArtists(): Observable<any> {
    return this.http.get<any>(this.artistsUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener artistas:', error);
        return throwError('Something went wrong');
      })
    );
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete<any>(`${this.artistsUrl}/${id}`);
  }
}
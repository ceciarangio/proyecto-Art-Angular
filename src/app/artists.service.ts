
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { artistasI } from './Models/artista.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  artistsUrl: string = 'http://localhost:3001/artists';
  artworksUrl: string = 'http://localhost:3001/artworksOk';

  constructor(private http: HttpClient) {}

  addArtwork(artwork: any): Observable<any> {
    return this.http.post<any>(this.artworksUrl, artwork);
  }

  addArtworkToArtist(artistId: number, artwork: any): Observable<any> {
    const artistArtworksUrl = `${this.artistsUrl}/${artistId}/artworks`;
    return this.http.post<any>(artistArtworksUrl, artwork);
  }

  getArtists(): Observable<artistasI[]> {
    return this.http.get<artistasI[]>(this.artistsUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener artistas:', error);
        return throwError(error.message || 'Algo salió mal');
      })
    );
  }

  addArtist(artist: artistasI): Observable<artistasI> {
    return this.http.post<artistasI>(this.artistsUrl, artist);
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete<any>(`${this.artistsUrl}/${id}`);
  }
}
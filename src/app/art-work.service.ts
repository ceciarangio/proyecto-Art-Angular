import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { obraI } from './Models/obra.model';


@Injectable({
  providedIn: 'root'
})
export class ArtWorkService {

  private url: string = 'http://localhost:3001/artworksOk';

  // Agrega una propiedad para almacenar las obras en tu servicio
  private obras: obraI[] = [];

  constructor(private http: HttpClient) {}

  addArtWork(artWork: obraI): Observable<obraI> {
    return this.http.post<obraI>(this.url, artWork);
  }

  getObras(): Observable<obraI[]> {
    return this.http.get<obraI[]>(this.url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener obras:', error);
        return throwError('Something went wrong');
      })
    );
  }

  getObrasById(id: number): Observable<obraI> {
    return this.http.get<obraI>(`${this.url}/${id}`);
  }

  deleteObras(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  likeArtWork(id: number): Observable<obraI> {
    // Simula la lógica de dar "like" de manera local
    return this.getObrasById(id).pipe(
      switchMap((artWork: obraI) => {
        // Actualiza el campo de "likes" en la obra
        artWork.likes = (artWork.likes || 0) + 1;
        // Guarda la obra actualizada en la lista de obras (simulando la base de datos)
        const obras = this.obras.slice();
        const index = obras.findIndex(o => o.id === id);
        if (index !== -1) {
          obras[index].likes = artWork.likes;
        }
        // Retorna la obra con el "like" actualizado
        return this.http.put<obraI>(`${this.url}/${id}`, artWork);
      })
    );
  }
}
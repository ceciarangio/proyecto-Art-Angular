import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { obraI } from './Models/obra.model';

@Injectable({
  providedIn: 'root'
})
export class ArtWorkService {

url: string = 'http://localhost:5000/artworksOk';

constructor(private http: HttpClient) {}

addArtist(artWorks: obraI): Observable<obraI> {
  return this.http.post<obraI>(this.url, artWorks);
}

getObras(): Observable<obraI[]> {
  return this.http.get<obraI[]>(this.url).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error al obtener obras:', error);
      return throwError('Something went wrong');
    })
  );
}

getObrasById(id: number): Observable<obraI[]> {
  return this.http.get<obraI[]>(`${this.url}/${id}`);
}

deleteObras(id: number): Observable<any> {
  return this.http.delete<any>(`${this.url}/${id}`);
}


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../model/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private apiServerUrl='http://localhost:8080/place';
  constructor(private http: HttpClient) { }

  public getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiServerUrl}/all`);
  }

  public updatePlace(id: number,place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.apiServerUrl}?id=${id}`,place);
  }

  public deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}?id=${id}`);
  }

  public acceptPlace(id: number): Observable<Place> {
    return this.http.patch<Place>(`${this.apiServerUrl}?id=${id}`,{});
  }
}

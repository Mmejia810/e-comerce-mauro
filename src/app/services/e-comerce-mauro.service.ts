import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';//Manejar datos asíncronos eficientemente sin bloquear la aplicación.

@Injectable({
  providedIn: 'root'
})
export class EComerceMauroService {
  private baseUrl = environment.apiUrl; //obtiene la dirreccion que esta en los enviorement

  constructor( private http: HttpClient ) {}
  getProducts(): Observable<any> {
    console.log('Llamando a la API:', this.baseUrl)
    return this.http.get(this.baseUrl); //obtiene los productos de la url
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);//obtiene las categorias de la url
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`); //obtiene los productos de la url por id
  }
}

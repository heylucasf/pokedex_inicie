import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api: string = "http://127.0.0.1:8000/api/pokedex"

  constructor(
    private http: HttpClient,
  ) { }

  obterTodosPokes(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getPokesMaisProcurados(): Observable<any> {
    const url = `${this.api}/maisProcurados`;
    return this.http.get<any>(url);
  }

  getProcurarPoke(name: string): Observable<any> {
    const url = `${this.api}/procuraPoke/${name}`;
    return this.http.get<any>(url);
  }

  getPokemonById(id: number): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.http.get<any>(url);
  }

  getPokemonByName(name: string): Observable<any> {
    const url = `${this.api}/${name}`;
    return this.http.get<any>(url);
  }

  getPokemonByIdentifier(identifier: string): Observable<any> {
    const isNumber = !isNaN(Number(identifier));
    if (isNumber) {
      return this.getPokemonById(Number(identifier));
    } else {
      return this.getPokemonByName(identifier);
    }
  }
}

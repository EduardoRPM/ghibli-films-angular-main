import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Film } from '../interfaces/film.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmsServices {
  private http = inject(HttpClient);
  private _films: WritableSignal<Film[]> = signal([]);
  

  films = this._films.asReadonly();


  filmsBackup: Film[] = [];

  fetchFilms() {
    this.http.get<Film[]>('https://ghibliapi.vercel.app/films').subscribe(
      {
        next: (data: Film[]) => {
          console.log('Films fetched:', data.length);
          this._films.set(data);
          // keep a backup copy for reloads
          this.filmsBackup = [...data];
        },
        error: (error) => {
          console.error('Error fetching films:', error);
        }
      }
    );
  }

  createFilm(film: Film) {
    this._films.update(
      films => [
        ...films, 
        film]
    );
  }
  // --- Helper methods to mutate the private signal safely ---
  clearAll() {
    this._films.set([]);
  }

  restoreFromBackup() {
    this._films.set([...this.filmsBackup]);
  }

  sortByName() {
    this._films.update(arr => [...arr].sort((a, b) => a.title.localeCompare(b.title)));
  }

  reverseOrder() {
    this._films.update(arr => [...arr].reverse());
  }

  deleteById(id: string) {
    this._films.update(arr => arr.filter(f => f.id !== id));
  }
}

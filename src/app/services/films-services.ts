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
  // signal to hold the currently selected film for the detail page
  private _selectedFilm: WritableSignal<Film | null> = signal(null);
  selectedFilm = this._selectedFilm.asReadonly();
  // store an id requested before films were loaded
  private pendingSelectedId: string | null = null;

  fetchFilms() {
    this.http.get<Film[]>('https://ghibliapi.vercel.app/films').subscribe(
      {
        next: (data: Film[]) => {
          console.log('Films fetched:', data.length);
          this._films.set(data);
          // keep a backup copy for reloads
          this.filmsBackup = [...data];
          // if there was a pending selection, try to resolve it now
          if (this.pendingSelectedId) {
            const found = this._films().find(f => f.id === this.pendingSelectedId);
            if (found) {
              this._selectedFilm.set(found);
              this.pendingSelectedId = null;
            }
          }
        },
        error: (error) => {
          console.error('Error fetching films:', error);
        }
      }
    );
  }

  // return a film by id if present in the current list
  getFilmById(id: string): Film | undefined {
    return this._films().find(f => f.id === id);
  }

  // select a film for the details page; if it's not loaded yet, fetch films
  selectFilm(id: string) {
    const found = this.getFilmById(id);
    if (found) {
      this._selectedFilm.set(found);
      this.pendingSelectedId = null;
      return;
    }
    // not found: mark as pending and fetch films (fetch will resolve it when data arrives)
    this.pendingSelectedId = id;
    this.fetchFilms();
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

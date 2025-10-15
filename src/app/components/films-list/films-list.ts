import { Component, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Film } from '../../interfaces/film.interface';
import { FilmCard } from '../film-card/film-card';
import { AppButtonActions } from '../app-button-actions/app-button-actions';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [HttpClientModule, FilmCard, AppButtonActions],
  templateUrl: './films-list.html',
  styleUrls: ['./films-list.css']
})
export class FilmsList {
  films: WritableSignal<Film[]> = signal([]);
  private filmsBackup: Film[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Film[]>('https://ghibliapi.vercel.app/films').subscribe({
      next: (data) => {
        console.log('Films fetched:', data.length);
        this.films.set(data);
        this.filmsBackup = data;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
      }
    });
  }

  deleteFilm(id: string) {
    console.log(`Eliminando película con ID: ${id}... desde el componente padre`);
    this.films.update(arr => arr.filter(f => f.id !== id));
  }

  // === Métodos para los 4 botones ===
  eliminarTodos() {
    this.films.set([]);
  }

  recargar() {

    this.films.set([...this.filmsBackup]);
  }

  ordenarPorNombre() {
    this.films.update(arr => [...arr].sort((a, b) => a.title.localeCompare(b.title)));
  }

  invertirElementos() {
    this.films.update(arr => [...arr].reverse());
  }
}

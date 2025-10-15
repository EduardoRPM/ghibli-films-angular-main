import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Film } from '../../interfaces/film.interface';
import { FilmCard } from '../film-card/film-card';
import { AppButtonActions } from '../app-button-actions/app-button-actions';
import { FilmsServices } from '../../services/films-services';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [FilmCard, AppButtonActions],
  templateUrl: './films-list.html',
  styleUrls: ['./films-list.css']
})
export class FilmsList {

  filmServices = inject(FilmsServices);
   
  constructor() {
    if (this.filmServices.films().length === 0) {
      this.filmServices.fetchFilms();
    }
  } // fetch films on component init 


  get films(){
    return this.filmServices.films();
  }

  deleteFilm(id: string) {
    console.log(`Eliminando película con ID: ${id}... desde el componente padre`);
    this.filmServices.deleteById(id);
  }

  // === Métodos para los 4 botones ===
  eliminarTodos() {
    this.filmServices.clearAll();
  }

  recargar() {
    this.filmServices.restoreFromBackup();
  }

  ordenarPorNombre() {
    this.filmServices.sortByName();
  }

  invertirElementos() {
    this.filmServices.reverseOrder();
  }
}

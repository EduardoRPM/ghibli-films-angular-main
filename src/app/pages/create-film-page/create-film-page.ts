import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmCard } from '../../components/film-card/film-card';
import { FilmsServices } from '../../services/films-services';

@Component({
  selector: 'app-create-film-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-film-page.html',
  styleUrls: ['./create-film-page.css']
})
export class CreateFilmPage {

  private filmServices = inject(FilmsServices);
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    url: new FormControl('', [])
  });

  formSubmitted = signal(false);

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.form.valid) {
      console.log('Formulario válido, datos enviados:', this.form.value);

      const film = {
        description: this.form.value.description ?? '',
        image: this.form.value.image ?? '',
        title: this.form.value.title ?? '',
        url: this.form.value.url ?? '',
        id: "",

      };
      console.log('Film creado:', film);
      this.filmServices.createFilm(film);
      this.form.reset();
      this.formSubmitted.set(false);
      
    } else {
      console.log('Formulario inválido, por favor corrige los errores.');
    }
  }
}

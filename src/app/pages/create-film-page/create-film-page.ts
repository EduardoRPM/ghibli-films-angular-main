import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmCard } from '../../components/film-card/film-card';

@Component({
  selector: 'app-create-film-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-film-page.html',
  styleUrls: ['./create-film-page.css']
})
export class CreateFilmPage {

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
        title: this.form.value.title ?? '',
        image: this.form.value.image ?? '',
        description: this.form.value.description ?? '',
        url: this.form.value.url ?? ''
      };
      this.form.reset();
      this.formSubmitted.set(false);
      
    } else {
      console.log('Formulario inválido, por favor corrige los errores.');
    }
  }
}

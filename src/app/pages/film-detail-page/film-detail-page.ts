import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsServices } from '../../services/films-services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-film-detail-page',
  // import NgIf so the template can use *ngIf
  imports: [NgIf],
  templateUrl: './film-detail-page.html',
  styleUrl: './film-detail-page.css'
})
export class FilmDetailPage {
  // inject route and films service
  private route = inject(ActivatedRoute);
  private filmsService = inject(FilmsServices);

  // on construction, subscribe to route params and request the selected film
  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // request the service to select the film; service will fetch if needed
      this.filmsService.selectFilm(id);
    }
  }

  // getter for template to read the selected film value (null if not set)
  get selectedFilm() {
    return this.filmsService.selectedFilm();
  }
}

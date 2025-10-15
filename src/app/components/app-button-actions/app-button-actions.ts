import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-actions',
  standalone: true,
  templateUrl: './app-button-actions.html',
  styleUrls: ['./app-button-actions.css'] // 👈 en plural
})
export class AppButtonActions {           // 👈 el nombre de la clase coincide con tu import
  @Output() eliminarTodos = new EventEmitter<void>();
  @Output() recargar = new EventEmitter<void>();
  @Output() ordenar = new EventEmitter<void>();
  @Output() invertir = new EventEmitter<void>();

  onEliminarTodos() { this.eliminarTodos.emit(); }
  onRecargar()      { this.recargar.emit(); }
  onOrdenar()       { this.ordenar.emit(); }
  onInvertir()      { this.invertir.emit(); }
}

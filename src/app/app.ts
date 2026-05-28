import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TischLayout } from './components/tisch-layout/tisch-layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TischLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tischbuchung');
}
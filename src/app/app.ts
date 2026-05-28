import { Component, signal } from '@angular/core';
import { TischLayout } from './components/tisch-layout/tisch-layout';

@Component({
  selector: 'app-root',
  imports: [TischLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tischbuchung');
}
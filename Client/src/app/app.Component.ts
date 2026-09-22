import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.Component.html',
  styleUrl: './app.Component.css'
})
export class AppComponent {
title="SkiNet";
}

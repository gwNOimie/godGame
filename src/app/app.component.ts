import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent /*implements OnInit*/ {
  title = 'app';
  // constructor() {}

  // ngOnInit(): void {
  //   const renderer = PIXI.autoDetectRenderer({view: document.getElementById('gamecanvas')});
  //   document.body.appendChild(renderer.view);
  //   const stage = new PIXI.Container();
  //   renderer.render(stage);
  // }
}

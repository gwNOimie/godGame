import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {
  renderer: any;

  constructor() { }

  ngOnInit() {
    this.renderer = PIXI.autoDetectRenderer(this.getParentDivWidth(), this.getParentDivHeight());
    document.getElementById('pixi-container').appendChild(this.renderer.view);
    this.renderer.autoResize = true;

    // Create a container object called the `stage` and render it...
    const stage = new PIXI.Container();
    this.renderer.render(stage);
  }

  getParentDivHeight() {
    // const h = $('#pixi-canvas-container').height();
    const h = document.getElementById('pixi-container').clientHeight;
    console.log(h);
    return h;
  }

  getParentDivWidth() {
    // const v = $('#pixi-canvas-container').width();
    const v = document.getElementById('pixi-container').clientWidth;
    console.log(v);
    return v;
  }

  adjustCanvasSize() {
    this.renderer.resize(this.getParentDivWidth(), this.getParentDivHeight());
    console.log(this.renderer.view.width, this.renderer.view.height);
  }
}

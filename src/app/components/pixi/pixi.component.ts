import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {
  renderer: any;
  constructor() {}

    ngOnInit() {
      this.generatePixiCanvas();
      console.log('pixi component is created');
    }

    generatePixiCanvas() {
        // Create the canvas and add it the DOM...
        this.renderer = PIXI.autoDetectRenderer(this.getParentDivWidth(), this.getParentDivHeight());
        document.getElementById('pixi-canvas-container').appendChild(this.renderer.view);
        this.renderer.autoResize = true;

        // Create a container object called the `stage` and render it...
        const stage = new PIXI.Container();
        this.renderer.render(stage);
    }

    getParentDivHeight() {
      return $('#pixi-canvas-container').height();
    }

    getParentDivWidth() {
      return $('#pixi-canvas-container').width() + 1;
    }

    adjustCanvasSize() {
      this.renderer.resize(this.getParentDivWidth(), this.getParentDivHeight());
    }
}

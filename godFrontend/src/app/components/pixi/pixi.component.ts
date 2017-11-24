import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {
  renderer: any;
  stage: any;

  constructor() { }

  ngOnInit() {
    this.renderer = PIXI.autoDetectRenderer(this.getParentDivWidth(), this.getParentDivHeight());
    document.getElementById('pixi-container').appendChild(this.renderer.view);
    this.renderer.autoResize = true;

    // Create a container object called the `stage` and render it...
    this.stage = new PIXI.Container();
    this.renderer.backgroundColor = 0x061639;

    this.createSprite('cat', '../../assets/images/cat.png');

    this.renderer.render(this.stage);
  }

  getParentDivHeight() {
    // const h = $('#pixi-canvas-container').height();
    const h = document.getElementById('pixi-container').clientHeight;
    return h;
  }

  getParentDivWidth() {
    // const v = $('#pixi-canvas-container').width();
    const v = document.getElementById('pixi-container').clientWidth;
    return v;
  }

  adjustCanvasSize() {
    this.renderer.resize(this.getParentDivWidth(), this.getParentDivHeight());
  }

  createSprite(name: string, image: string) {
    PIXI.loader
    .add(name, image)
    .on('progress', (loader, resource) => {
      console.log(`loading ${resource.url}`);
      console.log(`status ${loader.progress}`);
    })
    .load(() => {
      const sprite = new PIXI.Sprite(
        PIXI.loader.resources[name].texture
      );
      sprite.interactive = true;
      sprite.on('click', () => console.log('click'));
      this.stage.addChild(sprite);
      this.renderer.render(this.stage);
    });
  }
}

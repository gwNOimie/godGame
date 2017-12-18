import { Injectable, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Injectable()
export class PixiService {
  private renderer: any;
  private stage: any;

  constructor() { }

  public init(target): void {
    this.renderer = PIXI.autoDetectRenderer(this.getParentDivWidth(target), this.getParentDivHeight(target));
    target.appendChild(this.renderer.view);
    this.renderer.autoResize = true;

    // Create a container object called the `stage` and render it...
    this.stage = new PIXI.Container();
    this.renderer.backgroundColor = 0x061639;
    this.renderer.render(this.stage);
  }

  private getParentDivHeight(target) {
    // const h = $('#pixi-canvas-container').height();
    const h = target.clientHeight;
    return h;
  }

  private getParentDivWidth(target) {
    // const v = $('#pixi-canvas-container').width();
    const v = target.clientWidth;
    return v;
  }

  public adjustCanvasSize(target) {
    this.renderer.resize(this.getParentDivWidth(target), this.getParentDivHeight(target));
  }

  public createSprite(name: string, image: string) {
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

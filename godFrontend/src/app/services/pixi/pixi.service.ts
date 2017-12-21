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
        const ticker = new PIXI.ticker.Ticker();
        let speedX = 0;
        let speedY = 0;
        sprite.position.set(250, 250);
        sprite.interactive = true;
        sprite.anchor.set(0.5, 0.5);
        var mousePosition = this.renderer.plugins.interaction.mouse.global;
        sprite.on('click', () => {
          sprite.position.set(mousePosition.x, mousePosition.y);
          speedX = 1;
          speedY = 1;
          console.log('X : ' + mousePosition.x, "Y : " + mousePosition.y);
                    
          ticker.stop();
          ticker.add((deltaTime) => {
            sprite.position.x += speedX;
            sprite.position.y += speedY;

            console.log('X : ' + sprite.position.x + ", Y : " + sprite.position.y);

            if (sprite.position.x > 500) {
              speedY = 0;
            }
            if (sprite.position.x > 1000) {
              speedX = 0;
            }


            this.renderer.render(this.stage);
          });
          ticker.start();


        });

        

        this.stage.addChild(sprite);
        this.renderer.render(this.stage);
      });
  }
}

import { PixiService } from './../../services/pixi/pixi.service';
import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {
  target: any;
  constructor(private pixi: PixiService) { }

  ngOnInit() {
    this.target = document.getElementById('pixi-container');
    this.pixi.init(this.target);

  }

  adjustCanvasSize() {
    this.pixi.adjustCanvasSize(this.target);
  }

}

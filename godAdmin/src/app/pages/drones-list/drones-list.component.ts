import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drones-list',
  templateUrl: './drones-list.component.html',
  styleUrls: ['./drones-list.component.scss'],
})
export class DronesListComponent implements OnInit {
  dronesList: any;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getList('drones').then((data) => {
      console.log('drones.getlist : ', data);
      this.dronesList = data;
    });
  }

}

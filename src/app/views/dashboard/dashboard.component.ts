import { Component, OnInit } from '@angular/core';
import { PrecioPisoBOService } from 'src/app/services/BO/precio-piso-bo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  PrecioPisoBOService: PrecioPisoBOService;
  constructor() { 
    this.PrecioPisoBOService = new PrecioPisoBOService();
  }

  ngOnInit(): void {
    this.consumoPrecioPiso();
    this.gaugeChart();
  }

  async consumoPrecioPiso(){
    let respuesta = await this.PrecioPisoBOService.precioPiso();
    console.log(respuesta);

  }

  gaugeChart(){
    
  }
}

import { Injectable } from '@angular/core';
import { PrecioPisoDAOService } from '../DAO/precio-piso-dao.service';

@Injectable({
  providedIn: 'root'
})
export class PrecioPisoBOService {
  PrecioPisoDAOService: PrecioPisoDAOService;

  constructor() { 
    this.PrecioPisoDAOService = new PrecioPisoDAOService();
  }

  async precioPiso(){
    let res = null;
    try {
        res = await this.PrecioPisoDAOService.precioPiso;
    } catch ( error ) {
        console.log("errorBO precioPiso: " + error)
    }
    return res;
}
}

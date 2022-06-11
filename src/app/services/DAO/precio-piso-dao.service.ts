import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PrecioPisoDAOService {

    constructor() { }

    async precioPiso() {
        try {
            let url = await environment.endp_precioPiso;
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "method": "POST",
                "body": {
                    "data": {
                        "codigo": 380,
                        "zona": "METRO",
                        "tipoOperacion": true,
                        "volumen": 10000,
                        "propuesto": 4524
                    }
                }
            });

            console.log("prueba");
            console.log("RAW " + raw);
            return await fetch(url, { method: 'POST', body: raw }).then((data) => {
                if (data.ok) { return data.json(); } else { throw 'Error en la llamada Ajax fetch a: ' + url; }
            }).then((respuesta) => {
                try {
                    if (respuesta.codigo == 0) {
                        return respuesta;
                    } else {
                        throw new Error('Error estatus desconocido.');
                    }
                } catch (e) {
                    console.log('Error en el resultado de la petición: ', e);
                    //throw new Error(e);
                }
            }).catch((err) => {
                console.log('Error: en la petición: ' + err);
                throw err;
            });

        } catch (error) {
            console.log('Error: antes de realizar la petición: ' + error);
            throw error;
        }
    }
}

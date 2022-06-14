import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrecioPisoDAOService } from 'src/app/services/DAO/precio-piso-dao.service';
import { getDatosI } from 'src/app/models/getDatos.interface';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // COSTO PRECIO PISO
  preciopisoGral: number = 0;
  costoVta: number = 0;
  gastoCryo: number = 0;
  gastoDist: number = 0;
  depreciacion: number = 0;
  utilidadOperativaSinGVyGADM: number = 0;
  gastoVta: number = 0;
  gastoAdm: number = 0;
  utilidadOperativaNeta: number = 0;

  // PORCENTAJE PRECIO PISO
  porpreciopisoGral: number = 0;
  porcostoVta: number = 0;
  porgastoCryo: number = 0;
  porgastoDist: number = 0;
  pordepreciacion: number = 0;
  porutilidadOperativaSinGVyGADM: number = 0;
  porgastoVta: number = 0;
  porgastoAdm: number = 0;
  porutilidadOperativaNeta: number = 0;

  // COSTO PRECIO PROPUESTO
  pppreciopisoGral: number = 0;
  ppcostoVta: number = 0;
  ppgastoCryo: number = 0;
  ppgastoDist: number = 0;
  ppdepreciacion: number = 0;
  pputilidadOperativaSinGVyGADM: number = 0;
  ppgastoVta: number = 0;
  ppgastoAdm: number = 0;
  pputilidadOperativaNeta: number = 0;

  // PORCENTAJE PRECIO PROPUESTO
  ppporpreciopisoGral: number = 0;
  ppporcostoVta: number = 0;
  ppporgastoCryo: number = 0;
  ppporgastoDist: number = 0;
  pppordepreciacion: number = 0;
  ppporutilidadOperativaSinGVyGADM: number = 0;
  ppporgastoVta: number = 0;
  ppporgastoAdm: number = 0;
  ppporutilidadOperativaNeta: number = 0;

  // TOTALES PRECIO PISO
  tpfacturacionAnual: number = 0;
  tputilidadOperativaNeta: number = 0;
  tputilidadOperativaNetaCryoInfra: number = 0;
  tputilidadOperativaSinGVyGADM: number = 0;

  // TOTALES PRECIO PROPUESTO
  tppfacturacionAnual: number = 0;
  tpputilidadOperativaNeta: number = 0;
  tpputilidadOperativaNetaCryoInfra: number = 0;
  tpputilidadOperativaSinGVyGADM: number = 0;

  // SELECT FILTER
  linea: any[] = [];
  zona: any[] = [];
  codigo: any[] = [];

  // UTILIDAD OPERATIVA NETA (GRAFICA)
  utilidadNeta: string = '-';

  //DIFERENCIA UTILIDAD
  difPrePropuestoVSPrePiso: number = 0;

  //GAUGE CHART
  angulo: number = 90;
  chartPrecioPropuesto: number = 0;
  chartPrecioPiso: number = 0;
  chartCostoVenta: number = 0;
  chartGastoCryogenico: number = 0;
  chartGastosVenta: number = 0;

  //DIFERENCIA PARTE INFERIOR
  costoVariable: string = '-';

  //FORM
  filterForm = new FormGroup({
    linea: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    zona: new FormControl('', Validators.required),
    propuesto: new FormControl('', Validators.required),
    volumen: new FormControl('', Validators.required),
    tipoOperacion: new FormControl(false, Validators.nullValidator),
  })

  constructor(private precioPiso: PrecioPisoDAOService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.selectLinea();
    this.selectZona();
  }

  selectLinea() {
    this.precioPiso.getLinea().subscribe(res => {
      this.linea = res;

    });
  }

  selectCodigo(event: any) {
    let value = event.target.value;
    this.precioPiso.getCodigo(value).subscribe(res => {
      this.codigo = res;
    });
  }

  selectZona() {
    this.precioPiso.getZona().subscribe(res => {
      this.zona = res;
    });
  }

  validaVacio(valor: any) {
    valor = valor.replace("&nbsp;", "");
    valor = valor == undefined ? "" : valor;
    if (!valor || 0 === valor.trim().length) {
      return true;
    }
    else {
      return false;
    }
  }

  loader() {
    //ACTIVA LOADER
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  consultarDatos(form: getDatosI) {
    this.precioPiso.getDatos(form).subscribe(res => {

      // COSTO PRECIO PISO
      this.preciopisoGral = res.resultado.info.precioPiso.toFixed(2);
      this.costoVta = res.resultado.info.costoVta.toFixed(2);
      this.gastoCryo = res.resultado.info.gastoCryo.toFixed(2);
      this.gastoDist = res.resultado.info.gastoDist.toFixed(2);
      this.depreciacion = res.resultado.info.depreciacion.toFixed(2);
      this.utilidadOperativaSinGVyGADM = res.resultado.info.utilidadOperativaSinGVyGADM.toFixed(2);
      this.gastoVta = res.resultado.info.gastoVta.toFixed(2);
      this.gastoAdm = res.resultado.info.gastoAdm.toFixed(2);
      this.utilidadOperativaNeta = res.resultado.info.utilidadOperativaNeta.toFixed(2);

      // PORCENTAJE PRECIO PISO
      this.porpreciopisoGral = res.resultado.porcentajePrecioPiso.precioPiso.toFixed(2);
      this.porcostoVta = res.resultado.porcentajePrecioPiso.costoVta.toFixed(2);
      this.porgastoCryo = res.resultado.porcentajePrecioPiso.gastoCryo.toFixed(2);
      this.porgastoDist = res.resultado.porcentajePrecioPiso.gastoDist.toFixed(2);
      this.pordepreciacion = res.resultado.porcentajePrecioPiso.depreciacion.toFixed(2);
      this.porutilidadOperativaSinGVyGADM = res.resultado.porcentajePrecioPiso.utilidadOperativaSinGVyGADM.toFixed(2);
      this.porgastoVta = res.resultado.porcentajePrecioPiso.gastoVta.toFixed(2);
      this.porgastoAdm = res.resultado.porcentajePrecioPiso.gastoAdm.toFixed(2);
      this.porutilidadOperativaNeta = res.resultado.porcentajePrecioPiso.utilidadOperativaNeta.toFixed(2);

      // COSTO PRECIO PROPUESTO
      this.pppreciopisoGral = res.resultado.infoPropuesto.precioPiso.toFixed(2);
      this.ppcostoVta = res.resultado.infoPropuesto.costoVta.toFixed(2);
      this.ppgastoCryo = res.resultado.infoPropuesto.gastoCryo.toFixed(2);
      this.ppgastoDist = res.resultado.infoPropuesto.gastoDist.toFixed(2);
      this.ppdepreciacion = res.resultado.infoPropuesto.depreciacion.toFixed(2);
      this.pputilidadOperativaSinGVyGADM = res.resultado.infoPropuesto.utilidadOperativaSinGVyGADM.toFixed(2);
      this.ppgastoVta = res.resultado.infoPropuesto.gastoVta.toFixed(2);
      this.ppgastoAdm = res.resultado.infoPropuesto.gastoAdm.toFixed(2);
      this.pputilidadOperativaNeta = res.resultado.infoPropuesto.utilidadOperativaNeta.toFixed(2);

      //UTILIDAD OPERATIVA NETA
      const utilidad = this.pputilidadOperativaNeta;
      if (utilidad >= 0) {
        this.utilidadNeta = 'Positiva "Creación de Valor"';
        (document.getElementById('utilidadNetaText') as HTMLDivElement).style.color = "green";
      } else {
        this.utilidadNeta = 'Negativa "Destrucción de Valor"';
        (document.getElementById('utilidadNetaText') as HTMLDivElement).style.color = "red";
      }

      //GAUGE CHART
      this.chartPrecioPropuesto = this.pppreciopisoGral;
      this.chartPrecioPiso = this.preciopisoGral;
      this.chartCostoVenta = res.resultado.graficaDto.costoVenta.toFixed(2);
      this.chartGastoCryogenico = res.resultado.graficaDto.gastoCryDep.toFixed(2);
      this.chartGastosVenta = res.resultado.graficaDto.gvAdmin.toFixed(2);

      const colorAngulo = res.resultado.graficaDto.color;
      if (colorAngulo == 0) { // 0 ->Error de calculo
        this.angulo = -5;
      } if (colorAngulo == 1) { // 1 ->Verde
        this.angulo = 170;
      } if (colorAngulo == 2) { // 2 ->Rojo
        this.angulo = 10;
      } if (colorAngulo == 3) { // 3 ->Amarillo
        this.angulo = 120;
      } if (colorAngulo == 4) { // 4 ->Naranja
        this.angulo = 60;
      }
      
      this.costoVariable = 'Costo de oportunidad';
      
      // PORCENTAJE PRECIO PROPUESTO
      this.ppporpreciopisoGral = res.resultado.porcentajePropuesto.precioPiso.toFixed(2);
      this.ppporcostoVta = res.resultado.porcentajePropuesto.costoVta.toFixed(2);
      this.ppporgastoCryo = res.resultado.porcentajePropuesto.gastoCryo.toFixed(2);
      this.ppporgastoDist = res.resultado.porcentajePropuesto.gastoDist.toFixed(2);
      this.pppordepreciacion = res.resultado.porcentajePropuesto.depreciacion.toFixed(2);
      this.ppporutilidadOperativaSinGVyGADM = res.resultado.porcentajePropuesto.utilidadOperativaSinGVyGADM.toFixed(2);
      this.ppporgastoVta = res.resultado.porcentajePropuesto.gastoVta.toFixed(2);
      this.ppporgastoAdm = res.resultado.porcentajePropuesto.gastoAdm.toFixed(2);
      this.ppporutilidadOperativaNeta = res.resultado.porcentajePropuesto.utilidadOperativaNeta.toFixed(2);

      // TOTALES PRECIO PISO
      this.tpfacturacionAnual = res.resultado.totales.facturacionAnual.toFixed(2);
      this.tputilidadOperativaNeta = res.resultado.totales.utilidadOperativaNeta.toFixed(2);
      this.tputilidadOperativaNetaCryoInfra = res.resultado.totales.utilidadOperativaNeta.toFixed(2);
      this.tputilidadOperativaSinGVyGADM = res.resultado.totales.utilidadOperativaSinGVyGADM.toFixed(2);

      // TOTALES PRECIO PROPUESTO
      this.tppfacturacionAnual = res.resultado.totalesPropuesto.facturacionAnual.toFixed(2);
      this.tpputilidadOperativaNeta = res.resultado.totalesPropuesto.utilidadOperativaNeta.toFixed(2);
      this.tpputilidadOperativaNetaCryoInfra = res.resultado.totalesPropuesto.utilidadOperativaNeta.toFixed(2);
      this.tpputilidadOperativaSinGVyGADM = res.resultado.totalesPropuesto.utilidadOperativaSinGVyGADM.toFixed(2);

      //DIFERENCIA UTILIDAD PRECIO PROPUESTO VS PISO
      this.difPrePropuestoVSPrePiso = res.resultado.graficaDto.precioPropuestoVPiso.toFixed(2);
      if( this.difPrePropuestoVSPrePiso >= 0){
        (document.getElementById('difPrePropuestoVSPrePiso') as HTMLDivElement).style.color = "green";
      }else{
        (document.getElementById('difPrePropuestoVSPrePiso') as HTMLDivElement).style.color = "red";
      }

    }, (errorServicio) => {
      console.log(errorServicio);
      Swal.fire(
        'Intenta nuevamente',
        'La consulta no fue validada',
        'error'
      )
    })

  }

}

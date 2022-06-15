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
  preciopisoGral: any = 0;
  costoVta: any = 0;
  gastoCryo: any = 0;
  gastoDist: any = 0;
  depreciacion: any = 0;
  utilidadOperativaSinGVyGADM: any = 0;
  gastoVta: any = 0;
  gastoAdm: any = 0;
  utilidadOperativaNeta: any = 0;

  // PORCENTAJE PRECIO PISO
  porpreciopisoGral: any = 0;
  porcostoVta: any = 0;
  porgastoCryo: any = 0;
  porgastoDist: any = 0;
  pordepreciacion: any = 0;
  porutilidadOperativaSinGVyGADM: any = 0;
  porgastoVta: any = 0;
  porgastoAdm: any = 0;
  porutilidadOperativaNeta: any = 0;

  // COSTO PRECIO PROPUESTO
  pppreciopisoGral: any = 0;
  ppcostoVta: any = 0;
  ppgastoCryo: any = 0;
  ppgastoDist: any = 0;
  ppdepreciacion: any = 0;
  pputilidadOperativaSinGVyGADM: any = 0;
  ppgastoVta: any = 0;
  ppgastoAdm: any = 0;
  pputilidadOperativaNeta: any = 0;

  // PORCENTAJE PRECIO PROPUESTO
  ppporpreciopisoGral: any = 0;
  ppporcostoVta: any = 0;
  ppporgastoCryo: any = 0;
  ppporgastoDist: any = 0;
  pppordepreciacion: any = 0;
  ppporutilidadOperativaSinGVyGADM: any = 0;
  ppporgastoVta: any = 0;
  ppporgastoAdm: any = 0;
  ppporutilidadOperativaNeta: any = 0;

  // TOTALES PRECIO PISO
  tpfacturacionAnual: any = 0;
  tputilidadOperativaNeta: any = 0;
  tputilidadOperativaNetaCryoInfra: any = 0;
  tputilidadOperativaSinGVyGADM: any = 0;

  // TOTALES PRECIO PROPUESTO
  tppfacturacionAnual: any = 0;
  tpputilidadOperativaNeta: any = 0;
  tpputilidadOperativaNetaCryoInfra: any = 0;
  tpputilidadOperativaSinGVyGADM: any = 0;

  // SELECT FILTER
  linea: any[] = [];
  zona: any[] = [];
  codigo: any[] = [];

  // UTILIDAD OPERATIVA NETA (GRAFICA)
  utilidadNeta: string = '-';

  //DIFERENCIA UTILIDAD
  difPrePropuestoVSPrePiso: any = 0;

  //GAUGE CHART
  angulo: any = 90;
  chartPrecioPropuesto: any = 0;
  chartPrecioPiso: any = 0;
  chartCostoVenta: any = 0;
  chartGastoCryogenico: any = 0;
  chartGastosVenta: any = 0;

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
      this.porpreciopisoGral = res.resultado.porcentajePrecioPiso.precioPiso.toFixed(1);
      this.porcostoVta = res.resultado.porcentajePrecioPiso.costoVta.toFixed(1);
      this.porgastoCryo = res.resultado.porcentajePrecioPiso.gastoCryo.toFixed(1);
      this.porgastoDist = res.resultado.porcentajePrecioPiso.gastoDist.toFixed(1);
      this.pordepreciacion = res.resultado.porcentajePrecioPiso.depreciacion.toFixed(1);
      this.porutilidadOperativaSinGVyGADM = res.resultado.porcentajePrecioPiso.utilidadOperativaSinGVyGADM.toFixed(1);
      this.porgastoVta = res.resultado.porcentajePrecioPiso.gastoVta.toFixed(1);
      this.porgastoAdm = res.resultado.porcentajePrecioPiso.gastoAdm.toFixed(1);
      this.porutilidadOperativaNeta = res.resultado.porcentajePrecioPiso.utilidadOperativaNeta.toFixed(1);

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
      this.chartCostoVenta = res.resultado.graficaDto.costoVenta;
      this.chartGastoCryogenico = res.resultado.graficaDto.gastoCryDep;
      this.chartGastosVenta = res.resultado.graficaDto.gvAdmin;

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
      
      this.costoVariable = res.resultado.graficaDto.analisisOportunidad;
      
      // PORCENTAJE PRECIO PROPUESTO
      this.ppporpreciopisoGral = res.resultado.porcentajePropuesto.precioPiso.toFixed(1);
      this.ppporcostoVta = res.resultado.porcentajePropuesto.costoVta.toFixed(1);
      this.ppporgastoCryo = res.resultado.porcentajePropuesto.gastoCryo.toFixed(1);
      this.ppporgastoDist = res.resultado.porcentajePropuesto.gastoDist.toFixed(1);
      this.pppordepreciacion = res.resultado.porcentajePropuesto.depreciacion.toFixed(1);
      this.ppporutilidadOperativaSinGVyGADM = res.resultado.porcentajePropuesto.utilidadOperativaSinGVyGADM.toFixed(1);
      this.ppporgastoVta = res.resultado.porcentajePropuesto.gastoVta.toFixed(1);
      this.ppporgastoAdm = res.resultado.porcentajePropuesto.gastoAdm.toFixed(1);
      this.ppporutilidadOperativaNeta = res.resultado.porcentajePropuesto.utilidadOperativaNeta.toFixed(1);

      // TOTALES PRECIO PISO
      this.tpfacturacionAnual = res.resultado.totales.facturacionAnual;
      this.tputilidadOperativaNeta = res.resultado.totales.utilidadOperativaNeta;
      this.tputilidadOperativaNetaCryoInfra = res.resultado.totales.utilidadOperativaNetaCryoInfra;
      this.tputilidadOperativaSinGVyGADM = res.resultado.totales.utilidadOperativaSinGVyGADM;

      // TOTALES PRECIO PROPUESTO
      this.tppfacturacionAnual = res.resultado.totalesPropuesto.facturacionAnual;
      this.tpputilidadOperativaNeta = res.resultado.totalesPropuesto.utilidadOperativaNeta;
      this.tpputilidadOperativaNetaCryoInfra = res.resultado.totalesPropuesto.utilidadOperativaNetaCryoInfra;
      this.tpputilidadOperativaSinGVyGADM = res.resultado.totalesPropuesto.utilidadOperativaSinGVyGADM;

      //DIFERENCIA UTILIDAD PRECIO PROPUESTO VS PISO
      this.difPrePropuestoVSPrePiso = res.resultado.graficaDto.precioPropuestoVPiso;
      
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

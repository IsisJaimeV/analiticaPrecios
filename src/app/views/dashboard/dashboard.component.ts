import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrecioPisoDAOService } from 'src/app/services/DAO/precio-piso-dao.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'

declare var $: any;
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

  //NG MODEL
  selectedCodigoSpan: string = '';
  selectedDescripcionSpan: string = '';
  selectedUMSpan: string = '';
  child: boolean = false;

  //SIMBOL NEGATIVE - POSITIVE
  spanSimbolo: string = "$";

  spanSimbolopreciopisoGral: string = "$";
  spancostoVta: string = "$";
  spangastoCryo: string = "$";
  spangastoDist: string = "$";
  spandepreciacion: string = "$";
  spanutilidadOperativaSinGVyGADM: string = "$";
  spangastoVta: string = "$";
  spangastoAdm: string = "$";
  spanutilidadOperativaNeta: string = "$";
  spanpppreciopisoGral: string = "$";
  spanppcostoVta: string = "$";
  spanppgastoCryo: string = "$";
  spanppgastoDist: string = "$"
  spanppdepreciacion: string = "$";
  spanpputilidadOperativaSinGVyGADM: string = "$";
  spanppgastoVta: string = "$";
  spanppgastoAdm: string = "$";
  spanpputilidadOperativaNeta: string = "$";
  spantpfacturacionAnual: string = "$";
  spantputilidadOperativaNeta: string = "$";
  spantputilidadOperativaNetaCryoInfra: string = "$";
  spantputilidadOperativaSinGVyGADM: string = "$";
  spantppfacturacionAnual: string = "$";
  spantpputilidadOperativaNeta: string = "$";
  spantpputilidadOperativaNetaCryoInfra: string = "$";
  spantpputilidadOperativaSinGVyGADM: string = "$";
  spanchartPrecioPropuesto = "$";
  spanchartPrecioPiso = "$";
  spanchartCostoVenta = "$";
  spanchartGastoCryogenico = "$";
  spanchartGastosVenta = "$";
  spandifPrePropuestoVSPrePiso = "$";

  //FORM
  filterForm = new FormGroup({
    linea: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    zona: new FormControl('', Validators.required),
    propuesto: new FormControl(),
    volumen: new FormControl('', Validators.required),
    tipoOperacion: new FormControl(false),
  })
  mymodel: any;
  mymodel2: any;
  correo: any = "";

  constructor(private precioPiso: PrecioPisoDAOService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.selectLinea();
    this.selectZona();
    this.separadorMiles();
  }

  validaVacios() {
    (document.getElementById('simulacion') as HTMLButtonElement).disabled = true;

    var linea = (document.getElementById("linea") as HTMLInputElement).value.length;
    var codigo = (document.getElementById("codigo") as HTMLInputElement).value.length;
    var volumen = (document.getElementById("volumen") as HTMLInputElement).value.length;
    var zona = (document.getElementById("zona") as HTMLInputElement).value.length;

    if (linea != 0 && codigo != 0 && volumen != 0 && zona != 0) {
      (document.getElementById('simulacion') as HTMLButtonElement).disabled = false;
    } else {
      (document.getElementById('simulacion') as HTMLButtonElement).disabled = true;
    }
  }

  selectLinea() {
    this.precioPiso.getLinea().subscribe(res => {
      this.linea = res;
    }, (errorServicio) => {
    });

    (document.getElementById("linea") as HTMLInputElement).value = "";
    (document.getElementById("codigo") as HTMLInputElement).value = "";
    (document.getElementById("volumen") as HTMLInputElement).value = "";
    (document.getElementById("zona") as HTMLInputElement).value = "";
    this.validaVacios();
  }

  selectCodigo(event: any) {
    let value = event.target.value;
    (document.getElementById("codigo") as HTMLSelectElement).disabled = true;
    (document.getElementById("codigo") as HTMLSelectElement).style.backgroundColor = "#c0c0c0";
    this.precioPiso.getCodigo(value).subscribe(res => {
      this.codigo = res;
      (document.getElementById("codigo") as HTMLSelectElement).disabled = false;
      (document.getElementById("codigo") as HTMLSelectElement).style.backgroundColor = "#F2F2F2";
    }, (err) => { });

    //Limpiar campos 
    (document.getElementById("codigo") as HTMLInputElement).value = "";
    (document.getElementById("zona") as HTMLInputElement).value = "";
    (document.getElementById("precioPropuesto") as HTMLInputElement).value = "";
    (document.getElementById("volumen") as HTMLInputElement).value = "";
    (document.getElementById('cryoinfra') as HTMLInputElement).checked = false;

    this.selectedUMSpan = "";
    this.selectedCodigoSpan = "";
    this.selectedDescripcionSpan = "";

    this.validaVacios();
    this.limpiarCampos();

  }

  selectedCodigo(event: any) {
    let value = event.target.value;

    var codigo = this.codigo.find(resp => resp.codigo == value)
    try {
      this.selectedDescripcionSpan = codigo.descripcion;
      this.selectedUMSpan = codigo.um;
      this.selectedCodigoSpan = value;
    } catch { }
    this.validaVacios()
  }

  borradoSpanCodigo(event: any) {
    if (event.key != undefined) {
      this.selectedCodigoSpan = "";
      this.selectedDescripcionSpan = "";
    }
  }

  selectZona() {
    this.correo = localStorage.getItem("user");

    (document.getElementById("zona") as HTMLSelectElement).disabled = true;
    (document.getElementById("zona") as HTMLSelectElement).style.backgroundColor = "#c0c0c0";
    this.precioPiso.getZona(this.correo).subscribe(res => {
      this.zona = res;
      (document.getElementById("zona") as HTMLSelectElement).disabled = false;
      (document.getElementById("zona") as HTMLSelectElement).style.backgroundColor = "#F2F2F2";
    });

    this.validaVacios();
  }

  separadorMiles() {
    $("#volumen").on({
      "focus": function (event: { target: any; }) {
        $(event.target).select();
      },
      "keyup": function (event: { target: any; }) {
        $(event.target).val(function (index: any, value: string) {
          return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{0})$/, '$1')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        });
      }
    });
  }
  validaZona(e: any) {
    this.validaVacios();
  }


  valuechange(newValue: any) {
    this.validaVacios();
  }

  loader() {
    //ACTIVA LOADER
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  loaderCheckbox(form: Object) {
    //ACTIVA LOADER
    this.loader();
    this.consultarDatos(form);
    console.log(form)
  }

  consultarDatos(form: Object) {
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
      this.porpreciopisoGral = parseFloat(res.resultado.porcentajePrecioPiso.precioPiso).toFixed(1);
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
      if (utilidad >= 1) {
        this.utilidadNeta = 'Positiva "Creación de Valor"';
        $('#utilidadNetaText').css('color', 'green');
      } if (utilidad > 0 && utilidad < 1) {
        this.utilidadNeta = 'Sin Creación de Valor';
        $('#utilidadNetaText').css('color', 'blue');
      } if (utilidad <= 0) {
        this.utilidadNeta = 'Negativa "Destrucción de Valor"';
        $('#utilidadNetaText').css('color', 'red');
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
      this.difPrePropuestoVSPrePiso = res.resultado.graficaDto.precioPropuestoVPiso.toFixed(2);

      if (this.difPrePropuestoVSPrePiso >= 0) {
        $('#difPrePropuestoVSPrePiso').css('color', 'green');
      } else {
        $('#difPrePropuestoVSPrePiso').css('color', 'red');
      }

      //CAMBIO DE SIMBOLO NEGATIVO
      if (this.preciopisoGral < 0) {
        this.spanSimbolopreciopisoGral = "-$";
        this.preciopisoGral = this.preciopisoGral * -1;
      } else if (this.preciopisoGral >= 0) {
        this.spanSimbolopreciopisoGral = "$";

      } if (this.costoVta < 0) {
        this.spancostoVta = "-$";
        this.costoVta = this.costoVta * -1;
      } else if (this.costoVta >= 0) {
        this.spancostoVta = "$";

      } if (this.gastoCryo < 0) {
        this.spangastoCryo = "-$";
        this.gastoCryo = this.gastoCryo * -1;
      } else if (this.gastoCryo >= 0) {
        this.spangastoCryo = "$";

      } if (this.gastoDist < 0) {
        this.spangastoDist = "-$";
        this.gastoDist = this.gastoDist * -1;
      } else if (this.gastoDist >= 0) {
        this.spangastoDist = "$";

      } if (this.depreciacion < 0) {
        this.spandepreciacion = "-$";
        this.depreciacion = this.depreciacion * -1;
      } else if (this.depreciacion >= 0) {
        this.spandepreciacion = "$";

      } if (this.utilidadOperativaSinGVyGADM < 0) {
        this.spanutilidadOperativaSinGVyGADM = "-$";
        this.utilidadOperativaSinGVyGADM = this.utilidadOperativaSinGVyGADM * -1;
      } else if (this.utilidadOperativaSinGVyGADM >= 0) {
        this.spanutilidadOperativaSinGVyGADM = "$";

      } if (this.gastoVta < 0) {
        this.spangastoVta = "-$";
        this.gastoVta = this.gastoVta * -1;
      } else if (this.gastoVta >= 0) {
        this.spangastoVta = "$";

      } if (this.gastoAdm < 0) {
        this.spangastoAdm = "-$";
        this.gastoAdm = this.gastoAdm * -1;
      } else if (this.gastoAdm >= 0) {
        this.spangastoAdm = "$";

      } if (this.utilidadOperativaNeta < 0) {
        this.spanutilidadOperativaNeta = "-$";
        this.utilidadOperativaNeta = this.utilidadOperativaNeta * -1;
      } else if (this.utilidadOperativaNeta >= 0) {
        this.spanutilidadOperativaNeta = "$";

      } if (this.pppreciopisoGral < 0) {
        this.spanpppreciopisoGral = "-$";
        this.pppreciopisoGral = this.pppreciopisoGral * -1;
      } else if (this.pppreciopisoGral >= 0) {
        this.spanpppreciopisoGral = "$";

      } if (this.ppcostoVta < 0) {
        this.spanppcostoVta = "-$";
        this.ppcostoVta = this.ppcostoVta * -1;
      } else if (this.ppcostoVta >= 0) {
        this.spanppcostoVta = "$";

      } if (this.ppgastoCryo < 0) {
        this.spanppgastoCryo = "-$";
        this.ppgastoCryo = this.ppgastoCryo * -1;
      } else if (this.ppgastoCryo >= 0) {
        this.spanppgastoCryo = "$";

      } if (this.ppgastoDist < 0) {
        this.spanppgastoDist = "-$";
        this.ppgastoDist = this.ppgastoDist * -1;
      } else if (this.ppgastoDist >= 0) {
        this.spanppgastoDist = "$";

      } if (this.ppdepreciacion < 0) {
        this.spanppdepreciacion = "-$";
        this.ppdepreciacion = this.ppdepreciacion * -1;
      } else if (this.ppdepreciacion >= 0) {
        this.spanppdepreciacion = "$";

      } if (this.pputilidadOperativaSinGVyGADM < 0) {
        this.spanpputilidadOperativaSinGVyGADM = "-$";
        this.pputilidadOperativaSinGVyGADM = this.pputilidadOperativaSinGVyGADM * -1;
      } else if (this.pputilidadOperativaSinGVyGADM >= 0) {
        this.spanpputilidadOperativaSinGVyGADM = "$";

      } if (this.ppgastoVta < 0) {
        this.spanppgastoVta = "-$";
        this.ppgastoVta = this.ppgastoVta * -1;
      } else if (this.ppgastoVta >= 0) {
        this.spanppgastoVta = "$";

      } if (this.ppgastoAdm < 0) {
        this.spanppgastoAdm = "-$";
        this.ppgastoAdm = this.ppgastoAdm * -1;
      } else if (this.ppgastoAdm >= 0) {
        this.spanppgastoAdm = "$";

      } if (this.pputilidadOperativaNeta < 0) {
        this.spanpputilidadOperativaNeta = "-$";
        this.pputilidadOperativaNeta = this.pputilidadOperativaNeta * -1;
      } else if (this.pputilidadOperativaNeta >= 0) {
        this.spanpputilidadOperativaNeta = "$";

      } if (this.tpfacturacionAnual < 0) {
        this.spantpfacturacionAnual = "-$";
        this.tpfacturacionAnual = this.tpfacturacionAnual * -1;
      } else if (this.tpfacturacionAnual >= 0) {
        this.spantpfacturacionAnual = "$";

      } if (this.tputilidadOperativaNeta < 0) {
        this.spantputilidadOperativaNeta = "-$";
        this.tputilidadOperativaNeta = this.tputilidadOperativaNeta * -1;
      } else if (this.tputilidadOperativaNeta >= 0) {
        this.spantputilidadOperativaNeta = "$";

      } if (this.tputilidadOperativaNetaCryoInfra < 0) {
        this.spantputilidadOperativaNetaCryoInfra = "-$";
        this.tputilidadOperativaNetaCryoInfra = this.tputilidadOperativaNetaCryoInfra * -1;
      } else if (this.tputilidadOperativaNetaCryoInfra >= 0) {
        this.spantputilidadOperativaNetaCryoInfra = "$";

      } if (this.tputilidadOperativaSinGVyGADM < 0) {
        this.spantputilidadOperativaSinGVyGADM = "-$";
        this.tputilidadOperativaSinGVyGADM = this.tputilidadOperativaSinGVyGADM * -1;
      } else if (this.tputilidadOperativaSinGVyGADM >= 0) {
        this.spantputilidadOperativaSinGVyGADM = "$";

      } if (this.tppfacturacionAnual < 0) {
        this.spantppfacturacionAnual = "-$";
        this.tppfacturacionAnual = this.tppfacturacionAnual * -1;
      } else if (this.tppfacturacionAnual >= 0) {
        this.spantppfacturacionAnual = "$";

      } if (this.tpputilidadOperativaNeta < 0) {
        this.spantpputilidadOperativaNeta = "-$";
        this.tpputilidadOperativaNeta = this.tpputilidadOperativaNeta * -1;
      } else if (this.tpputilidadOperativaNeta >= 0) {
        this.spantpputilidadOperativaNeta = "$";

      } if (this.tpputilidadOperativaNetaCryoInfra < 0) {
        this.spantpputilidadOperativaNetaCryoInfra = "-$";
        this.tpputilidadOperativaNetaCryoInfra = this.tpputilidadOperativaNetaCryoInfra * -1;
      } else if (this.tpputilidadOperativaNetaCryoInfra >= 0) {
        this.spantpputilidadOperativaNetaCryoInfra = "$";

      } if (this.tpputilidadOperativaSinGVyGADM < 0) {
        this.spantpputilidadOperativaSinGVyGADM = "-$";
        this.tpputilidadOperativaSinGVyGADM = this.tpputilidadOperativaSinGVyGADM * -1;
      } else if (this.tpputilidadOperativaSinGVyGADM >= 0) {
        this.spantpputilidadOperativaSinGVyGADM = "$";

      } if (this.chartPrecioPropuesto < 0) {
        this.spanchartPrecioPropuesto = "-$";
        this.chartPrecioPropuesto = this.chartPrecioPropuesto * -1;
      } else if (this.chartPrecioPropuesto >= 0) {
        this.spanchartPrecioPropuesto = "$";

      } if (this.chartPrecioPiso < 0) {
        this.spanchartPrecioPiso = "-$";
        this.chartPrecioPiso = this.chartPrecioPiso * -1;
      } else if (this.chartPrecioPiso >= 0) {
        this.spanchartPrecioPiso = "$";

      } if (this.chartCostoVenta < 0) {
        this.spanchartCostoVenta = "-$";
        this.chartCostoVenta = this.chartCostoVenta * -1;
      } else if (this.chartCostoVenta >= 0) {
        this.spanchartCostoVenta = "$";

      } if (this.chartGastoCryogenico < 0) {
        this.spanchartGastoCryogenico = "-$";
        this.chartGastoCryogenico = this.chartGastoCryogenico * -1;
      } else if (this.chartGastoCryogenico >= 0) {
        this.spanchartGastoCryogenico = "$";

      } if (this.chartGastosVenta < 0) {
        this.spanchartGastosVenta = "-$";
        this.chartGastosVenta = this.chartGastosVenta * -1;
      } else if (this.chartGastosVenta >= 0) {
        this.spanchartGastosVenta = "$";

      } if (this.difPrePropuestoVSPrePiso < 0) {
        this.spandifPrePropuestoVSPrePiso = "-$";
        this.difPrePropuestoVSPrePiso = this.difPrePropuestoVSPrePiso * -1;
      } else if (this.difPrePropuestoVSPrePiso >= 0) {
        this.spandifPrePropuestoVSPrePiso = "$";
      }



    }, (error) => {

      Swal.fire(
        '',
        error.error.resultado,
        'error'
      )
      console.log(error.error.codigo)
    })

  }

  limpiarCampos() {
    this.preciopisoGral = 0;
    this.costoVta = 0;
    this.gastoCryo = 0;
    this.gastoDist = 0;
    this.depreciacion = 0
    this.utilidadOperativaSinGVyGADM = 0;
    this.gastoVta = 0;
    this.gastoAdm = 0;
    this.utilidadOperativaNeta = 0;

    // PORCENTAJE PRECIO PISO
    this.porpreciopisoGral = 0;
    this.porcostoVta = 0;
    this.porgastoCryo = 0;
    this.porgastoDist = 0;
    this.pordepreciacion = 0;
    this.porutilidadOperativaSinGVyGADM = 0;
    this.porgastoVta = 0;
    this.porgastoAdm = 0;
    this.porutilidadOperativaNeta = 0;

    // COSTO PRECIO PROPUESTO
    this.pppreciopisoGral = 0;
    this.ppcostoVta = 0;
    this.ppgastoCryo = 0;
    this.ppgastoDist = 0;
    this.ppdepreciacion = 0;
    this.pputilidadOperativaSinGVyGADM = 0;
    this.ppgastoVta = 0;
    this.ppgastoAdm = 0;
    this.pputilidadOperativaNeta = 0;

    // PORCENTAJE PRECIO PROPUESTO
    this.ppporpreciopisoGral = 0;
    this.ppporcostoVta = 0;
    this.ppporgastoCryo = 0;
    this.ppporgastoDist = 0;
    this.pppordepreciacion = 0;
    this.ppporutilidadOperativaSinGVyGADM = 0;
    this.ppporgastoVta = 0;
    this.ppporgastoAdm = 0;
    this.ppporutilidadOperativaNeta = 0;

    // TOTALES PRECIO PISO
    this.tpfacturacionAnual = 0;
    this.tputilidadOperativaNeta = 0;
    this.tputilidadOperativaNetaCryoInfra = 0;
    this.tputilidadOperativaSinGVyGADM = 0;

    // TOTALES PRECIO PROPUESTO
    this.tppfacturacionAnual = 0;
    this.tpputilidadOperativaNeta = 0;
    this.tpputilidadOperativaNetaCryoInfra = 0;
    this.tpputilidadOperativaSinGVyGADM = 0;

    // UTILIDAD OPERATIVA NETA (GRAFICA)
    this.utilidadNeta = '-';

    //DIFERENCIA UTILIDAD
    this.difPrePropuestoVSPrePiso = 0;

    //GAUGE CHART
    this.angulo = 90;
    this.chartPrecioPropuesto = 0;
    this.chartPrecioPiso = 0;
    this.chartCostoVenta = 0;
    this.chartGastoCryogenico = 0;
    this.chartGastosVenta = 0;


    //LIMPIA SIMBOLO NEGATIVO
    this.spancostoVta = "$";
    this.spangastoCryo = "$";
    this.spangastoDist = "$";
    this.spandepreciacion = "$";
    this.spanutilidadOperativaSinGVyGADM = "$";
    this.spangastoVta = "$";
    this.spangastoAdm = "$";
    this.spanutilidadOperativaNeta = "$";
    this.spanpppreciopisoGral = "$";
    this.spanppcostoVta = "$";
    this.spanppgastoCryo = "$";
    this.spanppgastoDist = "$";
    this.spanppdepreciacion = "$";
    this.spanpputilidadOperativaNeta = "$";
    this.spanpputilidadOperativaSinGVyGADM = "$";
    this.spanppgastoVta = "$";
    this.spanppgastoAdm = "$";
    this.spantpfacturacionAnual = "$";
    this.spantputilidadOperativaNeta = "$";
    this.spantputilidadOperativaNetaCryoInfra = "$";
    this.spantputilidadOperativaSinGVyGADM = "$";
    this.spantppfacturacionAnual = "$";
    this.spantpputilidadOperativaNeta = "$";
    this.spantpputilidadOperativaNetaCryoInfra = "$";
    this.spantpputilidadOperativaSinGVyGADM = "$";

    this.spanchartPrecioPropuesto = "$";
    this.spanchartPrecioPiso = "$";
    this.spanchartCostoVenta = "$";
    this.spanchartGastoCryogenico = "$";
    this.spanchartGastosVenta = "$";
    this.spandifPrePropuestoVSPrePiso = "$";

    //CAMBIO DE COLOR
    $('#utilidadNetaText').css('color', 'black');
    $('#difPrePropuestoVSPrePiso').css('color', 'black');
  }

}

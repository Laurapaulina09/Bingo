import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { asignarNumero } from '../services/bingoService';


interface numero {
  numero:number,
  estado:boolean
}
@customElement('sala-bingo')
export class SalaBingo extends LitElement {
  @property({type:Object}) sala:any = null;
  @property({type: Array}) balotas:Array<numero> =[];
  @property({type:Boolean}) activo=false
  @property({type:Array}) numerosAle:Array<number> = []
  @property({type:Number}) posicion =0;
  @property({type:Number}) select:any = null;
  @property({type: Number}) intervalo:any=null;
  @property({type: Boolean}) gano=false
  @property({type:Object}) audio:any = null
  static styles = css`
    .borde-principal {
      border:5px solid white;
      padding:20px;
      border-radius:10px;
    }
    .cuadroBingo{
      color:white;
      width:700px;
      margin:10px auto;
      background-color:green;
    }
    .titulo{
      font-size:50px;
      text-align:center;
      padding:15px 0px;
      display:flex;
      justify-content:center;
    }
    .circulo-grande{
      display:block;
      width:25px;
      height:25px;
      background:white;
      border-radius:50%;
      border:10px solid red;
      align-self:center
    }
    .botones{
      margin:10px 0px
    }
    .balotas{
      display:grid;
      grid-template-columns: repeat(15,35px);
      grid-template-rows:auto;
      grid-gap:5px
    }
    .cuadro-balotas{
      display:grid;
      grid-template-columns:1fr 15fr;
    }
    .balotas div{
      width:23px;
      height:23px;
      border-radius:50%;
      border:6px solid grey;
      display:flex;
      text-align:center;
      justify-content:center;
      align-items:center;
      margin:5px;
      color:grey;
      background-color:white
    }
    .balotas-title{
      display:grid !important;
      grid-template-rows:auto;
      grid-template-columns:1fr
    }
    .botones{
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
    }
    .control div{
      fill:white;
      border:3px solid white;
      border-radius:10px;
      margin:5px;
      display: flex;
      align-items: center;
    }
    .botones>div{
      display:flex;
      justify-content:center
    }
    .control-proceso>div{
      margin:5px;
      width:35px;
      height:35px;
      border:10px solid #ffc600;
      color:black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
    }
    .balota-gigante>div{
      width:40px;
      height:40px;
      border:15px solid red;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
    }
    .select {
      border:6px solid #ffc600 !important
    }
    .imagen{
      position: fixed;top: 0px;left: 0px;width: 100%;height: 100vh;object-fit: cover;
      background:url("https://i.pinimg.com/originals/fb/a0/f8/fba0f8cdf64afec58932750af1f4b3bf.gif");
      background-repeat: no-repeat;
      background-position-y: bottom;
    }
  `;

  constructor(){
    super()
    for(let n = 0; n<75; n++){
      this.balotas.push({
        numero:n+1,
        estado:false
      })
    }
    this.audio =  new Audio('./aplausos.mp3')
    this.generarAleatorio()
    this.generarIntervalo()
  }
  generarIntervalo(){
    this.intervalo= setInterval(()=>{
      if(this.activo == true && this.posicion < 75){
        this.cambioContador()
      }
    }, 8000)
  }
  reiniciar(){
    this.balotas=this.balotas.map(ele=>{
      ele.estado=false
      return ele
    })
    this.activo=false
    this.numerosAle = []
    this.posicion =0;
    this.select= null;
    this.intervalo=null;
    this.generarAleatorio()
  }
  ganar(){
    this.gano=true
    this.audio.play()
    this.activo=false
  }
  continuarPartida(){
    this.gano = false
    this.audio.currentTime=0
    this.audio.pause()
  }
  render() {
    return html`
      ${ this.gano ? html`<div class="imagen" @click=${this.continuarPartida}></div>`:''}
      <div class="cuadroBingo borde-principal">
        <div class="titulo borde-principal">
          BIN-G <span class="circulo-grande" @click=${this.ganar}></span>
        </div>
        <div class="botones borde-principal">
          <div class="control">
            <div @click=${this.reiniciar}>
              <div @click=${this.reiniciar} style="border:none">Nueva partida</div>
            </div>
            <div>
              ${
                this.activo ? html`<svg @click=${this.cambio} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z"/></svg>` : html`<svg @click=${this.cambio} xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M16 37.85v-28l22 14Zm3-14Zm0 8.55 13.45-8.55L19 15.3Z"/></svg>`
              }
            </div>
          </div>
          <div class="balota-gigante">
            <div class="circulo-grande">${this.select != null ? this.select : ''}</div>
          </div>
          <div class="control-proceso">
            <div class="circulo-grande">${this.select != null ? this.select : ''}</div>
            <div class="circulo-grande">${this.select != null && this.posicion > 1 ? this.numerosAle[this.posicion-2] : ''}</div>
            <div class="circulo-grande">${this.select != null && this.posicion > 2 ? this.numerosAle[this.posicion-3] : ''}</div>
          </div>
        </div>
        <div class="cuadro-balotas borde-principal">
            <div class="balotas balotas-title">
              <div style="border:6px solid blue;">B</div>
              <div style="border:6px solid red;">I</div>
              <div>N</div>
              <div style="border:6px solid #0e3a0e;">G</div>
              <div style="border:6px solid yellow;">O</div>
            </div>
            <div class="balotas">
              ${this.balotas.map(ele=>{
                let numero = ele.numero < 10 ? '0'+ele.numero : ele.numero
                return html`<div class=${ele.estado ? "select" :""}>${numero}</div>`
              })}
            </div>
        </div>
      </div>
    `;
  }
  cambio(){
    this.activo = !this.activo
  }
  cambioContador(){
    let identificador = this.numerosAle[this.posicion]
    let posicion = this.balotas.findIndex(ele=> ele.numero == identificador)
    this.select = this.balotas[posicion].numero
    this.balotas[posicion].estado=true
    this.posicion = this.posicion+1
    asignarNumero(this.sala.code, this.select)
    this.dispatchEvent(new CustomEvent('hablar-bingo', {
      detail:{
        numero:this.select
      }
    }))
  }
  generarAleatorio(){
    let Xo =Date.now()
    let Xo2 = ""+Xo+""
    let Xo3 = []
    Xo3 =Xo2.split("")
    Xo3.shift()
    Xo3.shift()
    Xo3.shift()
    Xo = parseInt(Xo3.join(""))
    let a =1103515245
    let c =12345
    let m = 32768
    while(this.numerosAle.length < 75){
      let Xn=(a*Xo + c) % m
      Xo=Xn
      if(Xo <= 75 && Xo != 0){
          this.numerosAle.push(Xo)
      }
    }
  }
}

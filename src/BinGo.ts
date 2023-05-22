import { LitElement, html} from 'lit';
import './Components/SalaBingo';
import './Components/InicioBingo';
import './Components/NewSalaBingo';
import './Components/LoguearseBingo';
import './Components/TablaBingo';
import { property } from 'lit/decorators.js';
import { newBingo } from './services/bingoService';
//import { io } from 'socket.io-client';

export class BinGo extends LitElement {
  @property({type:Object}) visibles = {
    sala:false,
    inicio:true,
    newSala:false,
    loguearse:false,
    tablaBingo:false
  }
  @property({type:Object}) sala:any = null;
  @property({type:Object}) tabla:any = null;
  @property({type:String}) numeroSala:any = null;

  constructor(){
    super()
  }

  activarSeccion(keyActiva:string){
    let visibles = {...this.visibles}
    let keys = Object.keys(this.visibles);
    keys.forEach((ele)=> {
      if(ele === keyActiva ){
        //@ts-ignore
        visibles[ele] = true
      }else{
        //@ts-ignore
        visibles[ele] = false
      }
    })
    this.visibles = visibles
  }

  render() {
    return html`
        ${this.visibles.sala == true ? html`<sala-bingo @hablar-bingo=${this.hablar} .sala=${this.sala}/>` : ''}
        ${this.visibles.inicio ? html`<inicio-bingo @crear-sala=${this.crearSala} @loguearse-sala=${this.loguearseSala}/>` : ''}
        ${this.visibles.newSala ? html`<new-sala-bingo .sala=${this.sala} @continuar-sala=${()=>{this.activarSeccion("sala")}} />` : ''}
        ${this.visibles.loguearse ? html`<loguearse-bingo @logueado-event=${this.usuarioLogueado}/>` : ''}
        ${this.visibles.tablaBingo ? html`<tabla-bingo .tabla=${this.tabla.numerosTabla} .numeroSala=${this.numeroSala} @close=${()=> this.activarSeccion("inicio")} />` : ''}
      `;
  }
  async crearSala(){
    let bingo = await newBingo()
    if(bingo.code !== "error"){
      this.sala = bingo
      this.activarSeccion("newSala")
      return;
    }
    alert("Error al crear la sala")
  }
  loguearseSala(){
    this.activarSeccion("loguearse")
  }

  usuarioLogueado(e:any){
    this.tabla = e.detail.data
    this.numeroSala = e.detail.numeroSala
    this.activarSeccion("tablaBingo")
  }

  hablar(e:any){
    let n = e.detail.numero
    let mensaje = ""
    if(n <= 15){
      mensaje = "B, "+n
    }else if( n <= 30){
      mensaje = "I, "+n
    }else if( n <= 45){
      mensaje = "N, "+n
    }else if( n <= 60){
      mensaje = "G, "+n
    }else{
      mensaje = "O, "+n
    }

    //@ts-ignore
    responsiveVoice.speak(mensaje, "Spanish Female");
    setTimeout(()=>{
      //@ts-ignore
      responsiveVoice.speak(mensaje, "Spanish Female");
    },4000)
  }
}

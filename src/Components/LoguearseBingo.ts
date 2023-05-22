import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { icons } from '../utils/icons';
import { getTabla } from '../services/bingoService';

@customElement('loguearse-bingo')
export class LoguearseBingo extends LitElement {

  static styles = css`
    .inicio-sala{
      width:100%;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center
    }
    .inicio-sala>div{
      margin:10px;
      padding:20px;
      border-radius:5px;
      box-shadow:1px 1px 3px grey;
      cursor:pointer;
      background-color:white;
      color:white;
      font-size:20px;
      text-align:center;
      min-width:180px;
      user-select:none
    }
    .btn{
      margin:10px;
      padding:10px;
      border-radius:5px;
      box-shadow:1px 1px 3px grey;
      cursor:pointer;
      background-color:#008CFF;
      color:white;
      font-size:20px;
      text-align:center;
      min-width:180px;
      user-select:none
    }
    .btn:hover{
      box-shadow:0px 0px 0px grey
    }
    .input-text{
      margin:10px;
      padding:10px;
      border-radius:5px;
      box-shadow:1px 1px 3px grey;
      font-size:20px;
      text-align:center;
      min-width:180px;
      user-select:none
    }
    .content-img{
      text-align:center;
    }
    .content-img img{
      width:150px;
    }
  `;

  constructor(){
    super()
  }

  render() {
    return html`
      <article class="inicio-sala">
        <div>
          <div class="content-img">
          <img  src="${icons.bingo}" />
          </div>
          <input class="input-text" id="numeroSala" type="text" placeholder="Ingresa el número de sala">
          <div>
            <input type="button" @click=${this.loguearseSala} class="btn" value="Ingresar">
          </div>
        </div>
      </article>
    `;
  }

  loguearseSala(){
    const numeroSala = this.shadowRoot?.getElementById('numeroSala') as HTMLInputElement;
    if(numeroSala.value){
      getTabla(numeroSala.value).then((data)=>{
        console.log(data)
        if(data.numerosTabla.b.length>0){
          this.dispatchEvent(new CustomEvent('logueado-event', {
            detail:{
              data,
              numeroSala:numeroSala.value
            }
          }))
        }else{
          alert("El número de sala no existe")
        }
      })
    }
  }

}

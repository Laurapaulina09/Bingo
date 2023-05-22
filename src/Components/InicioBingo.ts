import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('inicio-bingo')
export class InicioBingo extends LitElement {

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
    .inicio-sala>div:hover{
      box-shadow:0px 0px 0px grey
    }
  `;

  constructor(){
    super()
  }

  render() {
    return html`
      <article class="inicio-sala">
        <div class="crear-sala" @click=${this.crearSala}>CREAR SALA</div>
        <div class="loguearse-sala" @click=${this.loguearseSala}>LOGUEARSE EN SALA</div>
      </article>
    `;
  }

  crearSala(){
    this.dispatchEvent(new CustomEvent('crear-sala', {
      detail:{}
    }))
  }

  loguearseSala(){
    this.dispatchEvent(new CustomEvent('loguearse-sala', {
      detail:{}
    }))
  }

}

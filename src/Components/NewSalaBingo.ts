import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("new-sala-bingo")
export class NewSalaBingo extends LitElement {
  @property({type:Object}) sala = {
    code:"Nombre de sala"
  };

  static styles = css`
    article{
      width:100%;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center
    }
  .card{
    width:300px;
    height:250px;
    background-color:#F8CECC;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    box-shadow:1px 1px 3px grey;
    gap:10px
  }
  .btn{
    margin:10px;
    padding:10px;
    border-radius:5px;
    box-shadow:1px 1px 3px grey;
    cursor:pointer;
    background-color:#008CFF;
    color:white;
    font-size:18px;
    text-align:center;
    min-width:180px;
    user-select:none
  }
  .btn:hover{
    box-shadow:0px 0px 0px grey
  }
  `
  constructor(){
    super()
  }
  render(){
      return html`
      <article>
        <section class="card">
          <div style="font-size:30px; font-weight:bold">
            ${this.sala.code}
          </div>
          <div class="btn" @click=${this.continuar}>
            CONTINUAR
          </div>
        </section>
      </article>
      `
  }

  continuar(){
    this.dispatchEvent(new CustomEvent('continuar-sala', {
      detail:{}
    }))
  }
}

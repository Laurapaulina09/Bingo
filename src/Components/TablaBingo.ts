import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
//@ts-ignore
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { icons } from '../utils/icons';
import { socket } from '../env/enviroment';

@customElement('tabla-bingo')
export class TablaBingo extends LitElement {
  socket = io(socket);
  static styles = css`
  .bingo-table {
    display: grid;
    grid-template-columns: repeat(5, 50px);
    grid-gap: 10px;
    font-family: Arial, sans-serif;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
  .bingo-cell {
    border: 1px solid #000;
    width: 50px;
    height: 50px;
    text-align: center;
    background-color: #f2f2f2;
    color: #000;
    font-size: 16px;
    user-select:none;
    cursor:pointer;
    border-radius:50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bingo-cell.selected {
    background-color: #ffcc00;
  }
  .title{
    font-weight:bold;
    font-size:20px;
    color:white;
  }
  article{
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .bingo-title{
    width:80px;
    height:80px;
    margin:20px auto;
    text-align:center;
    border:1px solid black;
    border-radius:50%;
    display:grid;
    grid-template-rows:3fr 1fr;
    padding:10px
  }
  .bingo-title>div:nth-child(1){
    font-size:35px;
    font-weight:bold;
    border-radius:50%;
    align-self:center;
  }
  .btn-error{
    width:185px;
    background-color:red;
    color:white;
    border-radius:5px;
    padding:10px;
    cursor:pointer;
    user-select:none;
    margin:15px auto;
    box-shadow:1px 1px 3px grey;
  }
  `;
  @property({ type: String }) numeroSala = '';
  @property({ type: String }) numeroActual = 'N';
  @property({ type: Array }) tabla = {
    b:[],
    i:[],
    n:[],
    g:[],
    o:[]
  };

  constructor(){
    super()
  }

  connectedCallback(){
    super.connectedCallback();

    this.socket.on(this.numeroSala, (data:any)=>{
      this.numeroActual = data;
    })

  }

  toggleCell(element: any) {
    element.target.classList.toggle('selected');
  }

  close(){
      this.dispatchEvent(new CustomEvent('close'))
  }

  render() {
    return html`
      <article>
        <section>
          <div class="bingo-title">
            <div>${this.numeroActual}</div>
            <div>BINGO</div>
          </div>
          <div class="bingo-table">
            <div class="bingo-cell title" style="background-color:red">B</div>
            <div class="bingo-cell title" style="background-color:#dddd00">I</div>
            <div class="bingo-cell title" style="background-color:green">N</div>
            <div class="bingo-cell title" style="background-color:blue">G</div>
            <div class="bingo-cell title" style="background-color:violet">O</div>
            ${
              this.tabla.b.map((numero:any, index:number)=>{
                return html`
                <div class="bingo-cell" @click=${(event:any)=> this.toggleCell(event)}>${this.tabla.b[index]}</div>
                <div class="bingo-cell" @click=${(event:any)=> this.toggleCell(event)}>${this.tabla.i[index]}</div>
                <div class="bingo-cell" @click=${(event:any)=> this.toggleCell(event)}>
                  ${index === 2 ? html`<img width="40px" src=${icons.teddy}/>` : this.tabla.n[index<2 ? index : index-1]}
                </div>
                <div class="bingo-cell" @click=${(event:any)=> this.toggleCell(event)}>${this.tabla.g[index]}</div>
                <div class="bingo-cell" @click=${(event:any)=> this.toggleCell(event)}>${this.tabla.o[index]}</div>
                `
              })
            }
          </div>
          <div class="btn-error" @click=${this.close}>ABANDONAR EL JUEGO</div>
        </section>
      </article>
    `;
  }

}


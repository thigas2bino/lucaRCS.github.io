import { HitBoxes } from "./Colision.js"
import { x,y } from "./main.js"
const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
let caixa = new Image()
caixa.onload = function (){
    cxt.drawImage(caixa,0,0)
}
caixa.src = 'images/CaixaDialogo.png'
class Criador_de_falas{
    constructor(fala,semana,place){
        this.fala = fala
        this.semana = semana
        this.place = place
    }
    escrita(place,but,semaena){
        if(this.place===place&&but&&semaena===this.semana){
            let text = ''
            cxt.drawImage(caixa,300,600)
            cxt.fillStyle = 'white'
            cxt.font = '23px comic Sans'
            for(let i in this.fala){
                for (let Lt in this.fala[i]) {
                    text+=this.fala[i][Lt]
                    cxt.fillText(text,300,600)
                }
            }
        }
    }
}
export {Criador_de_falas}
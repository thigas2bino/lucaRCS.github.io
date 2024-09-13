import { HitBoxes } from "./Colision.js"
import { x,y } from "./main.js"
import {text,escritaText} from './main.js'
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
    escrita(place,but,semaena,helper,x){
        if(this.place===place&&but&&semaena===this.semana){
            cxt.drawImage(caixa,300,600)
            cxt.fillStyle = 'white'
            cxt.font = '23px comic Sans'
            if (this.fala[x][helper]!==undefined) {
                escritaText(this.fala,x,helper)
            }
            cxt.fillText(text,350,650)
            return true
        }
        return false
    }
}
export {Criador_de_falas}
import { HitBoxes } from "./Colision.js"
import { interaction, x,y } from "./main.js"
import {text,escritaText,pressingM} from './main.js'

//decisions
let DECISIONS = []
if(localStorage.getItem('player')!== null){
    DECISIONS = JSON.parse(localStorage.getItem('player')).decisions
}

const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
const maxWidth = 490
const lineHeight = 30
let xPos = 350
let yPos = 650
let choice = false
let yes = false

let escritaTermina = false

let colaboration = false
let chager = (booleandes) => {colaboration = booleandes}
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

let caixa = new Image()
caixa.onload = function (){
    cxt.drawImage(caixa,0,0)
}
caixa.src = 'images/CaixaDialogo.png'
class Criador_de_falas{
    constructor(fala,semana,SINO){
        this.fala = fala
        this.semana = semana
        this.sino = SINO
    }
    escrita(but,helper,x){
        if(but){
            cxt.drawImage(caixa,300,600)
            cxt.fillStyle = 'white'
            cxt.font = '23px comic Sans'
            if(this.fala[x]===undefined){
                return false
            }
            if (this.fala[x][helper]!==undefined) {
                escritaText(this.fala,x,helper)
                yes = true
            }else{
                if (this.sino[x]) {
                    choice = true
                }
                if (pressingM[5]) {
                    escritaTermina = true
                }
            }
           wrapText(cxt, text, xPos, yPos, maxWidth, lineHeight);
            if (choice) {
                cxt.fillText('sim                                                      não',370,720)
                if(yes){
                    cxt.fillText('*',358,720)
                }else{
                    cxt.fillText('*',700,720)
                }
                if (pressingM[1]) {
                    yes = false
                }
                if(pressingM[0]){
                    yes = true
                }
                if (pressingM[5]) {
                    if (DECISIONS[3]!==true&&DECISIONS[2]!==undefined) {
                        DECISIONS[3] = yes
                    } else {
                        DECISIONS.push(yes)
                    }
                    if (DECISIONS[1]===false) {
                        DECISIONS[2]=false
                    }
                    choice = false
                    colaboration = true
                    escritaTermina = false
                    console.log(DECISIONS)
                }
            }
            return true
        }
        return false
    }
}
let chageMd = (bool) =>{choice = bool}
let escritaMD = (bool) =>{escritaTermina = bool}
export {Criador_de_falas,colaboration,chager,choice,chageMd,DECISIONS,escritaTermina,escritaMD}
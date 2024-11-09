import { HitBoxes } from "./Colision.js"
import { interaction, x,y } from "./main.js"
import {text,escritaText,pressingM,star} from './main.js'
import { start } from "./places.js"
//decisions
let THECISIONS = {
    dec: [],
    qua: [],
    qui: [],
    sex: []
}
let DECISIONS = THECISIONS.dec
if(localStorage.getItem('player')!== null){
    DECISIONS = JSON.parse(localStorage.getItem('player')).decisions.dec
    THECISIONS = JSON.parse(localStorage.getItem('player')).decisions
}
let chagf = function(tyz,yez){DECISIONS[yez]=tyz}
let TH = (k,a,b)=>{THECISIONS[k][a]=b}
const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
const maxWidth = 750
const lineHeight = 30
let xPos = 350
let yPos = 650
let choice = false
let yes = false
let check = false

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
    escrita(but,helper,x,tell=false){
        if(but&&star===false){
            check = true
            cxt.drawImage(caixa,300,600,800,250)
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
            if (choice&&star===false) {
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
                if (pressingM[5]&&tell===false) {
                    if (this.semana===1||this.semana===0) {
                        if (DECISIONS[3]!==true&&DECISIONS[2]!==undefined) {
                            DECISIONS[3] = yes
                        } else {
                            if (DECISIONS[8]!==undefined&&DECISIONS[8]===false) {
                                DECISIONS[8] = yes
                            }else{
                                DECISIONS.push(yes)
                            }
                        }
                        if (DECISIONS[1]===false) {
                            DECISIONS[2]=false
                        }
                        if (DECISIONS[6]===false) {
                            DECISIONS[7]=false
                        }
                        if (DECISIONS[10]===false) {
                            DECISIONS[11]=true
                        }if (DECISIONS[11]===true) {
                            DECISIONS[12]=false
                        }
                    }
                if (this.semana===2) {
                    THECISIONS.qua.push(yes)
                    console.log('test')
                }
                    choice = false
                    colaboration = true
                    escritaTermina = false
                }else{
                    if (tell===true&&pressingM[5]) {
                        choice = false
                        colaboration = true
                        escritaTermina = false
                    }
                }
            }
            return true
        }
        return false
    }
}
let chageMd = (bool) =>{choice = bool}
let escritaMD = (bool) =>{escritaTermina = bool}
export {Criador_de_falas,TH,colaboration,chager,choice,chageMd,DECISIONS,escritaTermina,escritaMD,check,chagf,THECISIONS}
const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
//quarto,cozinha,banheiro,sala,jardin,ponto,fora fabrica,cozinha fabrica,fabrica recepção,corredo fabrica,escritorio einar,HospitalFrente-Recepcao-Corredor,Hospital quarto
let room = [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
let y = 765
let x = 1360
let helperN= 1
let ani = 0
let animation_end = false
let anend = function(tyz){animation_end=tyz}
if(localStorage.getItem('player')!== null){
    room = JSON.parse(localStorage.getItem('player')).ro
}
class Places {
    constructor(src,ro,dx,dy,w,h,nFrames,sizeX,sizeY,telas) {
        this.src = src
        this.image = new Image()
        this.ro = ro
        this.dx = dx
        this.dy = dy 
        this.w = w
        this.h = h
        this.nFrames = nFrames
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.telas = telas
    }
    createImg(){
        this.image.onload = () => {
            if (room[this.ro]) {
                cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
            }
        }
        this.image.src = this.src
    }
    animeteImg(yes){
        {if(room[this.ro]){
            cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
        }
        if (yes===true) {
            cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
        }}
    }
    NPC(type1,type2,type3){
        if (type2!==0&&type3===undefined) {
            animation_end = false
            if (ani%7===0) {
                if (type1>=helperN&&helperN>=type2) {
                    helperN++
                } else {
                    helperN = type2
                }
                ani++
            }else{
                ani++
            }
        } else {
            if (ani%18===0) {
                if (type1>helperN&&helperN>=type2) {
                    helperN++
                } else {
                    helperN = type2
                    if (type3!==undefined) {
                        animation_end = true
                    }
                }
                ani++
            }else{
                ani++
            }
        }
        cxt.drawImage(this.image,this.sizeX*(helperN),0,this.sizeX,this.sizeY,this.dx,this.dy,this.w,this.h)
    }
    tells(typer){
            if (this.sizeX===undefined) {
                cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
            } else {
                cxt.drawImage(this.image,this.sizeX*(helperN),0,this.sizeX,this.sizeY,this.dx,this.dy,this.w,this.h)
                if (ani%7===0) {
                    if (helperN<=typer) {
                        helperN++
                        ani++
                    } else {
                        helperN = 0
                        ani++
                        animation_end = true
                    }
                }else{
                    ani++
                }
            }
    }
}

let quarto = new Places('images/quarto.png',0,0,0,x,y)
let quarto_cama= new Places('images/cama_quarto.png',0,0,0,x,y)
let cozinha = new Places('images/cozinha.png',1,0,0,x,y)
let banheiro = new Places('images/banheiro.png',2,0,0,x,y)
let sala = new Places('images/Sala.png',3,0,0,x,y)
let salaC = new Places('images/Sala_comp.png',3,0,70,x,y)
let jardin = new Places('images/jardin.png',4,0,0,x,y)
let ponto_de_onibus = new Places('images/ponto_de_onibus.png',5,0,0,x,y)
let fora_fabrica = new Places('images/fora_fabrica.png',6,0,0,x,y)
let cozinha_fabrica = new Places('images/cozinha_fabrica.png',7,0,0,x,y)
let fabrica_recepcao = new Places('images/fabrica_recepcao.png',8,0,0,x,y)
let corredor_fabrica = new Places('images/corredor_fabrica.png',9,0,0,x,y)
let escritorio_Einar = new Places('images/escritorio.png',10,0,0,x,y)
let Hospital_Frente = new Places('images/HospitalFrente.png',11,0,0,x,y)
let Hospital_Recepcao = new Places('images/HR.png',12,0,0,x,y)
let Hospital_Corredor = new Places('images/HospitalCorredor.png',13,0,0,x,y)
let Hospital_Quarto = new Places('images/HospitalQuarto.png',14,0,0,x,y)
let Casa_mae = new Places('images/casaMae.png',15,0,0,x,y)
let start = new Places('images/start.png',0,500,450,400,225)
let Acidia = new Places('images/ACIDIA.png',0,0,0,x,y,undefined,undefined,undefined,undefined)
let segunda = new Places('images/segunda.png',0,0,0,x,y,34,544,306)
let tersa = new Places('images/terça.png',0,0,0,x,y,25,544,306)
let Quarta = new Places('images/quarta.png',0,0,0,x,y,22,544,306)
let Quinta = new Places('images/Quinta.png',0,0,0,x,y,21,544,306)
let Sexta = new Places('images/Sexta.png',0,0,0,x,y,20,544,306)
let Sabado = new Places('images/Sabado.png',0,0,0,x,y,22,544,306)
let config = new Places('images/config.png',0,0,0,40,40)
config.createImg()
Sabado.createImg()
Sexta.createImg()
Quarta.createImg()
Quinta.createImg()
segunda.createImg()
Acidia.createImg()
start.createImg()
quarto.createImg()
cozinha.createImg()
banheiro.createImg()
sala.createImg()
salaC.createImg()
jardin.createImg()
ponto_de_onibus.createImg()
fora_fabrica.createImg()
cozinha_fabrica.createImg()
fabrica_recepcao.createImg()
corredor_fabrica.createImg()
quarto_cama.createImg()
escritorio_Einar.createImg()
Hospital_Corredor.createImg()
Hospital_Frente.createImg()
Hospital_Quarto.createImg()
Hospital_Recepcao.createImg()
Casa_mae.createImg()

export {Quarta,Casa_mae,config,Sabado,Sexta,salaC,Quinta,room,quarto,cozinha,banheiro,sala,jardin,ponto_de_onibus,fora_fabrica,cozinha_fabrica,fabrica_recepcao,corredor_fabrica,quarto_cama,escritorio_Einar,Places,animation_end,start,Acidia,anend,segunda,tersa,Hospital_Corredor,Hospital_Frente,Hospital_Quarto,Hospital_Recepcao}


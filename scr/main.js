const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
import {room,fundo1parte1,fundo1parte2,fundo2,fundo3parte1,fundo3parte2,Dialogardo} from "./places.js"
let pressingM = [false,false,false,false,1]
let introJumper = false
let interaction = false
//check dialog,armario,geladeira
let dialogs = [false,false,false]
let textBOX = ['armario','geladeira']
let BOXes = {
    'quarto':true,
    'banheiro':false,
    'cozinha':false
}
if(localStorage.getItem('player')!== null){
    BOXes = JSON.parse(localStorage.getItem('player')).Caixas
}
function CheckColisao(square1,square2){
    if (square1.point1!==undefined&&square1.point2!==undefined&&square1.point3!==undefined&&square1.point4!==undefined&&square2.point1!==undefined&&square2.point2!==undefined&&square2.point3!==undefined&&square2.point4!==undefined) {
        if(square1.point2[0]<square2.point1[0]||square1.point2[1]>square2.point4[1]||square1.point3[1]<square2.point1[1]||square1.point1[0]>square2.point2[0]){
            return false
        }else{
            return true
        }
    }else{
        console.log(square2)
    }
}
const screenW = document.documentElement.scrollWidth
const screenH = document.documentElement.scrollHeight
let x = 765
let y = 1360
canvas.height = x-20
canvas.width = y-20
const pressin = document.addEventListener('keydown',function(event){
    if(event.key === 'd'){
        pressingM[1] = true
    }if(event.key === 'a'){
        pressingM[0] = true
    }if(event.key === 'w'){
        pressingM[2] = true
    }if(event.key === 's'){
        pressingM[3] = true
    }if(event.key === ' '){
        introJumper = true
    }if (pressingM[4]%2!==0) {
        if(event.key==='i'){
            pressingM[4]++
            interaction = true
        }
    }
})

const upping = document.addEventListener('keyup',function(event){
    if(event.key ==='d'){
        pressingM[1] = false
    }if(event.key ==='a'){
        pressingM[0] = false
    }if(event.key ==='w'){
        pressingM[2] = false
    }if(event.key ==='s'){
        pressingM[3] = false
    }if(event.key==='i'){
        pressingM[4]++
    }
})
let frameX = 1
let frameM = 0
let frameFalse = 0
let estabilizador = 7
let estabilizador2 = 18

const personagem = new Image()
let personagemX = 0
let personagemY = 270
let personagemSpeed = 2
if(localStorage.getItem('player')!== null){
    personagemX = JSON.parse(localStorage.getItem('player')).peX
    personagemY = JSON.parse(localStorage.getItem('player')).peY
}
let player = {
    ro:room,
    peX:personagemX,
    peY:personagemY,
}
personagem.onload = function(){
    function animation(){
        cxt.clearRect(0,0,y,x)
        if (room[0]) {
            cxt.drawImage(fundo1parte1,0,0,y,x)
            cxt.drawImage(fundo1parte2,0,0,y,x)
        }if(room[1]){
            cxt.drawImage(fundo2,0,0,270,170,0,0,y,x)
        }if(room[2]){
            cxt.drawImage(fundo3parte1,0,0,y,x)
            cxt.drawImage(fundo3parte2,0,0,y,x)
        }
        cxt.fillStyle = 'rgba(0, 0, 0, 0)'
        cxt.fillRect(personagemX+100,personagemY+230,75,40)
        //hitbox info
        let HitboxInfo = {
            'point1':[personagemX+100,personagemY+230],
            'point2':[personagemX+175,personagemY+230],
            'point3':[personagemX+175,personagemY+270],
            'point4':[personagemX+100,personagemY+270]
        }
        cxt.drawImage(personagem,120*(frameX+frameM),0,120,120,personagemX,personagemY,280,280)
        for (let index = 0; index < personagemSpeed; index++) {
            if (dialogs[0]!==true) {
                if (personagemX<=y&&pressingM[0]!==true) {
                    if (pressingM[1]) {
                        frameM = 0
                        personagemX+=1
                    }
                }if (personagemX>=-60&&pressingM[1]!==true) {
                    if (pressingM[0]) {
                        frameM = 18                       
                        personagemX-=1
                    }
                }
                if (personagemY>=0&&pressingM[0]!==true&&pressingM[1]!==true&&pressingM[3]!==true) {
                    if (pressingM[2]) {
                        frameM = 12
                        personagemY-=1
                    }
                }if (personagemY<=x&&pressingM[0]!==true&&pressingM[1]!==true&&pressingM[2]!==true) {
                    if (pressingM[3]) {
                        frameM = 6 
                        personagemY+=1
                    }
                }
            }
        }
        if (frameFalse%estabilizador === 0) {
            if (frameM!==24) {
                if(frameX<5){
                    frameX++
                }else{
                    frameX = 0
                }
            }
        }
        if(pressingM[0]===false&&pressingM[1]===false&&pressingM[2]===false&&pressingM[3]===false||dialogs[0]){
            frameM = 24
            if (frameFalse%estabilizador2 == 0) {
                if(frameX<2){
                    frameX++
                }else{
                    frameX = 0
                }
            }
        }
        frameFalse++
        //quarto
        if(personagemX>= y-200 && room[0]){
            room[0] = false
            room[1] = true
            personagemX = -54
            BOXes.cozinha = true
            BOXes.quarto = false
        }
        if(personagemX<=-55 && room[0]){
            room[2] = true
            room[0] = false
            personagemX = y-201
            BOXes.banheiro = true
            BOXes.quarto = false
        }
        //cozinha
        if(personagemX<=-55 && room[1]){
            room[0] = true
            room[1] = false
            personagemX = y-201
            BOXes.cozinha = false
            BOXes.quarto = true
        }
        //banheiro
        if(personagemX>= y-200 && room[2]){
            room[2] = false
            room[0] = true
            personagemX = -54
            BOXes.banheiro = false
            BOXes.quarto = true
        }
        
        if(BOXes.quarto){
            cxt.fillRect(160,530,220,60)
            let QuartoArmario = {
            'point1':[160,530],
            'point2':[380,530],
            'point3':[380,590],
            'point4':[160,590]
            }
            if(CheckColisao(HitboxInfo,QuartoArmario)&&pressingM[4]%2===0&&dialogs[0]&&interaction){
                dialogs[0]=false
                dialogs[1]=false
                interaction = false
            }
            if(CheckColisao(HitboxInfo,QuartoArmario)&&pressingM[4]%2===0&&dialogs[0]!==true&&interaction){
                dialogs[0]=true
                dialogs[1]=true
                interaction = false
            }
            if(dialogs[0]){
                for (let i = 1; i < dialogs.length; i++) {
                    if (dialogs[i]) {
                        cxt.drawImage(Dialogardo,300,765-275,700,250)
                        cxt.fillStyle = 'white'
                        cxt.font = '23px comic Sans'
                        cxt.fillText(textBOX[i-1],355,765-200)
                    }
                }
            }
        }
        player.Caixas = BOXes
        player.ro = room
        player.peX = personagemX
        player.peY = personagemY
        localStorage.setItem('player',JSON.stringify(player))

    }
    let introHelper = 0
    let falseFrame = 0
    let intro = new Image()
    intro.onload = function(){
        cxt.drawImage(intro,80*introHelper,0,80,45,0,0,y,x)
        function introFun(){
            requestAnimationFrame(introFun)
            if (falseFrame%3==0) {
                cxt.drawImage(intro,80*introHelper,0,80,45,0,0,y,x)
                introHelper++
            }
            falseFrame++
            if(introHelper>=179||introJumper){
                cancelAnimationFrame(introFun)
                requestAnimationFrame(animation)
            }
        }
        introFun()
    }
    intro.src = 'images/intro.png'
    animation()
}
personagem.src = 'images/Personagem-andando.png'
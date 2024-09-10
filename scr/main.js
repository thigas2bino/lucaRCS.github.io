const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
import {room,quarto,cozinha,banheiro,sala} from "./places.js"
import { HitBoxes } from "./Colision.js"
import { Criador_de_falas} from "./talk.js"
let pressingM = [false,false,false,false,1]
let introJumper = false
let interaction = false
let interaction_jumper = false
let integrante = 0
let Falas_Geral = {
    Falas_Segunda : {
        Falas_Banheiro : new Criador_de_falas(['banheiro na segunda'],0,'banheiro'),
        Falas_Quarto : new Criador_de_falas(['quarto na segunda'],0,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],0,'cozinha'),
        Falas_Sala : new Criador_de_falas([],0,'sala'),
        Falas_Jardin : new Criador_de_falas([],0,'jardin'),
    },
    Falas_Terca : {
        Falas_Banheiro : new Criador_de_falas(['banheiro na terça'],1,'banheiro'),
        Falas_Quarto : new Criador_de_falas(['quarto na terça'],1,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],1,'cozinha'),
        Falas_Sala : new Criador_de_falas([],1,'sala'),
        Falas_Jardin : new Criador_de_falas([],1,'jardin'),
    },
    Falas_Quarta : {
        Falas_Banheiro : new Criador_de_falas([],2,'banheiro'),
        Falas_Quarto : new Criador_de_falas([],2,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],2,'cozinha'),
        Falas_Sala : new Criador_de_falas([],2,'sala'),
        Falas_Jardin : new Criador_de_falas([],2,'jardin'),
    },
    Falas_Quinta : {
        Falas_Banheiro : new Criador_de_falas([],3,'banheiro'),
        Falas_Quarto : new Criador_de_falas([],3,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],3,'cozinha'),
        Falas_Sala : new Criador_de_falas([],3,'sala'),
        Falas_Jardin : new Criador_de_falas([],3,'jardin'),
    },
    Falas_Sexta : {
        Falas_Banheiro : new Criador_de_falas([],4,'banheiro'),
        Falas_Quarto : new Criador_de_falas([],4,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],4,'cozinha'),
        Falas_Sala : new Criador_de_falas([],4,'sala'),
        Falas_Jardin : new Criador_de_falas([],4,'jardin'),
    },
    Falas_Sabado : {
        Falas_Banheiro : new Criador_de_falas([],5,'banheiro'),
        Falas_Quarto : new Criador_de_falas([],5,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],5,'cozinha'),
        Falas_Sala : new Criador_de_falas([],5,'sala'),
        Falas_Jardin : new Criador_de_falas([],5,'jardin'),
    },
    Falas_Domigo : {
        Falas_Banheiro : new Criador_de_falas([],6,'banheiro'),
        Falas_Quarto : new Criador_de_falas([],6,'quarto'),
        Falas_Cozinha : new Criador_de_falas([],6,'cozinha'),
        Falas_Sala : new Criador_de_falas([],6,'sala'),
        Falas_Jardin : new Criador_de_falas([],6,'jardin'),
    }
}

let trasiType = 0
//check dialog,armario,geladeira
let dialogs = [false,false,false]
let BOXes = {
    'quarto':true,
    'banheiro':false,
    'cozinha':false,
    'sala':false
}
if(localStorage.getItem('player')!== null){
    BOXes = JSON.parse(localStorage.getItem('player')).Caixas
}
const screenW = document.documentElement.scrollWidth
const screenH = document.documentElement.scrollHeight
let x = 765
let y = 1360
export {x,y}
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
        if (interaction) {
            interaction_jumper = true
        }
    }
    if(event.key==='e'){
        interaction = true
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
    }if (event.key === ' ') {
        interaction_jumper = false
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
let personagemSpeed = 3
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
        quarto.animeteImg()
        banheiro.animeteImg()
        cozinha.animeteImg()
        sala.animeteImg()
        cxt.fillStyle = 'rgba(0, 0, 0, 0)'
        cxt.fillRect(personagemX+100,personagemY+230,75,40)
        //hitbox info
        let HitboxInfo = new HitBoxes(personagemX+100,personagemY+230,75,40)
        if(room[0]||room[1]||room[2]||room[3]){
            cxt.fillStyle = 'rgba(0, 0, 0, 0)'
            cxt.fillRect(130,478,1100,20)
            let Quarto_parede = new HitBoxes(130,478,1100,20)
            if (HitboxInfo.Collider(Quarto_parede)) {
                pressingM[2] = false;
            }
        }
        if(room[0]){
            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(408,483,210,150)
            let Quarto_cama = new HitBoxes(408,483,210,150)


            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(167,240,210,310)
            let Quarto_ropa = new HitBoxes(167,240,210,310)

            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(625,440,100,100)
            let Quarto_banquinho = new HitBoxes(625,440,100,100)

            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(845,417,350,130)
            let Quarto_escrivaninha = new HitBoxes(845,417,350,130)

            cxt.fillStyle = 'rgba'
            cxt.fillRect(75,400,100,170)
            let Quarto_quina1 = new HitBoxes(75,400,100,170)

            switch (HitboxInfo.Sider(Quarto_quina1)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            cxt.fillStyle = 'rgba'
            cxt.fillRect(1200,400,100,170)
            let Quarto_quina2 = new HitBoxes(1200,400,100,170)

            switch (HitboxInfo.Sider(Quarto_quina2)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(Quarto_cama)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(Quarto_escrivaninha)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(Quarto_ropa)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(Quarto_banquinho)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }
        }
        if(room[1]){
            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(175,400,220,140)
            let cozinha_geladeira = new HitBoxes(175,400,220,140)

            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(405,390,730,150)
            let cozinha_pia_fogao = new HitBoxes(405,390,730,150)

            cxt.fillStyle = 'rgba'
            cxt.fillRect(75,400,100,170)
            let cozinha_quina1 = new HitBoxes(75,400,100,170)

            switch (HitboxInfo.Sider(cozinha_quina1)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            cxt.fillStyle = 'rgba'
            cxt.fillRect(1200,400,100,170)
            let cozinha_quina2 = new HitBoxes(1200,400,100,170)
            

            switch (HitboxInfo.Sider(cozinha_quina2)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(cozinha_geladeira)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            switch (HitboxInfo.Sider(cozinha_pia_fogao)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }
        }
        if(room[2]){
            cxt.fillStyle = 'rgba'
            cxt.fillRect(1122,403,110,134)
            let banheiro_planta = new HitBoxes(1122,403,110,134)

            switch (HitboxInfo.Sider(banheiro_planta)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            cxt.fillStyle = 'rgba(0,0,0,0)'
            cxt.fillRect(1200,400,200,170)
            let sala_quina2 = new HitBoxes(1200,400,200,170)

            switch (HitboxInfo.Sider(sala_quina2)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }
        }
        if(room[3]){
            cxt.fillStyle = 'rgba'
            cxt.fillRect(75,400,100,135)
            let sala_quina1 = new HitBoxes(75,400,100,135)

            switch (HitboxInfo.Sider(sala_quina1)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }

            cxt.fillStyle = 'rgba'
            cxt.fillRect(1200,400,100,170)
            let sala_quina2 = new HitBoxes(1200,400,100,170)
            

            switch (HitboxInfo.Sider(sala_quina2)) {
                case 'esquerda':
                    pressingM[1] = false;
                    break;
                case 'direita':
                    pressingM[0] = false;
                    break;
                case 'topo':
                    pressingM[3] = false;
                    break;
                case 'baixo':
                    pressingM[2] = false;
                    break;
                default:
                    break;
            }
        }
        cxt.drawImage(personagem,120*(frameX+frameM),0,120,120,personagemX,personagemY,280,280)
        for (let index = 0; index < personagemSpeed; index++) {
            if (dialogs[0]!==true) {
                if (personagemY>=0) {
                    if (pressingM[2]) {
                        frameM = 12
                        personagemY-=1
                    }
                }if (personagemY<=x) {
                    if (pressingM[3]) {
                        frameM = 6 
                        personagemY+=1
                    }
                }
                if (personagemX<=y) {
                    if (pressingM[1]) {
                        frameM = 0
                        personagemX+=1
                    }
                }if (personagemX>=-60) {
                    if (pressingM[0]) {
                        frameM = 18                       
                        personagemX-=1
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
        if(personagemX>= y-200 && room[0]&&trasiType===0){
            room[0] = false
            room[1] = true
            personagemX = -54
            BOXes.cozinha = true
            BOXes.quarto = false
        }
        if(personagemX<=-55 && room[0]&&trasiType===0){
            room[2] = true
            room[0] = false
            personagemX = y-201
            BOXes.banheiro = true
            BOXes.quarto = false
        }
        //cozinha
        if(personagemX<=-55 && room[1]&&trasiType===0){
            room[0] = true
            room[1] = false
            personagemX = y-201
            BOXes.cozinha = false
            BOXes.quarto = true
        }if(personagemX>= y-200 && room[1]&&trasiType===0){
            room[1] = false
            room[3] = true
            personagemX = -54
            BOXes.cozinha = false
            BOXes.sala = true
        }
        //banheiro
        if(personagemX>= y-200 && room[2]&&trasiType===0){
            room[2] = false
            room[0] = true
            personagemX = -30
            BOXes.banheiro = false
            BOXes.quarto = true
        }
        //sala
        if(personagemX<=-55 && room[3]&&trasiType===0){
            room[1] = true
            room[3] = false
            personagemX = y-201
            BOXes.cozinha = true
            BOXes.sala = false
        }
        
        let active = () => {
            for (const i in BOXes) {
                if(BOXes[i] === true){
                   return i
                }
            }
        }
        if(interaction_jumper){
            interaction = false
        }
        Falas_Geral.Falas_Segunda.Falas_Banheiro.escrita(active(),interaction,integrante)
        Falas_Geral.Falas_Segunda.Falas_Quarto.escrita(active(),interaction,integrante)
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
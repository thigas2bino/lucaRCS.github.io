const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
import {room,quarto,cozinha,banheiro,sala,jardin,ponto_de_onibus,fora_fabrica,cozinha_fabrica,fabrica_recepcao,corredor_fabrica, quarto_cama, escritorio_Einar} from "./places.js"
import { HitBoxes } from "./Colision.js"
import { Criador_de_falas,DECISIONS,chageMd,chager,choice,colaboration, escritaMD, escritaTermina} from "./talk.js"

let currentFala


//segunda acorda,cozinha
let cronologia = [true,false]
let cronos = false
let cronoslogos = [false,false]
let countdown = true

if(localStorage.getItem('player')!== null){
    cronologia = JSON.parse(localStorage.getItem('player')).Cronologia
    cronos = JSON.parse(localStorage.getItem('player')).Cronos
    cronoslogos = JSON.parse(localStorage.getItem('player')).Cronoslogos
}

let text = ''
let help = 0
let xbet = 0
const delay = 5
let escritaD = 0 
let pressingM = [false,false,false,false,1,false]
let introJumper = false
let interaction = false

let enterPlace = false

let interaction_jumper = false
let semana = 0
let Falas_Geral = {
    Falas_Segunda : {
        Falas_Banheiro : new Criador_de_falas(['lavar o rosto?','estou atrasado,não posso ficar parando agora','ja lavei meu rosto'],0,[true,false]),
        Falas_Quarto : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','voltar a dormir?','É, acho que vou ter que ir, não consigo dormir',"e lá vamos nós para um maravilhoso dia"],0,[false,false,false,true,false,false]),
        Falas_Cozinha : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','Einar está atrasado.Parar para tomar cafe da manhã?','Vou pegar algo rápido na geladeira, e já aproveito para preparar minha marmita','Preciso me apressar, não dá tempo de parar para comer agora','fazer marmita'],0,[false,false,false,false,true,false,false,true]),
        Falas_Sala : new Criador_de_falas(['estou atrasado,não posso ficar parando agora'],0,[false]),
        Falas_Jardin : new Criador_de_falas([],0,[]),
        Falas_Ponto : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],0,[]),
    },
    Falas_Terca : {
        Falas_Banheiro : new Criador_de_falas(['banheiro na terça'],1,[]),
        Falas_Quarto : new Criador_de_falas(['quarto na terça'],1,[]),
        Falas_Cozinha : new Criador_de_falas([],1,[]),
        Falas_Sala : new Criador_de_falas([],1,[]),
        Falas_Jardin : new Criador_de_falas([],1,[]),
        Falas_Ponto : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],1,[]),
    },
    Falas_Quarta : {
        Falas_Banheiro : new Criador_de_falas([],2,[]),
        Falas_Quarto : new Criador_de_falas([],2,[]),
        Falas_Cozinha : new Criador_de_falas([],2,[]),
        Falas_Sala : new Criador_de_falas([],2,[]),
        Falas_Jardin : new Criador_de_falas([],2,[]),
        Falas_Ponto : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],2,[]),
    },
    Falas_Quinta : {
        Falas_Banheiro : new Criador_de_falas([],3,[]),
        Falas_Quarto : new Criador_de_falas([],3,[]),
        Falas_Cozinha : new Criador_de_falas([],3,[]),
        Falas_Sala : new Criador_de_falas([],3,[]),
        Falas_Jardin : new Criador_de_falas([],3,[]),
        Falas_Ponto : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],3,[]),
    },
    Falas_Sexta : {
        Falas_Banheiro : new Criador_de_falas([],4,[]),
        Falas_Quarto : new Criador_de_falas([],4,[]),
        Falas_Cozinha : new Criador_de_falas([],4,[]),
        Falas_Sala : new Criador_de_falas([],4,[]),
        Falas_Jardin : new Criador_de_falas([],4,[]),
        Falas_Ponto : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],4,[]),
    },
    Falas_Sabado : {
        Falas_Banheiro : new Criador_de_falas([],5,[]),
        Falas_Quarto : new Criador_de_falas([],5,[]),
        Falas_Cozinha : new Criador_de_falas([],5,[]),
        Falas_Sala : new Criador_de_falas([],5,[]),
        Falas_Jardin : new Criador_de_falas([],5,[]),
        Falas_Ponto : new Criador_de_falas([],5,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],5,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],5,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],5,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],5,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],5,[]),
    },
    Falas_Domigo : {
        Falas_Banheiro : new Criador_de_falas([],6,[]),
        Falas_Quarto : new Criador_de_falas([],6,[]),
        Falas_Cozinha : new Criador_de_falas([],6,[]),
        Falas_Sala : new Criador_de_falas([],6,[]),
        Falas_Jardin : new Criador_de_falas([],6,[]),
        Falas_Ponto : new Criador_de_falas([],6,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],6,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],6,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],6,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],6,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],6,[]),
    }
}

let trasiType = 0
//check dialog,armario,geladeira
let dialogs = [false,false,false]
let BOXes = {
    'quarto':true,
    'banheiro':false,
    'cozinha':false,
    'sala':false,
    'jardin':false,
    'ponto':false,
    'foraFabrica':false,
    'cozinhaFabrica':false,
    'fabricaRecept':false,
    'corredorFabrica':false,
    'escritorio':false,
}
if(localStorage.getItem('player')!== null){
    BOXes = JSON.parse(localStorage.getItem('player')).Caixas
}
const screenW = document.documentElement.scrollWidth
const screenH = document.documentElement.scrollHeight
let x = 765
let y = 1360
let place = false
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
        enterPlace = true
    }
    if (event.key === 'Enter') {
        pressingM[5] = true
    }
    if(event.key ==='o'){
        place = true
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
    }if (event.key === 'Enter') {
        pressingM[5] = false
    }
    if(event.key ==='o'){
        place = false
    }
})
let frameX = 1
let frameM = 0
let frameFalse = 0
let estabilizador = 7
let estabilizador2 = 18

const personagem = new Image()
let personagemX = 528
let personagemY = 320
let personagemSpeed = 5
if(localStorage.getItem('player')!== null){
    personagemX = JSON.parse(localStorage.getItem('player')).peX
    personagemY = JSON.parse(localStorage.getItem('player')).peY
}
let player = {
    ro:room,
    peX:personagemX,
    peY:personagemY,
    decisions:DECISIONS,
    Cronologia:cronologia,
    Cronoslogos:cronoslogos,
    Cronos:cronos,
}
function escritaText(ObjetoDeFala,xes,helpea){
    if(escritaD%delay===0){
        if (ObjetoDeFala[xes]!==undefined&&text!==ObjetoDeFala[xes]) {
            text+=ObjetoDeFala[xes][helpea]
            console.log(ObjetoDeFala[xes])
        }
        help++
    }
    escritaD++
}
export{text,escritaText,pressingM,interaction}
personagem.onload = function(){
    function animation(){
        cxt.clearRect(0,0,y,x)

        if(place){
            console.log(personagemX)
            console.log(personagemY)
        }

        quarto.animeteImg()
        quarto_cama.animeteImg()
        banheiro.animeteImg()
        cozinha.animeteImg()
        sala.animeteImg()
        jardin.animeteImg()
        ponto_de_onibus.animeteImg()
        fora_fabrica.animeteImg()
        cozinha_fabrica.animeteImg()
        fabrica_recepcao.animeteImg()
        corredor_fabrica.animeteImg()
        escritorio_Einar.animeteImg()

        function colliderArson(roomT,which) {
            if (room[roomT]) {
                switch (HitboxInfo.Sider(which)) {
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
        }
        //some hitiboxes
        let sala_quina1 = new HitBoxes(75,400,100,135)
        let sala_quina2 = new HitBoxes(1200,400,200,170)
        let Quarto_cama = new HitBoxes(408,483,210,150)
        let Quarto_ropa = new HitBoxes(167,240,210,310)
        let Quarto_banquinho = new HitBoxes(625,440,100,100)
        let Quarto_escrivaninha = new HitBoxes(845,417,350,130)
        let Quarto_quina1 = new HitBoxes(75,400,100,170)
        let Quarto_quina2 = new HitBoxes(1200,400,100,170)
        let cozinha_geladeira = new HitBoxes(175,400,220,140)
        let cozinha_pia_fogao = new HitBoxes(405,390,730,150)
        let cozinha_quina1 = new HitBoxes(75,400,100,170)
        let cozinha_quina2 = new HitBoxes(1200,400,100,170)
        let jardin_quina1 = new HitBoxes(75,420,55,135)
        let jardin_cerca = new HitBoxes(0,479,2000,6)
        let ponto_ponto = new HitBoxes(0,484,2000,10)
        let fabrica_parede = new HitBoxes(0,478,2000,10)
        let mesa_fabrica_cozinha = new HitBoxes(0,450,177,300)
        let ponto_viagem = new HitBoxes(480,500,450,50)
        let porta_fabrica = new HitBoxes(540,500,520,50)
        let fabrica_recp = new HitBoxes(-100,550,320,50)
        let fabrica_recepição = new HitBoxes(220,500,940,140)
        let fabrica_reacep_parede1 = new HitBoxes(0,460,940,90)
        let fabrica_reacep_parede2 = new HitBoxes(1100,460,240,40)
        let parede_corredor = new HitBoxes(0,460,1340,40)
        let corredor_quina = new HitBoxes(1100,460,200,100)
        let porta_escritorio = new HitBoxes(465,480,220,80)
        let cozinha_fabrica_parede = new HitBoxes(100,500,1220,20)

        //hit interactions
        let Ponts_interest = {
            pia_banheiro : new HitBoxes(770,500,300,50,2,0),
            cama_quarto : new HitBoxes(400,500,300,180,0,0),
            privada_banheiro: new HitBoxes(470,500,200,80,2,1),
            guardaroupa_quarto: new HitBoxes(160,530,200,80,0,1),
            escrivania_quarto: new HitBoxes(850,520,350,70,0,2),
            geladeira_cozinha: new HitBoxes(160,520,250,70,1,0),
            pia_cozinha: new HitBoxes(610,520,250,70,1,1),
            fogao_cozinha: new HitBoxes(920,520,230,70,1,2),
            filtro_cozinha: new HitBoxes(430,520,150,70,1,3),
            televisao_sala: new HitBoxes(270,500,420,50,3,0),
        }
        cxt.fillStyle = 'red'
        cxt.fillRect(100,500,1220,20)
        //hitbox info
        let HitboxInfo = new HitBoxes(personagemX+100,personagemY+230,75,40)
        if(room[0]||room[1]||room[2]||room[3]){
            let Quarto_parede = new HitBoxes(130,478,1100,20)
            if (HitboxInfo.Collider(Quarto_parede)) {
                pressingM[2] = false;
            }
        }
        if(room[0]){

            colliderArson(0,Quarto_quina1)

            colliderArson(0,Quarto_quina2)

            colliderArson(0,Quarto_cama)

            colliderArson(0,Quarto_escrivaninha)

            colliderArson(0,Quarto_ropa)

            colliderArson(0,Quarto_banquinho)
        }
        if(room[1]){

            colliderArson(1,cozinha_quina1)

            colliderArson(1,cozinha_quina2)

            colliderArson(1,cozinha_geladeira)

            colliderArson(1,cozinha_pia_fogao)
        }
        if(room[2]){
            let banheiro_planta = new HitBoxes(1122,403,110,134)

            colliderArson(2,banheiro_planta)

            colliderArson(2,sala_quina2)
        }
        if(room[3]){

            colliderArson(3,sala_quina1)

            colliderArson(3,sala_quina2)
        }
        if(room[4]){
            
            colliderArson(4,jardin_quina1)

            colliderArson(4,jardin_cerca)
        }
        if (room[5]) {
            colliderArson(5,ponto_ponto)
        }
        if (room[6]) {
            colliderArson(6,fabrica_parede)
        }
        if (room[7]) {
            colliderArson(7,mesa_fabrica_cozinha)
            colliderArson(7,cozinha_fabrica_parede)
        }
        if(room[8]){
            colliderArson(8,fabrica_recepição)
            colliderArson(8,fabrica_reacep_parede1)
            colliderArson(8,fabrica_reacep_parede2)
        }
        if(room[9]){
            colliderArson(9,parede_corredor)
            colliderArson(9,corredor_quina)
        }
        if (interaction!==true&&cronos&&cronoslogos[0]&&cronoslogos[1]) {
            for (let index = 0; index < personagemSpeed; index++) {
                if (dialogs[0]!==true) {
                    if (personagemY>=0) {
                        if (pressingM[2]) {
                            frameM = 12
                            personagemY-=1
                        }
                    }if (personagemY<=x-200) {
                        if (pressingM[3]) {
                            frameM = 6 
                            personagemY+=1
                        }
                    }
                    if (personagemX<=y-200) {
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
        if(personagemX>= y-200 && room[0]&&trasiType===0&&countdown){
            room[0] = false
            room[1] = true
            personagemX = -54
            BOXes.cozinha = true
            BOXes.quarto = false
            if (DECISIONS[1]===undefined) {
                cronologia[1] = true
                console.log(cronologia[1])
                cronoslogos[0] = false
                cronoslogos[1] = false
                cronos = false
            }
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(personagemX<=-55 && room[0]&&trasiType===0&&countdown){
            room[2] = true
            room[0] = false
            personagemX = y-201
            BOXes.banheiro = true
            BOXes.quarto = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //cozinha
        if(personagemX<=-55 && room[1]&&trasiType===0&&countdown){
            room[0] = true
            room[1] = false
            personagemX = y-201
            BOXes.cozinha = false
            BOXes.quarto = true
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }if(personagemX>= y-200 && room[1]&&trasiType===0&&countdown){
            room[1] = false
            room[3] = true
            personagemX = -54
            BOXes.cozinha = false
            BOXes.sala = true
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //banheiro
        if(personagemX>= y-200 && room[2]&&trasiType===0&&countdown){
            room[2] = false
            room[0] = true
            personagemX = -30
            BOXes.banheiro = false
            BOXes.quarto = true
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //sala
        if(personagemX<=-55 && room[3]&&trasiType===0&&countdown){
            room[1] = true
            room[3] = false
            personagemX = y-201
            BOXes.cozinha = true
            BOXes.sala = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(personagemX>= y-200 && room[3]&&trasiType===0&&countdown){
            room[4] = true
            room[3] = false
            personagemX = -30
            BOXes.sala = false
            BOXes.jardin = true
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //jardin
        if(personagemX<=-55 && room[4]&&trasiType===0&&countdown){
            room[3] = true
            room[4] = false
            personagemX = y-201
            BOXes.sala = true
            BOXes.jardin = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(personagemX>= y-200 && room[4]&&trasiType===0&&countdown){
            room[5] = true
            room[4] = false
            personagemX = -30
            BOXes.ponto = true
            BOXes.jardin = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //ponto onibus
        if(personagemX<=-55 && room[5]&&trasiType===0&&countdown){
            room[4] = true
            room[5] = false
            personagemX = y-201
            BOXes.jardin = true
            countdown = false
            setTimeout(function(){countdown = true},1000)
            BOXes.ponto = false
        }
        if(ponto_viagem.Collider(HitboxInfo)&&enterPlace&&room[5]&&trasiType===0&&countdown){
            room[6] = true
            room[5] = false
            personagemX = -30
            BOXes.foraFabrica = true
            BOXes.ponto = false
            enterPlace = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //fora fabrica
        if(personagemX<=-55 && room[6]&&trasiType===0&&countdown){
            room[5] = true
            room[6] = false
            personagemX = y-201
            BOXes.ponto = true
            BOXes.foraFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(enterPlace&&porta_fabrica.Collider(HitboxInfo)&&room[6]&&countdown){
            room[8] = true
            room[6] = false
            personagemX = -30
            personagemY = 400
            BOXes.fabricaRecept = true
            BOXes.foraFabrica = false
            enterPlace = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //cozinha fabrica
        if(personagemX>= y-200 && room[7]&&trasiType===0&&countdown){
            room[9] = true
            room[7] = false
            personagemX = y-201
            BOXes.corredorFabrica = true
            BOXes.cozinhaFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //recepção fabrica
        if(fabrica_recp.Collider(HitboxInfo)&&enterPlace&& room[8]&&trasiType===0&&countdown){
            room[6] = true
            room[8] = false
            personagemX = y-201
            BOXes.foraFabrica = true
            BOXes.fabricaRecept = false
            enterPlace = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(personagemX>= y-200 && room[8]&&trasiType===0&&countdown){
            room[9] = true
            room[8] = false
            personagemX = -30
            BOXes.corredorFabrica = true
            BOXes.fabricaRecept = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //corredor fabrica
        if(personagemX<=-55 && room[9]&&trasiType===0&&countdown){
            room[8] = true
            room[9] = false
            personagemX = y-201
            BOXes.fabricaRecept = true
            BOXes.corredorFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(personagemX>= y-200 && room[9]&&trasiType===0&&countdown){
            room[7] = true
            room[9] = false
            personagemX = y-160
            BOXes.cozinhaFabrica = true
            BOXes.corredorFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if (porta_escritorio.Collider(HitboxInfo)&&room[9]&&enterPlace&&countdown) {
            room[10] = true
            room[9] = false
            personagemX = -30
            personagemY = 400
            enterPlace = false
            BOXes.escritorio = true
            BOXes.corredorFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //escritorio einar
        if(personagemX<=-55 && room[10]&&trasiType===0&&countdown){
            room[9] = true
            room[10] = false
            personagemX = 400
            personagemY = 295
            BOXes.corredorFabrica = true
            BOXes.escritorio = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }

        let current = () => {
            for (const a in room) {
                if(room[a]){
                    return parseInt(a)
                }
            }
        }
        let week = () => {
            for(const i in Falas_Geral){
                if (xbet===semana) {
                    xbet = 0
                    return Falas_Geral[i]
                }
                xbet++
            }
        }
        cxt.drawImage(personagem,242*(frameX+frameM),0,242,242,personagemX,personagemY,280,280)
        if(interaction_jumper||colaboration){
            interaction = false
            chager(false)
        }

        for (const a in Ponts_interest) {
            const element = Ponts_interest[a]
            if(element.room === current()){
                if(element.Collider(HitboxInfo)){
                    currentFala = element.num
                    console.log('test ')
                    break
                }else{
                    currentFala = null
                }
            }else{
                currentFala = null
            }
        }
        if(currentFala!==null){
            switch (current()) {
                //quarto
                case 0:
                    week().Falas_Quarto.escrita(interaction,help,currentFala)
                    break;
                //cozinha
                case 1:
                    if (currentFala===0) {
                        if (DECISIONS[1]&&DECISIONS[2]===undefined) {
                            week().Falas_Cozinha.escrita(interaction,help,7)
                        } else {
                            week().Falas_Cozinha.escrita(interaction,help,currentFala)
                        }
                    } else {
                        week().Falas_Cozinha.escrita(interaction,help,currentFala)
                    }
                    break;
                //banheiro
                case 2:
                    week().Falas_Banheiro.escrita(interaction,help,currentFala)
                    break;
                //sala
                case 3:
                    week().Falas_Sala.escrita(interaction,help,currentFala)
                    break;
                //jardin
                case 4:
                    week().Falas_Jardin.escrita(interaction,help,currentFala)
                    break;
                //ponto
                case 5:
                    week().Falas_Ponto.escrita(interaction,help,currentFala)
                    break;
                //fora fabrica
                case 6:
                    week().Falas_Fabrica_Frente.escrita(interaction,help,currentFala)
                    break;
                //cozinha fabrica
                case 7:
                    week().Falas_Fabrica_Cozinha.escrita(interaction,help,currentFala)
                    break;
                //fabrica recepção
                case 8:
                    week().Falas_Fabrica_Recepcao.escrita(interaction,help,currentFala)
                    break;
                //corredor fabrica
                case 9:
                    week().Falas_Fabrica_Corredor.escrita(interaction,help,currentFala)
                    break;
                default:
                    break;
            }
        }else{
            interaction = false
        }
        if (interaction!==true&&cronos) {
            help = 0
            text = ''
            chageMd(false)
            escritaMD(false)
        }

        if (cronologia[0]&&semana===0) {
            week().Falas_Quarto.escrita(true,help,3)
            if (DECISIONS[0]!==undefined) {
                cronologia[0] = false
                cronos = true
                cronoslogos[0] = true
            }
        }else{
            if (cronoslogos[0]&&cronoslogos[1]!==true&&cronologia[1]!==true) {
                console.log(cronologia[1]!==true)
                if (DECISIONS[0]) {
                    week().Falas_Quarto.escrita(true,help,4)
                    cronos = false
                    if (escritaTermina) {
                        cronoslogos[1] = true
                        cronos = true
                    }
                }else{
                    week().Falas_Quarto.escrita(true,help,5)
                    cronos = false
                    if (escritaTermina) {
                        cronoslogos[1] = true
                        cronos = true
                    }
                }
            }
        }

        if (cronologia[1]&&cronoslogos[0]===false) {
            week().Falas_Cozinha.escrita(true,help,4)
            if (DECISIONS[1]!==undefined) {
                cronos = true
                cronoslogos[0] = true
            }
        }else{
            if (cronoslogos[0]&&cronoslogos[1]!==true&&DECISIONS[1]!==undefined) {
                if (DECISIONS[1]) {
                    week().Falas_Cozinha.escrita(true,help,5)
                    cronos = false
                    if (escritaTermina) {
                        cronoslogos[1] = true
                        cronos = true
                    }
                }else{
                    week().Falas_Cozinha.escrita(true,help,6)
                    cronos = false
                    if (escritaTermina) {
                        cronoslogos[1] = true
                        cronos = true
                    }
                }
            }
        }
        enterPlace = false
        player.Caixas = BOXes
        player.ro = room
        player.peX = personagemX
        player.peY = personagemY
        player.Cronologia = cronologia
        player.decisions = DECISIONS
        player.Cronos = cronos
        player.Cronoslogos = cronoslogos
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
personagem.src = "images/personagem-andando.png"
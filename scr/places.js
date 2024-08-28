const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
//quarto,cozinha,banheiro
let room = [true,false,false]
let x = 765
let y = 1360
if(localStorage.getItem('player')!== null){
    room = JSON.parse(localStorage.getItem('player')).ro
}
let fundo1parte1 = new Image()
let fundo1parte2 = new Image()
fundo1parte1.onload = function(){
    if (room[0]) {
        cxt.drawImage(fundo1parte1,0,0,y,x)
    }
}
fundo1parte1.src = 'images/quarto-fundo.png'
fundo1parte2.onload = function(){
    if (room[0]) {
        cxt.drawImage(fundo1parte2,0,0,y,x)
    }
}
fundo1parte2.src = 'images/quarto-chao.png'
console.log(fundo1parte1+'  '+fundo1parte2)
let fundo2 = new Image()
fundo2.onload = function(){
    if(room[1]){
        cxt.drawImage(fundo2,0,0,270,170,0,0,y,x)
    }
}
fundo2.src = 'images/animacão-cozinha.png'
let fundo3parte1 = new Image()
let fundo3parte2 = new Image()
fundo3parte1.onload = function(){
    if(room[2]){
        cxt.drawImage(fundo3parte1,0,0,y,x)
    }
}
fundo3parte1.src = 'images/banheiro-fundo.png'
fundo3parte2.onload = function(){
    if(room[2]){
        cxt.drawImage(fundo3parte2,0,0,y,x)
    }
}
fundo3parte2.src = 'images/banheiro-chao.png'
let Dialogardo = new Image()
Dialogardo.onload = function(){
    cxt.drawImage(Dialogardo,500,500)
}
Dialogardo.src = 'images/caixa-de-dialogo.png'
export {room,fundo1parte1,fundo1parte2,fundo2,fundo3parte1,fundo3parte2,Dialogardo}
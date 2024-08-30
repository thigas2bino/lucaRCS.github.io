const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
//quarto,cozinha,banheiro,sala
let room = [true,false,false,false]
let y = 765
let x = 1360
if(localStorage.getItem('player')!== null){
    room = JSON.parse(localStorage.getItem('player')).ro
}
class Places {
    constructor(src,ro,dx,dy,w,h) {
        this.src = src
        this.image = new Image()
        this.ro = ro
        this.dx = dx
        this.dy = dy 
        this.w = w
        this.h = h
    }
    createImg(){
        this.image.onload = () => {
            if (room[this.ro]) {
                cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
            }
        }
        this.image.src = this.src
    }
    animeteImg(){
        if(room[this.ro]){
            cxt.drawImage(this.image,this.dx,this.dy,this.w,this.h)
        }
    }
}
let quarto = new Places('images/quarto.png',0,0,0,x,y)
let cozinha = new Places('images/cozinha.png',1,0,0,x,y)
let banheiro = new Places('images/banheiro.png',2,0,0,x,y)
let sala = new Places('images/Sala.png',3,0,0,x,y)

let Dialogardo = new Image()
Dialogardo.onload = function(){
    cxt.drawImage(Dialogardo,500,500)
}
Dialogardo.src = 'images/caixa-de-dialogo.png'



quarto.createImg()
cozinha.createImg()
banheiro.createImg()
sala.createImg()
export {room,quarto,cozinha,banheiro,sala,Dialogardo}
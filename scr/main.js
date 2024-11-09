const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
import {room,quarto,cozinha,banheiro,sala,jardin,ponto_de_onibus,fora_fabrica,cozinha_fabrica,fabrica_recepcao,corredor_fabrica, quarto_cama, escritorio_Einar,Places, animation_end,start,Acidia, segunda, anend, tersa, Einar} from "./places.js"
import { HitBoxes } from "./Colision.js"
import { Criador_de_falas,DECISIONS,TH,THECISIONS,chageMd,chager,chagf,check,choice,colaboration, escritaMD, escritaTermina} from "./talk.js"
//debug
const a = (c) => {console.log(c)}

let currentFala

let onibus = false

let star = true
let played = [false,false,false,false,false,false,false]
let temp = false
if(localStorage.getItem('player')!== null){
    if (JSON.parse(localStorage.getItem('player')).star!==undefined) {
        star = JSON.parse(localStorage.getItem('player')).stare
    }
    if (JSON.parse(localStorage.getItem('player')).playede!==undefined) {
        played = JSON.parse(localStorage.getItem('player')).playede
    }
}
played[0]=false
star = true 
let c = false

let pilha = [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
if(localStorage.getItem('player')!== null){
    pilha = JSON.parse(localStorage.getItem('player')).pilhas
    
}

//personagens NPC's
let nemo_pos = [0,0,function(x,y){nemo_pos[x]=y}]
let nemo = new Places('images/nemo-andando.png',10,nemo_pos[0],nemo_pos[1],330,330,27,240,240)
nemo.createImg()
//semanaes
let stop = true
//segunda acorda,cozinha,nemo,fumar uma
let cronologia = [true,false,false,false,false]
let cronos = false
let cronoslogos = [false,false]
let countdown = true
let dialogoHelper = 0
let heppen = {
    trabalhoS:true,
    chego:true,
    batipapo:false,
    batifim:false,
    nemo:false,
    fumando:true,
}

if(localStorage.getItem('player')!== null){
    cronologia = JSON.parse(localStorage.getItem('player')).Cronologia
    cronos = JSON.parse(localStorage.getItem('player')).Cronos
    cronoslogos = JSON.parse(localStorage.getItem('player')).Cronoslogos
}

let text = ''
let help = 0
let xbet = 0
const delay = 1
let escritaD = 0 
let pressingM = [false,false,false,false,1,false]
let introJumper = false
let interaction = false

let enterPlace = false

let interaction_jumper = false
let semana = 0
if(localStorage.getItem('player')!== null){
    semana = JSON.parse(localStorage.getItem('player')).SEMANA
}
let dialogos = {
    dialog1: new Criador_de_falas(['Nemo: Oi, Einar, como vc, tá?','Einar: o de sempre, e você?','Nemo: Estou bem, super bem, tive um excelente final de semana. Viajei bastante. E você, foi visitar a mamãe harpy hare como sempre?','Einar: Quê?','Nemo: Só quero puxar assunto mesmo, mas então, eu no sábado fui numa feira de antiguidades em outra cidade, foi incrível, até comprei algumas decorações para casa, também passei em uma livraria, até mesmo encontrei um novo livro para você.','Einar: sério mesmo? Qual livro você comprou?','Nemo: O mito de Sísifo, é de filosofia, fala um pouco sobre a falta de sentido na vida e na rotina, e como ou por que devemos continuar a viver apesar dessa falta','Einar: Não curto muito filosofia, mas parece interessante.','Nemo: Eu já cheguei a ler e é super a sua cara curte esse tipo de coisa, bem eu espero, se isso acontecer vou finalmente descobrir qual gênero de livro você gosta.','Einar: ah, mas eu nem sou chato pra esse tipo de coisa, você que não recomenda algo realmente bom, tipo aquele Diário de um banana','Nemo: Bém, acho que vou procurar algo nesse estilo, mas ainda vou tentar ampliar seu repertório, talvez você gostasse de ´´As vantagens de ser invisível´´','Einar: Já assisti o filme, só não sei se é a mesma coisa','Nemo: Eu acho o filme adaptado bem mais ou menos, mas já dá uma boa ideia do que se trata do livro','Einar: entendo, talvez eu leia, mas só talvez.','Nemo: Eu prometo a você, Einar , que um dia iria fazer você gostar de ler, juro pelo Zirgwè que tentarei isso.','Einar: boa sorte Nemo Santos'],0,[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]),
    dialog2: new Criador_de_falas(['Nemo: Ei cara, está tudo bem? Você não foi na cozinha hoje','Einar: Ah, sim, é que eu esqueci a marmita, por isso não passei lá','Nemo: Nossa é horrível quando isso acontece, mas não se preocupe, eu por acaso trouxe uma marmita a mais','Einar: por acaso? Sei','Nemo: Eu gosto de cozinhar e por acaso trouxe algumas comidinhas para dividir com o pessoal, toma aqui(Você recebe uma marmita)','Einar: uou, muito obrigado, já estava ficando com fome para ser sincero você sempre me salva nessas horas','Nemo: Não tem problema Einar, amigos são para isso, sempre pode contar comigo para qualquer coisa','Einar: Valeu, é bom ter um amigo como você.','Nemo: Então, como foi sua visita à mamãe harpy hare?','Einar: Harpy o que?','Nemo: Nada não, esquece. Te falta um pouco de cultura às vezes, Einar','Einar: Entendi. Inclusive, só avisando que vou ficar até mais tarde hoje','Nemo: Eita, você teve problemas com o chefinho? ','Einar: sim, digamos que eu cheguei um pouco atrasado hoje e ele não gostou muito.','Nemo: Eu tenho uma teoria que o chefinho só gosta de dinheiro e dele mesmo, qualquer coisa que foge disso ele odeia','Nemo: Tenho que ir, tchau el hermano','Einar; Tchau, até a próxima','Nemo: quase esqueci de falar, mas comprei um livro para tu(Você recebe um livro)'],0,[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]),
    fumando: new Criador_de_falas(['Mamãe Harpy hare? Conhecendo o Nemo, ele deve ter pego esse nome de alguma música ou livro.','*dá um trago no cigarro','De qualquer forma, se ele relacionou isso a ela, não deve ser coisa boa.'],0,[false,false,false]),
    dialog3: new Criador_de_falas(['Nemo: E aí, Einar? Tô vendo que hoje você trouxe sua marmita. A minha comida é tão ruim assim???','Einar: Ei, fica tranquilo, só acordei mais cedo hoje, aí fiz minha marmita para você não esquentar a cabeça comigo.','Nemo: Einar, eu gosto de cozinhar, então eu já acabo trazendo comida a mais sempre, e não me importo nem um pouco em dividir com você, especialmente se significar que você vai poder dormir mais, porque dá pra ver de longe essas suas olheiras','Einar: bom, obrigado, eu acho','Nemo: Cara, acho que você tá muito desanimado esses dias, a gente tem que marcar de sair pra levantar esse ânimo seu aí. Tá livre amanhã depois do trabalho?','Einar: Mas eu tô o mesmo de sempre, e precisa ser amanhã? Queria muito terminar de zerar o Terraria.','Nemo: Não, você não tá, eu tô sentindo, e olha que eu tenho propriedade pra falar isso depois de tantos anos te aturando. E claro que precisa ser amanhã! Já esqueceu que dia é amanhã?','Einar: se você diz.Mas o que tem amanhã de tão importante?','Nemo: O nosso encontro, claro!','Einar: …Tá bom então','Nemo: Então tá marcado, te vejo amanhã no almoço e depois do trabalho. Só lembra que já não estamos mais em 2024, então sem cigarros no nosso passeio de amanhã!','Einar: eu sei, mas nada me impede de fumar antes de ir, ninguém vai falar nada mesmo.','Nemo: Claro que vão, provavelmente vão nos barrar, eu sabia que você estava chegando bem antes de você entrar só sentindo o cheiro do seu cigarro.','Einar: não é pra tanto né, sei que fica um pouco do cheiro, mas não no nível que você tá falando','Nemo: Enfim, falou, Einar, te vejo amanhã','Einar: Até, tchau.'],1,[false]),
    dialog4: new Criador_de_falas(['Nemo: E aí, Einar, não te vi hoje na cozinha hoje, o que aconteceu?','Einar: só esqueci a marmita, mas acho que consigo aguentar, não tô com tanta fome.','Nemo: Cara, é sério isso? Depois de tantos anos de amizade e você vai mentir na cara dura?Não se preocupa que eu acabei me empolgando e trouxe mais comida hoje, toma aqui sua parte','Einar: Acho que não é empolgação, você quase sempre faz isso na verdade, mas bom, eu agradeço muito','Nemo: Não faço isso quase sempre… Só acontece de ser sempre que você esquece sua marmita.','Einar: então você faz mais por que sabe que eu esqueço?','Nemo: Já disse, tudo coincidência. E outra, eu também gosto de ajudar como posso, então se eu tô ajudando quando preparo seu almoço, com certeza vou continuar com isso. Aí você vai poder se concentrar em outras coisas, como dormir mais. Afinal essas suas olheiras já estão me dando pesadelos de tão grandes que elas estão!','Einar: Sei, coincidência. Mas enfim, muito obrigado, de novo. E sobre as olheiras, não é pra tanto vai.','Nemo: Claro que é, amanhã a gente vai sair depois do trabalho e você vai ver como as criancinhas saem correndo quando te veem','Einar: E desde quando que a gente vai sair que eu não to sabendo?','Nemo: Ora, desde agora, acabamos de combinar','Einar: ah… Odeio quando você faz isso.','Nemo: Se odiasse mesmo você não apareceria. Enfim, te vejo amanhã no almoço e depois do trabalho então, só lembra que já não estamos mais em 2024, então sem cigarros no nosso passeio de amanhã!','Einar: eu sei, mas nada me impede de fumar antes de ir, ninguém vai falar nada mesmo','Nemo: Claro que vão, provavelmente vão nos barrar, eu sabia que você estava chegando bem antes de você entrar só sentindo o cheiro do seu cigarro.','Einar: não é pra tanto né, sei que fica um pouco do cheiro, mas não no nível que você tá falando','Nemo: Enfim, falou, Einar, te vejo amanhã','Einar: Até, tchau.'],1,[false]),
    reflexao: new Criador_de_falas(['Bom, o passeio é só amanhã, então acho que não tem problema fumar agora','*dá um trago','Passeio… não poder fumar é o único problema de ter que sair, mas acho que dar uma pausa por um momento não é tão ruim, afinal, é pelo Nemo.','*se mantém fumando em silêncio'],1,[false]),
    insonia: new Criador_de_falas(['Mas que droga, não consigo pegar no sono.','*tenta dormir de novo','Eu tô tão cansado, só queria dormir um pouco…É, acho que as noites de jogatina tiveram seu preço.','*Tenta dormir até o horário que normalmente levanta.'],1,[false]),
    dialog5: new Criador_de_falas(['Não quero que o Nemo saiba que estou mal e fique preocupado. Mas se eu ficar aqui, ele vai vir me encontrar de qualquer forma','Nemo: Boa tarde, Einar, como você está? Fez muitas coisas produtivas hoje?','Einar: Ah, Nemo. Boa tarde, eu tô o mesmo de sempre, até que tá sendo um dia normal, consegui fazer algumas coisas.','Nemo: Ohh que bom que seu dia tá sendo tão produtivo quanto o meu. Inclusive, mudando completamente de assunto, você viu que essa semana a máxima não vai ficar abaixo de 40 graus?','Einar: Acho que não vi, mas bom, pelo menos a gente tem ar-condicionado aqui na fábrica.','Nemo: Meu Deus, Einar, você precisa se noticiar mais. Não é todo mundo que tem um ar-condicionado em casa, além de que não é meramente uma questão de sentir calor ou não. Tudo tem causa e consequência.','Einar: Ah, Nemo, vai se ferrar vai.','Nemo: Seu chico sin educación, às vezes esqueço que você é bem cabeça oca','Einar: Sem educação? É o que?','Nemo:  Esquece isso. Está tudo certo para hoje?','Einar: Ah, já ia me esquecendo, hoje vou estar ocupado depois do trabalho e não vou poder ir, foi mal.','Nemo: Aconteceu alguma coisa?','Einar: Tava pensando em ir ao médico','Nemo: Ahh, então é justificável você não ir, mas que bom finalmente você está se cuidando.','Einar: Sim, com certeza','Nemo: Boa consulta meu amigo, adeus','Einar: Obrigado, e até amanhã',],2,[false]),
    dialog51: new Criador_de_falas(['Não quero que o Nemo saiba que estou mal e fique preocupado. Mas se eu ficar aqui, ele vai vir me encontrar de qualquer forma','Nemo: Boa tarde, Einar, como você está? Fez muitas coisas produtivas hoje?','Einar: Ah, Nemo. Boa tarde, eu tô o mesmo de sempre, até que tá sendo um dia normal, consegui fazer algumas coisas.','Nemo: Ohh que bom que seu dia tá sendo tão produtivo quanto o meu.Inclusive, mudando completamente de assunto, você viu que essa semana a máxima não vai ficar abaixo de 40 graus?','Einar: Acho que não vi, mas bom, pelo menos a gente tem ar-condicionado aqui na fábrica.','Nemo: Meu Deus, Einar, você precisa se noticiar mais. Não é todo mundo que tem um ar-condicionado em casa, além de que não é meramente uma questão de sentir calor ou não. Tudo tem causa e consequência.','Einar: Ah, Nemo, vai se ferrar vai.','Nemo: Seu chico sin educación, às vezes esqueço que você é bem cabeça oca','Einar: Sem educação? É o que?','Nemo:  Esquece isso. Está tudo certo para hoje?','Einar: Ah, já ia me esquecendo, hoje vou estar ocupado depois do trabalho e não vou poder ir, foi mal.','Nemo: Aconteceu alguma coisa?','Einar: Tava pensando em  ir pra casa e descansar ou dormir um pouco, não tô muito bem.','Nemo: Ahh, então é justificável você não ir, mas que bom finalmente você está se cuidando.','Einar: Sim, com certeza',' bom trabalho meu amigo, adeus','Einar: Obrigado, e até amanhã'],2,[false]),
    fumandaQA: new Criador_de_falas(['Ufa, finalmente, mal podia esperar para poder fumar, pelo menos assim consigo descansar um pouco.','*dá um trago','hm? tem alguma coisa estranha, parece que meu cigarro não tá tão bom quanto antes, será que estragou?','*Experimenta o cigarro para testar o gosto','Não, não é isso, é algo a mais, ele parece mais amargo, mas não como se estivesse estragado, o gosto é um pouco mais fraco do que o normal, um pouco mais… sem sabor… um pouco mais…','…Vazio…','…','Vazio… Acho que essa é a palavra certa, meio sem gosto, meio indiferente, um pouco parecido com todo o resto da minha vida.','É, isso é uma merda, que graça minha vida vai ter se as coisas continuarem a perder o gosto é cor? Afinal, quando todos meus prazeres morrerem, eu não vou ter morrido também?','Não sei, se eu não sentir nada, eu vou ser um morto vivendo, e seu eu sentir dor com as coisas, então a morte,a não existência, será melhor que minha vida.','…','Talvez isso realmente faça algum sentido.','*Joga o cigarro no chão e apaga com o sapato.'],2,[false])
}

let Falas_Geral = {
    Falas_Segunda : {
        Falas_Banheiro : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora'],0,[false,false]),
        Falas_Quarto : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','voltar a dormir?','()É, acho que vou ter que ir, não consigo dormir',"e lá vamos nós para um maravilhoso dia"],0,[false,false,false,true,false,false]),
        Falas_Cozinha : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora3','Einar está atrasado.Parar para tomar cafe da manhã?','Vou pegar algo rápido na geladeira, e já aproveito para preparar minha marmita','Preciso me apressar, não dá tempo de parar para comer agora','fazer marmita'],0,[false,false,false,false,true,false,false,true]),
        Falas_Sala : new Criador_de_falas(['estou atrasado,não posso ficar parando agora','fumar alguns cigarros?','jogar um pouco?','jogar um pouquinho não mata ninguem né'],0,[false,true,true,false]),
        Falas_Jardin : new Criador_de_falas([],0,[]),
        Falas_Ponto : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['trabalhar?','já está na hora de almoçar?bom eu vou na cozinha esquntar minha marmita'],0,[true,false,false]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],0,[]),
    },
    Falas_Terca : {
        Falas_Banheiro : new Criador_de_falas(['1','2'],1,[false,false]),
        Falas_Quarto : new Criador_de_falas(['1','2','3','dormir?'],1,[false,false,false,true]),
        Falas_Cozinha : new Criador_de_falas(['Fazer marmita','2','3','Parar para tomar café da manhã?','não estou com fome','ja fiz a marmita'],1,[true,false,false,true,false,false]),
        Falas_Sala : new Criador_de_falas(['1','E lá vamos nós para mais um dia maravilhoso','Droga, não devia ter fumado, agora tenho que aguentar essa tosse maldita','Virar a noite jogando pode não ter sido uma boa, mas quem liga?','Tô acabado, mas acho que valeu a pena','jogar um pouco?'],1,[false,false,false,false,false,true]),
        Falas_Jardin : new Criador_de_falas([],1,[]),
        Falas_Ponto : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['trabalhar?','Vou para a copa, pelo menos não vai precisar dividir comigo dessa vez','Se eu for para a copa, o Nemo vai se sentir obrigado a dividir o almoço comigo. Melhor eu ficar por aqui mesmo.','acender um cigarro?'],1,[true,false,false,true]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],1,[]),
    },
    Falas_Quarta : {
        Falas_Banheiro : new Criador_de_falas(['1','2','lavar o rosto?','Cacete, eu tô completamente acabado, minhas olheiras estão realmente horríveis.Provavelmente deve ser por causa do meu sono, não durmo direito faz algum tempo, e nos últimos dias eu simplesmente não dormi.Talvez seja melhor ir no Hospital?','Ir ao médico, antes isso do que continuar não dormindo, mesmo que eu odeie ir lá.','Esperar um pouco, vai que passa né? E se não passar, talvez eu possa resolver sozinho, com algum chá ou algo assim.'],2,[false,false,true,true,false,false]),
        Falas_Quarto : new Criador_de_falas(['1','2','3','fumar?','jogar?','Bom, jogar só por hoje não faz mal, preciso relaxar um pouco no fim das contas.','Talvez fumar já seja o suficiente por essa noite, me sinto relaxado o suficiente.','Virar só mais uma noitezinha não parece uma má ideia.','Acho  melhor tentar dormir ao invés de jogar, ficar  só jogando durante a noite deve ser uma das coisas que está ferrando meu sono.'],2,[false,false,false,true,true]),
        Falas_Cozinha : new Criador_de_falas(['fazer marmita?','2','3','marmita feita','Ah, lembrei, tenho que fazer minha marmita, senão o Nemo vai precisar dividir a dele, e odeio quando ele precisa se preocupar com um peso a mais.'],2,[true,false,false,false,false,false]),
        Falas_Sala : new Criador_de_falas(['1','fumar?'],2,[false,true]),
        Falas_Jardin : new Criador_de_falas([],2,[]),
        Falas_Ponto : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas(['Einar está cansado e quer ir para casa jogar.Desistir da consulta?','Estou muito cansado agora eu vou amanhã'],2,[true]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['trabalhar?','ir para o refeitorio se encontrar com nemo?','Ah, tô a fim de ficar um pouco sozinho hoje, então vou almoçar aqui mesmo, se não vou ter que conversar com o Nemo.'],2,[true,true]),
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
let x = 765
let y = 1360
let place = false
export {x,y}
canvas.height = x-20
canvas.width = y-20
const clicking = document.addEventListener('click',function (event) {
    if (event.clientX>=500&&event.clientX<=900&&played[0]===false) {
        if (event.clientY>=400&&event.clientY<=525) {
            played[0] = true
            star = false
            temp = true
        }
    }
})
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
    if(event.key ==='c'){
        c = true
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
    if(event.key ==='c'){
        c = false
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
let personagemSpeed = 24
if(localStorage.getItem('player')!== null){
    personagemX = JSON.parse(localStorage.getItem('player')).peX
    personagemY = JSON.parse(localStorage.getItem('player')).peY
}
let player = {
    ro:room,
    peX:personagemX,
    peY:personagemY,
    decisions:THECISIONS,
    Cronologia:cronologia,
    Cronoslogos:cronoslogos,
    Cronos:cronos,
    SEMANA:semana,
    stare:star,
    playede:played,
}
function escritaText(ObjetoDeFala,xes,helpea){
    if(escritaD%delay===0){
        if (ObjetoDeFala[xes]!==undefined&&text!==ObjetoDeFala[xes]) {
            text+=ObjetoDeFala[xes][helpea]
            console.log(ObjetoDeFala[xes])
        }
        help++
        console.log(help)
    }
    escritaD++
}
export{text,escritaText,pressingM,interaction,star}
personagem.onload = function(){

    function animation(){
        cxt.clearRect(0,0,y,x)
        nemo = new Places('images/nemo-andando.png',10,nemo_pos[0],nemo_pos[1],330,330,27,240,240)
        if(place){
            console.log(personagemX)
            console.log(personagemY)
        }
        if (star===false) {
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
        }
        if (star&&played[0]===false) {
            if (true) {
                a()
                Acidia.createImg()
                start.createImg()
                Acidia.animeteImg(true)
                start.animeteImg(true)
            }
        }
        if (semana===0&&played[1]===false&&temp) {
            star = true
            segunda.createImg()
            if (played[0]) {
                segunda.tells(33)
                if (animation_end) {
                    played[1] = true
                    anend(false)
                    star = false
                }
            }
        }
        if (semana===1&&played[2]===false) {
            star = true
            tersa.createImg()
            if (played[1]) {
                tersa.tells(33)
                if (animation_end) {
                    played[2] = true
                    anend(false)
                    star = false
                }
            }
        }
        Einar.animeteImg(true)
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
        let mesa_fabrica_cozinha = new HitBoxes(1170,450,177,300)
        let ponto_viagem = new HitBoxes(480,500,450,50)
        let porta_fabrica = new HitBoxes(540,500,520,50)
        let ponto_volta = new HitBoxes(1050,470,150,150)
        let fabrica_recp = new HitBoxes(-100,550,320,50)
        let fabrica_recepição = new HitBoxes(220,500,940,140)
        let fabrica_reacep_parede1 = new HitBoxes(0,460,940,90)
        let fabrica_reacep_parede2 = new HitBoxes(1100,460,240,40)
        let parede_corredor = new HitBoxes(0,460,1340,40)
        let corredor_quina = new HitBoxes(1100,460,200,100)
        let porta_escritorio = new HitBoxes(465,480,220,80)
        let cozinha_fabrica_parede = new HitBoxes(100,500,1220,20)
        let parede_escritorio = new HitBoxes(100,500,1220,40)
        let escritorio_cadeira = new HitBoxes(650,500,140,80)
        let banheiro_quina = new HitBoxes()
        let porta_escrito = new HitBoxes(50,530,150,200)

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
            trabalhar: new HitBoxes(620,460,200,180,10,0),
        }
        //cxt.fillStyle = 'red'
        //cxt.fillRect(50,530,150,200)
        //hitbox info
        let HitboxInfo = new HitBoxes(personagemX+120,personagemY+260,85,50)
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
        if (room[10]) {
            colliderArson(10,parede_escritorio)
            colliderArson(10,escritorio_cadeira)
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
        if(pressingM[0]===false&&pressingM[1]===false&&pressingM[2]===false&&pressingM[3]===false||dialogs[0]&&heppen.fumando){
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
                cronoslogos[0] = false
                cronoslogos[1] = false
                cronos = false
            }
            if(semana===2&&pilha[20]){
                pilha[20] = false
                pilha[19] = false
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
        }if(personagemX>= y-200 && room[1]&&trasiType===0&&countdown&&pilha[19]){
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
            if (semana===1&&DECISIONS[8]) {
                pilha[15]=false
            }
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
            personagemX = 925
            BOXes.foraFabrica = true
            BOXes.ponto = false
            enterPlace = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //fora fabrica
        if(enterPlace&&ponto_volta.Collider(HitboxInfo) && room[6]&&trasiType===0&&countdown){
            room[5] = true
            room[6] = false
            personagemX = 559
            BOXes.ponto = true
            BOXes.foraFabrica = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(enterPlace&&porta_fabrica.Collider(HitboxInfo)&&room[6]&&countdown){
            room[8] = true
            room[6] = false
            personagemX = -30
            personagemY = 290
            BOXes.fabricaRecept = true
            BOXes.foraFabrica = false
            enterPlace = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //cozinha fabrica
        if(personagemX<= -55 && room[7]&&trasiType===0&&countdown){
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
            personagemX = 669
            personagemY = 241
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
            personagemX = -30
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
        if(porta_escrito.Collider(HitboxInfo)&&enterPlace && room[10]&&trasiType===0&&countdown){
            room[9] = true
            room[10] = false
            personagemX = 400
            personagemY = 295
            BOXes.corredorFabrica = true
            BOXes.escritorio = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(interaction!==true&&((porta_escrito.Collider(HitboxInfo)&&room[10])||(room[6]&&ponto_volta.Collider(HitboxInfo))||(porta_escritorio.Collider(HitboxInfo)&&room[9])||(fabrica_recp.Collider(HitboxInfo)&&room[8])||(porta_fabrica.Collider(HitboxInfo)&&room[6])||(ponto_viagem.Collider(HitboxInfo)&&room[5]))){
            cxt.fillStyle = 'white'
            cxt.font = '23px comic Sans'
            cxt.fillText('aperte (e) para interagir',700,730)
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
        if (star===false) {
            cxt.drawImage(personagem,242*(frameX+frameM),0,242,242,personagemX,personagemY,330,330)
        }
        if(interaction_jumper||colaboration){
            interaction = false
            chager(false)
        }
        if (stop) {
            nemo.createImg()
        }
        for (const a in Ponts_interest) {
            const element = Ponts_interest[a]
            if(element.room === current()){
                if(element.Collider(HitboxInfo)){
                    currentFala = element.num
                    break
                }else{
                    currentFala = null
                }
            }else{
                currentFala = null
            }
        }

        if(currentFala!==null){
            if(interaction!==true){
                cxt.fillStyle = 'white'
                cxt.font = '23px comic Sans'
                cxt.fillText('aperte (e) para interagir',700,730)
            }
            switch (current()) {
                //quarto
                case 0:
                    if (semana===1&&currentFala===0&&pilha[17]===false&&DECISIONS[12]!==true) {
                        week().Falas_Quarto.escrita(interaction,help,3)
                        break
                    }
                    week().Falas_Quarto.escrita(interaction,help,currentFala)
                    break;
                //cozinha
                case 1:
                    if (semana===0) {
                        if (currentFala===0) {
                            if (DECISIONS[1]&&DECISIONS[2]===undefined) {
                                week().Falas_Cozinha.escrita(interaction,help,7)
                                break
                            } else {
                                week().Falas_Cozinha.escrita(interaction,help,currentFala)
                                break
                            }
                        }
                    }
                    if (semana===1) {

                        if (currentFala===0&&DECISIONS[7]===undefined) {
                            if (DECISIONS[6]) {
                                week().Falas_Cozinha.escrita(interaction,help,currentFala)
                                break
                            } else {
                                week().Falas_Cozinha.escrita(interaction,help,4)
                                break
                            }
                        }if (DECISIONS[7]===true&&currentFala===0) {
                            week().Falas_Cozinha.escrita(interaction,help,5)
                            break
                        }else{
                            week().Falas_Cozinha.escrita(interaction,help,currentFala)
                            break
                        }
                    }
                    if (semana===2) {
                        if (currentFala===0&&((pilha[23]&&THECISIONS.qua[0])||(THECISIONS.qua[1]&&pilha[23]===false))) {
                            week().Falas_Cozinha.escrita(interaction,help,3)
                            break
                        }
                    }
                    week().Falas_Cozinha.escrita(interaction,help,currentFala)
                    break;
                //banheiro
                case 2:
                    if (semana===2) {
                        if (currentFala===0&&pilha[20]&&THECISIONS.qua[0]===undefined) {
                            week().Falas_Banheiro.escrita(interaction,help,2)
                            pilha[23] = false
                            break
                        }
                    }
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
                //escritorio
                case 10:
                    if (DECISIONS[2]=true&&DECISIONS[3]===undefined) {
                        chagf(false,3)
                    }
                    if (currentFala===0&&DECISIONS[3]!==undefined&&pilha[0]&&semana===0) {
                        interaction = false
                        heppen.nemo = true
                        pilha[0] = false
                        break;
                    }
                    if(semana===0&&DECISIONS[3]===true&&interaction===true&&heppen.nemo === false){
                        week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,true)
                        break
                    }
                    if(semana===1&&DECISIONS[8]===true&&interaction===true&&heppen.nemo === false){
                        week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,true)
                        break
                    }
                    if (semana===2&&currentFala===0&&((THECISIONS.qua[2]&&pilha[23])||(THECISIONS.qua[1]&&pilha[23]===false))) {
                        week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,true)
                        break
                    }
                    week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala)
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
            if (cronoslogos[0]&&cronoslogos[1]!==true&&cronologia[1]!==true&&semana===0) {
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
/*
codigo belo
((THECISIONS.qua[1]&&pilha[23])||(THECISIONS.qua[2]&&pilha[23]===false)) primera birfucação


*/
        if (cronologia[1]&&cronoslogos[0]!==true&&semana===0) {
            week().Falas_Cozinha.escrita(true,help,4)
            if (DECISIONS[1]!==undefined) {
                cronos = true
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                cronoslogos[0] = true
            }
        }else{
            if (cronoslogos[0]&&cronoslogos[1]!==true&&DECISIONS[1]!==undefined&&cronologia[2]===false&&semana===0) {
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
        if(DECISIONS[3]&&heppen.chego&&semana===0){
            if (DECISIONS[2]) {
                week().Falas_Fabrica_Escritorio.escrita(interaction,help,1)
                cronologia[2] = 0
                heppen.trabalhoS = false
            } else {
                cronologia[2] = 1
                heppen.trabalhoS = false
            }
        }
        if (cronologia[2]===0&&heppen.nemo&&semana===0) {
            if (room[7]&&personagemX>=300&&heppen.nemo) {
                if (heppen.chego) {
                    nemo_pos[0] = -40
                    nemo_pos[1] = personagemY
                    heppen.chego = false
                }
                if (nemo_pos[0]+148<personagemX) {
                    nemo_pos[0]+=2
                    nemo.NPC(7,3)
                }else{
                    nemo.NPC(2,0)
                    heppen.batipapo=true
                }
                cronos = false
            }
            if (heppen.batipapo) {
                dialogos.dialog1.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.dialog1.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog1.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.dialog1.fala.length) {
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        heppen.batipapo = false
                        cronos = true
                        dialogoHelper = 0
                        heppen.batifim = true
                        heppen.nemo = false
                    }
                }
            }
        }
        if (cronologia[2]===1&&heppen.nemo&&semana===0) {
            if (room[10]&&heppen.nemo) {
                if (heppen.chego) {
                    nemo_pos[0] = -40
                    nemo_pos[1] = personagemY
                    heppen.chego = false
                }if (nemo_pos[0]+148<personagemX) {
                    nemo_pos[0]+=2
                    nemo.NPC(7,3)
                }else{
                    nemo.NPC(2,0)
                    heppen.batipapo=true
                }
                cronos = false
            }
            if (heppen.batipapo&&semana===0) {
                dialogos.dialog2.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.dialog2.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog2.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.dialog2.fala.length) {
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        cronos = true
                        dialogoHelper = 0
                        heppen.batipapo = false
                        heppen.batifim = true
                        heppen.nemo = false
                    }
                }
            }
        }
        if (heppen.batifim&&semana===0) {
            if (nemo_pos[0]>-30) {
                nemo_pos[0]-=2
                nemo.NPC(26,21)
            }
        }
        if(cronologia[3]&&semana===0&&heppen.nemo===false){
            if (pilha[3]) {
                cronos = false
                if (current()===3&&pilha[2]) {
                    room[4] = true
                    room[3] = false
                    personagemX = -30
                    BOXes.sala = false
                    BOXes.jardin = true
                    countdown = false
                    setTimeout(function(){countdown = true},1000)
                    pilha[2] = false
                }else{
                    dialogos.fumando.escrita(true,help,dialogoHelper-1)
                    if (pressingM[5]) {
                        console.log(dialogoHelper)
                        if (dialogoHelper<3) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            dialogoHelper = 0
                            pilha[3] = false
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            cronos = true
                        }
                        pressingM[5] = false
                    }
                }
            }
        }
        if (heppen.trabalhoS===false&&pilha[1]&&current()===3&&pilha[3]&&semana===0) {
            Falas_Geral.Falas_Segunda.Falas_Sala.escrita(true,help,1)
            cronos = false
            if (DECISIONS[4]!==undefined) {
                cronologia[3] = true
                heppen.fumando = false
                pilha[1] = false
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                dialogoHelper = 0
            }
        }
        if(pilha[3]===false&&semana===0&&current()===3&&pilha[4]){
            cronos = false
            if (DECISIONS[5]===undefined) {
                Falas_Geral.Falas_Segunda.Falas_Sala.escrita(true,help,2)
            }else{
                if (pilha[5]) {
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                    dialogoHelper = 0
                    pilha[5] = false
                    console.log('execute')
                }
                /*Falas_Geral.Falas_Segunda.Falas_Sala.escrita(true,help,3)
                if (pressingM[5]) {
                    semana === 1
                    cronos = true
                    personagemX,personagemY = 295,289
                    pilha[4] = false
                }*/
               personagemX = 295
               personagemY = 289
               semana = 1
               cronos = true
               cronologia[4] = true
               played[1]=true
            }
        }
        if (BOXes.sala&&semana===1&&cronologia[4]) {
            cronos = false
            if (DECISIONS[4]&&DECISIONS[5]) {
                week().Falas_Sala.escrita(true,help,1)
            }else{
                if (DECISIONS[4]) {
                    week().Falas_Sala.escrita(true,help,2)
                }
                if (DECISIONS[5]) {
                    week().Falas_Sala.escrita(true,help,3)
                }
            }
            if (DECISIONS[4]!==true&&DECISIONS[5]!==true) {
                week().Falas_Sala.escrita(true,help,4)
            }
            if (pressingM[5]) {
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                dialogoHelper = 0
                cronos = true
                cronologia[4] = false
                pressingM[5] = false
            }
        }
        if (BOXes.cozinha&&pilha[6]&&semana===1) {
            cronos = false
            week().Falas_Cozinha.escrita(true,help,3)
            if (DECISIONS[6]!==undefined) {
                pilha[6] = false
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                dialogoHelper = 0
                cronos = true
            }
        }
        if (semana===1&&DECISIONS[8]===true&&pilha[7]) {
            cronos = false
            if (DECISIONS[7]) {
                week().Falas_Fabrica_Escritorio.escrita(true,help,1)
            }else{
                week().Falas_Fabrica_Escritorio.escrita(true,help,2)
            }
            if (pressingM[5]) {
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                dialogoHelper = 0
                cronos = true
                pressingM[5] = false
                pilha[7] = false
            }
        }
        if (semana===1&&DECISIONS[8]===true&&pilha[7]===false&&pilha[11]) {
            if (pilha[8]) {
                nemo_pos[0] = -40
                nemo_pos[1] = personagemY
                pilha[8] = false
            }
            if (DECISIONS[7]===false) {
                cronos = false
                if (pilha[10]) {
                    if (nemo_pos[0]+148<personagemX) {
                        nemo_pos[0]+=2
                        nemo.NPC(7,3)
                    }else{
                        nemo.NPC(2,0)
                        pilha[9] = false
                    }
                }
                if (pilha[9]===false&&pilha[10]) {
                    dialogos.dialog4.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.dialog4.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog4.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.dialog4.fala.length) {
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            pilha[10] = false
                        }
                    }
                }
            }else{
                if (BOXes.cozinhaFabrica&&personagemX>=340) {
                    cronos = false
                    if (pilha[10]) {
                        if (nemo_pos[0]+148<personagemX) {
                            nemo_pos[0]+=2
                            nemo.NPC(7,3)
                        }else{
                            nemo.NPC(2,0)
                            pilha[9] = false
                        }
                    }
                    if (pilha[9]===false&&pilha[10]) {
                        dialogos.dialog3.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.dialog3.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog3.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.dialog3.fala.length) {
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                                pilha[10] = false
                            }
                        }
                    }
                }
            }if (pilha[10]===false) {
                if (nemo_pos[0]>-30) {
                    nemo_pos[0]-=2
                    nemo.NPC(26,21)
                }else{
                    cronos = true
                }
            }
        }
        if (pilha[10]===false&&semana===1&&DECISIONS[8]===true&&pilha[15]===false) {
            pilha[11]= false 
            if(DECISIONS[9]===undefined){
                cronos=false
                week().Falas_Fabrica_Escritorio.escrita(true,help,3)
            }else{
                if (pilha[16]) {
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                    dialogoHelper = 0
                    pilha[16] = false
                }
                if (DECISIONS[9]) {
                    pilha[12]=false
                }else{
                    cronos=true
                }
            }
            if (DECISIONS[9]===false&&DECISIONS[10]===undefined&&BOXes.quarto) {
                cronos=false
                week().Falas_Fabrica_Escritorio.escrita(true,help,3)
            }else{
                if (DECISIONS[9]!==undefined) {
                    if (DECISIONS[9]===false&&DECISIONS[10]!==undefined&&BOXes.quarto) {
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                    }
                    if (DECISIONS[10]===true) {
                        pilha[12]=false
                    }
                }
            }
            if (pilha[12]===false&&pilha[14]) {
                if (true) {
                    room[4] = true
                    room[3] = false
                    room[0] = false
                    personagemX = -30
                    BOXes.sala = false
                    BOXes.quarto = false
                    BOXes.jardin = true
                    countdown = false
                    setTimeout(function(){countdown = true},1000)
                    cronos=false
                    if (pilha[14]) {
                        dialogos.reflexao.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.reflexao.fala.length&&pressingM[5]&&escritaTermina&&dialogos.reflexao.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.reflexao.fala.length) {
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                                pilha[14] = false
                            }
                        }
                    }
                }                
            }
        }
        if (pilha[14]&&semana===1&&BOXes.quarto&&DECISIONS[10]===false) {
            personagemX = 528
            personagemY = 320
            help = 0
            text = ''
            chageMd(false)
            escritaMD(false)
            dialogoHelper = 0
            semana = 2
            cronos=true
        }
        if (pilha[14]===false&&semana===1&&BOXes.sala) {
            cronos = false
            if (DECISIONS[11]===undefined) {
                week().Falas_Sala.escrita(true,help,5)
            }if (DECISIONS[11]=true) {
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                dialogoHelper = 0
                pilha[5] = false
                personagemX = 528
                personagemY = 320
                room[0] = true
                room[3] = false
                BOXes.quarto = true
                BOXes.sala = false
                countdown = false
                setTimeout(function(){countdown = true},1000)
                semana = 2
                cronos=true
            }else{
                pilha[17]=false
            }
        }
        if (DECISIONS[12]===true&&semana===1) {
            cronos=false
            dialogos.insonia.escrita(true,help,dialogoHelper)
            if (dialogoHelper<dialogos.insonia.fala.length&&pressingM[5]&&escritaTermina&&dialogos.insonia.fala[dialogoHelper]!==undefined) {
                dialogoHelper++
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
            }else{
                if (pressingM[5]&&dialogoHelper>=dialogos.insonia.fala.length) {
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                    dialogoHelper = 0
                    semana = 2
                    cronos=true
                }
            }
        }
        //Quarta
        if (semana===2) {
            if (pilha[20]===false&&pilha[21]) {
                cronos = false
                week().Falas_Cozinha.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos = true
                    pilha[21] = false
                    
                }
            }
            if (((THECISIONS.qua[0]&&pilha[23])||(THECISIONS.qua[1]&&pilha[23]===false))&&pilha[19]===false) {
                pilha[19] = true
            }
            if (pilha[23]===false&&THECISIONS.qua[0]&&pilha[22]) {
                cronos = false
                week().Falas_Banheiro.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos = true
                    pilha[22] = false
                }
            }
            if (pilha[23]===false&&THECISIONS.qua[0]&&pilha[22]===false&&pilha[24]) {
                cronos = false
                week().Falas_Banheiro.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos = true
                    pilha[24] = false
                }
            }
            if (pilha[23]===false&&THECISIONS.qua[0]===false&&pilha[22]===false&&pilha[24]) {
                cronos = false
                week().Falas_Banheiro.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos = true
                    pilha[24] = false
                }
            }
            if (((THECISIONS.qua[2]&&pilha[23])||(THECISIONS.qua[1]&&pilha[23]===false))&&pilha[25]) {
                cronos = false
                week().Falas_Fabrica_Escritorio.escrita(true,help,1)
                if (pressingM[5]) {
                    cronos = true
                    pilha[25] = false
                }
            }
            if (BOXes.cozinhaFabrica&&((THECISIONS.qua[3]&&pilha[23])||(THECISIONS.qua[2]&&pilha[23]===false))&&pilha[26]) {
                cronos = false
                if (nemo_pos[0]+148<personagemX) {
                    nemo_pos[0]+=2
                    nemo.NPC(7,3)
                }else{
                    nemo.NPC(2,0)
                    pilha[27] = false
                }
                if (pilha[27]===false&&pilha[23]) {
                        dialogos.dialog5.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.dialog5.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog5.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.dialog5.fala.length) {
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            pilha[27] = false
                        }
                    }
                }
                if (pilha[27]===false&&pilha[23]===false) {
                        dialogos.dialog51.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.dialog51.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog51.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.dialog51.fala.length) {
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            pilha[27] = false
                        }
                    }
                }
                if (pilha[27]&&semana===2) {
                    if (nemo_pos[0]>-30) {
                        nemo_pos[0]-=2
                        nemo.NPC(26,21)
                    }else{
                        pilha[26] = false
                    }
                }
            }
            if (((THECISIONS.qua[3]===false&&pilha[23])||(THECISIONS.qua[2]===false&&pilha[23]===false))&&pilha[28]) {
                week().Falas_Fabrica_Escritorio.escrita(true,help,2)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[28] = false
                }
            }
            if (BOXes.foraFabrica&&(pilha[28]===false||pilha[26]===false)&&pilha[23]&&pilha[29]) {
                week().Falas_Fabrica_Frente.escrita(true,help,0,true)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[29] = false
                }
            }
            if (BOXes.sala&&(pilha[28]===false||pilha[26]===false)&&pilha[30]) {
                week().Falas_Sala.escrita(true,help,1)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[30] = false
                }
            }
            if (BOXes.quarto&&((THECISIONS.qua[4]===false&&pilha[23])||(THECISIONS.qua[3]===false&&pilha[23]===false))&&pilha[31]) {
                week().Falas_Quarto.escrita(true,help,3)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[31] = false
                }
            }
            if (pilha[32]&&(((THECISIONS.qua[5]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))||((THECISIONS.qua[4]&&pilha[23])||(THECISIONS.qua[3]&&pilha[23]===false)))) {
                room[4] = true
                room[3] = false
                room[0] = false
                personagemX = -30
                BOXes.sala = false
                BOXes.quarto = false
                BOXes.jardin = true
                countdown = false
                setTimeout(function(){countdown = true},1000)
                cronos=false
                dialogos.fumandaQA.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.fumandaQA.fala.length&&pressingM[5]&&escritaTermina&&dialogos.fumandaQA.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.fumandaQA.fala.length) {
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                        pilha[32] = false
                    }
                }
                if (((THECISIONS.qua[4]&&pilha[23])||(THECISIONS.qua[3]&&pilha[23]===false))) {
                    if (pilha[23]) {
                        TH('qua',5,true)
                    }else{
                        TH('qua',4,true)
                    }
                }
            }
            if (BOXes.quarto&&((THECISIONS.qua[5]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))&&pilha[33]) {
                cronos = false
                week().Falas_Quarto.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos=true
                    pilha[33] = false
                }
            }
            if (BOXes.quarto) {
                if (((THECISIONS.qua[6]&&pilha[23])||(THECISIONS.qua[5]&&pilha[23]===false))&&pilha[34]) {
                    if (((THECISIONS.qua[5]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))) {
                            cronos = false
                        week().Falas_Quarto.escrita(true,help,5)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                        }
                    }else{
                        cronos = false
                        week().Falas_Quarto.escrita(true,help,6)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                        }
                    }
                }if(((THECISIONS.qua[6]===false&&pilha[23])||(THECISIONS.qua[5]===false&&pilha[23]===false))&&pilha[34]){
                    if (((THECISIONS.qua[5]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))) {
                        cronos = false
                        week().Falas_Quarto.escrita(true,help,7)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                        }
                    }else{
                        cronos = false
                        week().Falas_Quarto.escrita(true,help,8)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                        }
                    }
                }
            }
            if (pilha[34]===false) {
                help = 0
                text = ''
                chageMd(false)
                escritaMD(false)
                personagemX = 528
                personagemY = 320
                room[0] = true
                BOXes.quarto = true
                countdown = false
                setTimeout(function(){countdown = true},1000)
                semana = 3
                cronos=true
            }
        }
        enterPlace = false
        player.Caixas = BOXes
        player.ro = room
        player.peX = personagemX
        player.peY = personagemY
        player.Cronologia = cronologia
        player.decisions = THECISIONS
        player.Cronos = cronos
        player.Cronoslogos = cronoslogos
        player.pilhas = pilha
        player.SEMANA = semana
        player.stare = star
        player.playede = played
        localStorage.setItem('player',JSON.stringify(player))
        if (c) {
            console.log(cronologia)
            console.log(heppen)
            console.log(DECISIONS)
            console.log(pilha)
            console.log(semana)
            c = false
        }
        if(interaction===true&&text===''){
            interaction= false
        }
        /*if (semanaes_trick[0]===false&&semana===0) {
            stop = false
            semanaes.segunda.createImg()
            semanaes.segunda.NPC(0,34,true)
            if (animation_end) {
                semanaes_trick[0] = true
                stop = true
            }
        }*/
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
//dados:{"ro":[true,false,false,false,false,false,false,false,false,false,false],"peX":480,"peY":320,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[],"qui":[],"sex":[]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":true,"SEMANA":2,"stare":false,"playede":[true,true,true,false,false,false,false],"Caixas":{"quarto":true,"banheiro":false,"cozinha":false,"sala":false,"jardin":false,"ponto":false,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]}
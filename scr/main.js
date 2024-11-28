const canvas = document.getElementById('canva1')
const cxt = canvas.getContext('2d')
import {room,quarto,cozinha,banheiro,sala,jardin,ponto_de_onibus,fora_fabrica,cozinha_fabrica,fabrica_recepcao,corredor_fabrica, quarto_cama, escritorio_Einar,Places, animation_end,start,Acidia, segunda, anend, tersa, Quarta, Quinta, Hospital_Corredor, Hospital_Frente, Hospital_Quarto, Hospital_Recepcao, salaC, Sexta, config, Casa_mae} from "./places.js"
import { HitBoxes } from "./Colision.js"
import { Criador_de_falas,DECISIONS,TH,THECISIONS,chageMd,chager,chagf,check,choice,colaboration, escritaMD, escritaTermina} from "./talk.js"
//debug
const a = (c) => {console.log(c)}

let currentFala
let TrabHosp = true
if(localStorage.getItem('player')!== null&&JSON.parse(localStorage.getItem('player')).tab!==undefined){
    TrabHosp = JSON.parse(localStorage.getItem('player')).tab
}
let onibus = [false,false,false,false,false]
let perso = true
let onibusX = -900
let OnibusY = 97

let configs = false

let star = true
let played = [false,false,false,false,false,false,false,false,false]
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
let k = true

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
    dialog1: new Criador_de_falas(['Nemo: Oi, Einar, como você, tá?','Einar: o de sempre, e você?','Nemo: Estou bem, super bem. Tive um excelente final de semana. Viajei bastante.', 'Nemo: E você, foi visitar a mamãe harpy hare como sempre?','Einar: Quê?','Nemo: Poxa, pensei que você conhecesse considerando o tempo que você passa na internet.', 'Nemo: Mas enfim, no sábado eu dei um passeio na cidade vizinha e encontei uma ótima livraria.', 'Até mesmo encontrei um novo livro para você.','Einar: Sério mesmo? Qual livro você comprou?','Nemo: O mito de Sísifo. É de filosofia, fala um pouco sobre a falta de sentido na vida e na rotina, e como ou porquê devemos continuar a viver apesar dessa falta.', '*Você recebe um livro','Einar: Não curto muito filosofia, mas parece interessante.','Nemo: Eu já cheguei a ler e é super a sua cara curtir esse tipo de coisa.', 'Nemo: Bem eu espero, pelo menos. Um dia ainda vou descobrir qual gênero de livro você gosta.','Einar: Ah, mas eu nem sou chato pra esse tipo de coisa, você que não sabe recomendar livro.','Nemo: Não é como se você colaborasse, você se cansa de ler no primeiro capítulo!','Nemo: Mas sério, um dia ainda farei você gostar de ler, Einar.','Einar: boa sorte Nemo','*O sinal toca','Nemo: Enfim, hermano, tenho que ir agora, te vejo amanhã!'],0,[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]),
    dialog2: new Criador_de_falas(['Nemo: Ei cara, está tudo bem? Você não foi na cozinha hoje.','Einar: Ah, sim, é que eu esqueci a marmita, por isso não passei lá.','Nemo: Nossa, cara, de novo? Mas pode ficar tranquilo, eu por acaso trouxe uma marmita a mais','Einar: Por acaso?','Sei.','Nemo: Eu gosto de cozinhar, e por acaso trouxe uma marmita a mais. Toma aqui.','(Você recebe uma marmita)','Einar: Uou, muito obrigado, já estava ficando com fome para ser sincero.','Einar: Você sempre me salva nessas horas','Nemo: Sem problemas, Einar, amigos são para isso.','Einar: Valeu, é bom ter um amigo como você.','Nemo: Mas então, como foi seu fim de semana? Visitou a mamãe harpy hare?','Einar: Harpy o que?','Nemo: Nada não, esquece. Te falta um pouco de cultura às vezes, Einar','Einar: Entendi. Inclusive, só avisando que vou ficar até mais tarde hoje','Nemo: Eita, problemas com o chefinho? ','Einar: Só cheguei um pouco atrasado hoje mesmo e ele não gostou muito.','Nemo: Eu tenho uma teoria que o chefinho só gosta de dinheiro e dele mesmo, qualquer coisa que foge disso ele odeia','*O sinal toca','Nemo: Agora tenho que ir. Mas antes, já estava quase esquecendo, tenho um presente para você, espero que goste.','*Você recebe um livro', 'Nemo: Tchau hermano','Einar; Tchau, até a próxima, obrigado pelo livro.'],0,[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]),
    fumando: new Criador_de_falas(['Mamãe Harpy hare? Conhecendo o Nemo, ele deve ter pego esse nome de algum filme ou música.','*Dá um trago no cigarro','De qualquer forma, se ele relacionou isso a ela, não deve ser coisa boa.'],0,[false,false,false]),
    dialog3: new Criador_de_falas(['Nemo: E aí, Einar? Tô vendo que hoje você trouxe sua marmita.','Nemo: A minha comida é tão ruim assim???','Einar: Ei, fica tranquilo, só acordei mais cedo hoje, aí fiz minha marmita para você não esquentar a cabeça comigo.','Nemo: Einar, eu gosto de cozinhar, então eu já acabo trazendo comida a mais sempre, e não me importo nem um pouco em dividir com você, especialmente se significar que você vai poder dormir mais, porque dá pra ver de longe essas suas olheiras','Einar: Bom, obrigado, eu acho','Nemo: Cara, acho que você tá muito desanimado esses dias, a gente tem que marcar de sair pra levantar esse ânimo seu aí.','Tá livre amanhã depois do trabalho?','Einar: Mas eu tô o mesmo de sempre, e precisa ser amanhã? Queria muito terminar de zerar o Terraria.','Nemo: Não, você não tá, eu tô sentindo, e olha que eu tenho propriedade pra falar isso depois de tantos anos te aturando. E claro que precisa ser amanhã! Já esqueceu que dia é amanhã?','Einar: se você diz.Mas o que tem amanhã de tão importante?','Nemo: O nosso encontro, claro!','Einar: …Tá bom então','Nemo: Então tá marcado, te vejo amanhã no almoço e depois do trabalho. Só lembra que já não estamos mais em 2024, então sem cigarros no nosso passeio de amanhã!','Einar: eu sei, mas nada me impede de fumar antes de ir, ninguém vai falar nada mesmo.','Nemo: Claro que vão, provavelmente vão nos barrar, eu sabia que você estava chegando bem antes de você entrar só sentindo o cheiro do seu cigarro.','Einar: não é pra tanto né, sei que fica um pouco do cheiro, mas não no nível que você tá falando','Nemo: Enfim, falou, Einar, te vejo amanhã','Einar: Até, tchau.'],1,[false]),
    dialog4: new Criador_de_falas(['Nemo: E aí, Einar, não te vi hoje na cozinha hoje, o que aconteceu?','Einar: só esqueci a marmita, mas acho que consigo aguentar, não tô com tanta fome.','Nemo: Cara, é sério isso? Depois de tantos anos de amizade e você vai mentir na cara dura? Não se preocupa que eu acabei me empolgando e trouxe mais comida hoje, toma aqui sua parte','Einar: Acho que não é empolgação, você quase sempre faz isso na verdade, mas bom, eu agradeço muito','Nemo: Não faço isso quase sempre… Só acontece de ser sempre que você esquece sua marmita.','Einar: então você faz mais por que sabe que eu esqueço?','Nemo: Já disse, tudo coincidência. E outra, eu também gosto de ajudar como posso, então se eu tô ajudando quando preparo seu almoço, com certeza vou continuar com isso. Aí você vai poder se concentrar em outras coisas, como dormir mais. Afinal essas suas olheiras já estão me dando pesadelos de tão grandes que elas estão!','Einar: Sei, coincidência. Mas enfim, muito obrigado, de novo. E sobre as olheiras, não é pra tanto vai.','Nemo: Claro que é, amanhã a gente vai sair depois do trabalho e você vai ver como as criancinhas saem correndo quando te veem','Einar: E desde quando que a gente vai sair que eu não to sabendo?','Nemo: Ora, desde agora, acabamos de combinar','Einar: ah… Odeio quando você faz isso.','Nemo: Se odiasse mesmo você não apareceria. Enfim, te vejo amanhã no almoço e depois do trabalho então, só lembra que já não estamos mais em 2024, então sem cigarros no nosso passeio de amanhã!','Einar: eu sei, mas nada me impede de fumar antes de ir, ninguém vai falar nada mesmo','Nemo: Claro que vão, provavelmente vão nos barrar, eu sabia que você estava chegando bem antes de você entrar só sentindo o cheiro do seu cigarro.','Einar: não é pra tanto né, sei que fica um pouco do cheiro, mas não no nível que você tá falando','Nemo: Enfim, falou, Einar, te vejo amanhã','Einar: Até, tchau.'],1,[false]),
    reflexao: new Criador_de_falas(['Bom, o passeio é só amanhã, então acho que não tem problema fumar agora','*Dá um trago','Passeio… não poder fumar é o único problema de ter que sair, mas acho que dar uma pausa por um momento não é tão ruim, afinal, é pelo Nemo.','*se mantém fumando em silêncio'],1,[false]),
    insonia: new Criador_de_falas(['Mas que droga, não consigo pegar no sono.','*tenta dormir de novo','Eu tô tão cansado, só queria dormir um pouco… É, acho que as noites de jogatina tiveram seu preço.','*Tenta dormir até o horário que normalmente levanta.'],1,[false]),
    dialog5: new Criador_de_falas(['Nemo: Boa tarde, Einar, como você está? Fez muitas coisas produtivas hoje?','Einar: Ah, Nemo. Boa tarde, eu tô o mesmo de sempre, até que tá sendo um dia normal, consegui fazer algumas coisas.','Nemo: Ohh que bom que seu dia tá sendo tão produtivo quanto o meu. Inclusive, mudando completamente de assunto, você viu que essa semana a máxima não vai ficar abaixo de 40 graus?','Einar: Acho que não vi, mas bom, pelo menos a gente tem ar-condicionado aqui na fábrica.','Nemo: Meu Deus, Einar, você precisa se noticiar mais. Não é todo mundo que tem um ar-condicionado em casa, além de que não é meramente uma questão de sentir calor ou não. Tudo tem causa e consequência.','Einar: Ah, Nemo, vai se ferrar vai.','Nemo: Seu chico sin educación, às vezes esqueço que você é bem cabeça oca','Einar: Sem educação? É o que?','Nemo:  Esquece isso. Está tudo certo para hoje?','Einar: Ah, já ia me esquecendo, hoje vou estar ocupado depois do trabalho e não vou poder ir, foi mal.','Nemo: Aconteceu alguma coisa?','Einar: Tava pensando em ir ao médico','Nemo: Ahh, então é justificável você não ir, mas que bom finalmente você está se cuidando.','Einar: Sim, com certeza','Nemo: Boa consulta meu amigo, adeus','Einar: Obrigado, e até amanhã',],2,[false]),
    dialog51: new Criador_de_falas(['Nemo: Boa tarde, Einar, como você está? Fez muitas coisas produtivas hoje?','Einar: Ah, Nemo. Boa tarde, eu tô o mesmo de sempre, até que tá sendo um dia normal, consegui fazer algumas coisas.','Nemo: Ohh que bom que seu dia tá sendo tão produtivo quanto o meu.Inclusive, mudando completamente de assunto, você viu que essa semana a máxima não vai ficar abaixo de 40 graus?','Einar: Acho que não vi, mas bom, pelo menos a gente tem ar-condicionado aqui na fábrica.','Nemo: Meu Deus, Einar, você precisa se noticiar mais. Não é todo mundo que tem um ar-condicionado em casa, além de que não é meramente uma questão de sentir calor ou não. Tudo tem causa e consequência.','Einar: Ah, Nemo, vai se ferrar vai.','Nemo: Seu chico sin educación, às vezes esqueço que você é bem cabeça oca','Einar: Sem educação? É o que?','Nemo:  Esquece isso. Está tudo certo para hoje?','Einar: Ah, já ia me esquecendo, hoje vou estar ocupado depois do trabalho e não vou poder ir, foi mal.','Nemo: Aconteceu alguma coisa?','Einar: Tava pensando em  ir pra casa e descansar ou dormir um pouco, não tô muito bem.','Nemo: Ahh, então é justificável você não ir, mas que bom finalmente você está se cuidando.','Einar: Sim, com certeza',' bom trabalho meu amigo, adeus','Einar: Obrigado, e até amanhã'],2,[false]),
    fumandaQA: new Criador_de_falas(['Ufa, finalmente, mal podia esperar para poder fumar, pelo menos assim consigo descansar um pouco.','*dá um trago','hm? tem alguma coisa estranha, parece que meu cigarro não tá tão bom quanto antes, será que estragou?','*Experimenta o cigarro para testar o gosto','Não, não é isso, é algo a mais, ele parece mais amargo, mas não como se estivesse estragado, o gosto é um pouco mais fraco do que o normal, um pouco mais… sem sabor… um pouco mais…','…Vazio…','…','Vazio… Acho que essa é a palavra certa, meio sem gosto, meio indiferente, um pouco parecido com todo o resto da minha vida.','É, isso é uma merda, que graça minha vida vai ter se as coisas continuarem a perder o gosto é cor? Afinal, quando todos meus prazeres morrerem, eu não vou ter morrido também?','Não sei, se eu não sentir nada, eu vou ser um morto vivendo, e seu eu sentir dor com as coisas, então a morte,a não existência, será melhor que minha vida.','…','Talvez isso realmente faça algum sentido.','*Joga o cigarro no chão e apaga com o sapato.'],2,[false]),
    dialog6: new Criador_de_falas(['Nemo: Ei, cara! Tudo bom?','Einar: Opa, eae, tô bem sim, e você?','Nemo: Tô bem, mas então, como foi sua consulta ontem?','Einar: “Ele vai surtar se souber que eu não fui, é melhor eu nem contar.”Ah, foi até que bem.','Nemo: Entendi, e o médico te passou algo em específico? Tipo um medicamento ou algo para fazer, como exercícios físicos?','Einar: “rápido! Tenho que pensar em alguma coisa.”','Einar: Ele disse só o básico: não ficar usando o celular ou computador antes de dormir, me alimentar bem e essas coisas.','Nemo: Ahh, entendi, essas coisas são realmente importantes. Mas então, você fez alguma coisa depois do médico?','Einar: Só voltei pra casa na verdade.','Nemo: Beleza','Nemo: ...','Nemo: Então, ontem depois do trabalho, eu acabei testando uma nova receita de hambúrguer vegetariano, ficou incrível, na próxima eu trago para você. Aliás, você está viciado em alguma comida atualmente? ','Einar: Viciado? não sei se essa é a melhor palavra','Nemo: (rindo), é no sentido de algo que você comeu recentemente e quer comer todo o momento, por exemplo, meu atual amor é por hambúrguer vegetariano','Einar: Acho que minha comida favorita continua sendo strogonoff','Nemo: Uma ótima escolha, meu amigo','Einar: Eita, o tempo voou hoje, que droga.','Nemo: É mesmo, queria ter mais tempo para hablar com você, até mais hermano','Einar: Até, outra hora a gente conversa mais'],3,[]),
    dialog61: new Criador_de_falas(['Nemo: Ei Einar, como você está?','Einar: Tô que nem um passarinho Nemo, prestes a pular de um prédio.','Nemo: Caralho mano, tá acontecendo alguma coisa com você? Teu tom foi bem suspeito.','Einar: Nah, imagina, não tem nada acontecendo! pode ficar tranquilo','Nemo: Eita hermano, se acalma, só estou tentando conversar com você.','Einar: Mas eu tô completamente calmo.','Nemo: Se isso é o seu calmo, nem quero saber como é você de mau humor.','Einar: Mas eu tô completamente de boa','Nemo: Quer saber Einar, depois a gente conversa'],3,[]),
    onibuess: new Criador_de_falas(['Finalmente acabou!','Não via a hora para meu expediente acabar, pelo menos agora eu vou…chegar em casa, fumar, jogar ou ficar acordado a noite inteira.','Para então, quando eu finalmente dormir, não conseguir nem sequer descansar, porque opa! Já é a hora de mais um maravilhoso dia de trabalho!!!','Maravilhoso o c@ralho, só eu sei o quanto odeio essa rotina e essa minha vida incrivelmente patética!','Não consigo ser nem sequer um ser humano funcional, dependo de vícios para manter uma rotina que todo mundo segue tranquilamente, sem precisar de algo fútil como jogos ou cigarro!','Mas também chega a ser irônico, né?','Enquanto uso essas coisas para me sentir vivo, elas me matam pouco a pouco, minha tosse só piora, junto da minha insônia. Acho que foi esse o jeito que encontrei para me matar sem que minha mãe ou o Nemo ficassem se culpando…','O único problema nisso, é que não tá sendo tão efetivo quanto eu imaginava, achei que seria um processo mais rápido.','Se bem que… eu ainda posso tentar outra coisa…','Não, melhor não, acho que só devo apelar pra isso em último caso.'],3,[]),
    alivio: new Criador_de_falas(['suspira aliviado','Finalmente, já não tava aguentando mais ficar sem meu cigarro, ele é a fórmula mágica da felicidade.','se mantém fumando em silêncio','Acho que já é o suficiente, consegui aproveitar o que queria.'],3,[]),
    ligação_Hospicio: new Criador_de_falas(['Einar: Alô?','???: Olá, boa tarde, aqui é do hospital x, é com o senhor Einar que eu falo?','Einar: Sim, ele mesmo, do que se trata?','???: bom, me chamo Elisa, sou enfermeira da ala médica que a sua mãe está internada, e ela fez vários pedidos para falar com o senhor, e também nos passou o seu número.','Elisa: E é por isso que estamos te ligando, pois queremos confirmar se o senhor pode visitá-la, já que ela está nervosa faz alguns dias.','Einar: Ah, sim, consigo sim, avisa para ela que às 19h eu vou estar aí.','Elisa: Ok senhor Einar, muito obrigado por nos confirmar, uma boa noite.','Einar: Eu que agradeço por informar, uma ótima noite para você também.','Einar: “Certo, o que será que a mãe quer comigo agora?”','Einar: “De qualquer forma, acho melhor eu ir.”'],3,[]),
    conversa_norma: new Criador_de_falas(['Einar: Oi, mãe.','Alice: Filho, querido, finalmente você chegou. Por que demorou tanto? Foram aquelas enfermeiras malvadas que te proibiram de vir aqui mais cedo?','Einar: Não mãe, não começa, eu só tava trabalhando, elas não tem nenhuma culpa sobre isso.','Ah, sim, trabalhando. Parece que essa é a única coisa que você tem feito ultimamente, mal tem tempo pra me visitar… Assim você deixa a mamãe triste.Eu larguei tudo por você, Einar querido. Eu tive que abandonar a faculdade quando engravidei de você, e seu pai, aquele desgraçado… ','Einar: Chega! Eu já entendi isso há muito tempo, afinal você não consegue falar algo novo ou minimamente decente, é sempre sobre o quão maravilhosa e foda você foi para me criar e como eu sou um bosta por não “retribuir” esse favor, mas advinha? Você não fez nada mais do que sua obrigação, eu não pedi para nascer, me criar era sua responsabilidade, não um favor.','Alice: Filho… o que aconteceu com você? Meu querido, você mudou, antes você era mais bem comportado, e eu jamais quis que você pensasse que eu te achava um fardo. Einar, você sempre foi minha criança de ouro, tudo o que eu fiz foi com a intenção de te criar de forma que você não seguisse os passos do seu pai. Me desculpa se eu passei essa impressão, de verdade.','Einar: Ah sim, com toda certeza, a criança de ouro que você nunca quis ter, não é, mamãe?','Alice: O que… Eu… Digo, seu pai e eu não estávamos planejando te ter em uma idade tão jovem, então você tem que entender que às vezes eu ficava pensando em como minha vida seria se eu pudesse ter terminado minha faculdade. Mas isso só quando nos meus momentos mais baixos! Quando eu recuperava a razão, percebia que você na verdade era um presente que a vida me deu','Einar: Engraçado, você percebia que eu era um presente da vida, mas nunca chegou a pedir desculpas pelo que fez, nem sequer fez algo com o intuito de compensar isso! Vamos lá mãe, me diz logo, em algum momento da sua vida você chegou a realmente me amar?','Alice: Eu…'],3,[]),
    conversa_irra: new Criador_de_falas(['Einar: Oi, mãe.','Alice: Filho, querido, finalmente você chegou. Por que demorou tanto? Foram aquelas enfermeiras malvadas que te proibiram de vir aqui mais cedo?','Einar: Não mãe, não começa, eu só tava trabalhando, elas não tem nenhuma culpa sobre isso.','Alice: Ah, sim, trabalhando. Parece que essa é a única coisa que você tem feito ultimamente, mal tem tempo pra me visitar…Assim você deixa a mamãe triste.Eu larguei tudo por você, Einar querido. Eu tive que abandonar a faculdade quando engravidei de você, e seu pai, aquele desgraçado… Nos abandonando daquele jeito.E agora parece que você tá seguindo os passos dele. Tal pai, tal filho!','Einar: Ah, é mesmo? Entendi então.Mas sobre o que você quer falar? Me disseram que você tava um tanto nervosa.','Alice: Agora preciso de motivo para querer falar com meu filho, o único que me resta? Tá, tudo bem, já entendi, você não gosta mais de mim, né? Pode ir então, não me importo, essas paredes me farão mais companhia.','Einar: Mãe, não foi isso que eu quis dizer, mas se é assim que a senhora quer entender, tudo bem!','Alice: Ora, seu atrevido, quando é que você aprendeu a falar assim? Aposto que foi com aquele refugiado, que se finge de bonzinho mas roubou sua promoção.','Einar: O nome dele é Nemo, para início de conversa, e acho bom você se referir a ele com mais respeito, e ele sequer é imigrante. Além disso, em poucos anos ele me ajudou e me apoiou mais do que você durante minha vida inteira.','Alice: É mesmo? E quem que tinha que trabalhar em dois empregos e ainda te ajudar com as tarefas de casa?E quem te amparou quando você chegou chorando na minha porta mês passado?E quem estava do seu lado, te apoiando, quando você tentou se matar em uma idade tão jovem?','Einar: …','Einar: É, ele não estava lá.“Ninguém estava…”'],3,[]),
    refletir1:new Criador_de_falas(['Acho que, pensando bem, eu não devia ter falado aquilo para ela.','Em partes ela tava realmente certa, e esse é o maior problema.','O Nemo realmente não estava lá nos momentos que ela citou, mas ela também não estava presente na maior parte do tempo.','Não só ela na verdade, meu pai, meus ex-amigos, todo mundo.','Será que ninguém tem algum motivo para ficar ou, todos tem sempre um motivo para ir embora?','Talvez ter que conviver comigo seja um bom motivo para cair fora, afinal, não sou alguém que os outros gostariam de manter por perto.','É, pior que isso faz um pouco de sentido…','Ah, meu ponto chegou.'],3,[]),
    refletir2:new Criador_de_falas(['…que sensação, estranha?','Me sinto incrivelmente leve agora, é como se eu tivesse tirado um peso gigante das costas, o qual eu já estava carregando há muito tempo.','Acho que falar aquilo tudo com ela foi algo necessário, não aguento mais ter que ouvir as reclamações e humilhações dela.','Bom, agora pode ser que alguma coisa mude, nunca bati de frente com ela desse jeito antes, então é possível que ela se toque o quão desprezível é isso.','e mesmo que ela não mude nada, não importa, pelo menos agora eu sei que tenho algum resquício de voz para me impor contra o que ela fala, o que pode ser bom, eu acho.','Ah, meu ponto chegou.'],3,[]),
    ligação_Hospicio2: new Criador_de_falas(['Elisa: Alô? Senhor Einar?','Einar: Alô, boa tarde, com quem eu falo?','Elisa: Sou a enfermeira do hospital, Elisa, aquela que ligou para o senhor ontem.','Einar: Ah sim, me lembro de ontem.Inclusive, aconteceu alguma coisa? Não é todo dia que o hospital liga para mim.','Elisa: Bom senhor Einar, é sobre sua mãe, ela teve uma piora repentina, e acabou tendo algumas paradas cardíacas, mas pode ficar tranquilo senhor, ela já está sendo encaminhada para a cirurgia, no entanto, ainda existe a possibilidade de sua mãe precisar de um acompanhante, o senhor poderia vir aqui?','Einar: …','Elisa: Senhor Einar? Ainda está aí?','Einar: Ah… Sim, sim, eu estou, só… espera um pouquinho, vou me arrumar e em breve eu estarei no hospital.','Elisa: Ok senhor, muito obrigado pela compreensão, sua mãe ficará bem, pode contar com a gente.','Einar: Certo… Muito obrigado.','…','*A enfermeira desliga a ligação.'],4,[]),
    Cirurgico: new Criador_de_falas(['Einar: Olá, boa tarde, eu sou o Einar, me ligaram agora pouco avisando sobre a cirurgia da minha mãe, Alice, e me pediram para vir aqui assinar alguns papéis.','Elisa: Olá senhor Einar, boa tarde, eu sou a Elisa, eu que conversei com você no telefone. Bem, temos que conversar.','Einar: A minha mãe está bem? Aconteceu alguma complicação?','Elisa: A senhora Alice teve uma piora desde que te liguei, então o cirurgião responsável pelo caso decidiu pela falta de gravidade da situação fazer a cirurgia sem acompanhante, você pode sentar se quiser.','Einar: Está bem, obrigado'],4,[]),
    conversa_desconhecida: new Criador_de_falas(['???: Ei moço, tá tudo bem? Você parece um pouco preocupado com algo.','Einar: Eu não sei, acabei de ficar sabendo que minha mãe vai passar por um cirurgia de risco, e estou com medo do que pode acontecer.','???: Sua mãe parece ser uma pessoa bem importante pra você.','Einar: É, até certo ponto ela é sim importante, mesmo que tenha algumas coisas um tanto questionáveis sobre ela.','???: Quer conversar sobre isso? Digo, não sei se te incomoda falar com uma total desconhecida sobre assuntos tão pessoais assim, mas caso se sinta à vontade, ficaria feliz de ouvir. Pelo menos pra mim, ajuda bastante falar com alguém, me ajuda a pôr os pensamentos em ordem.','Einar: Sinceramente não tenho hábito de falar, talvez seja difícil, mas gostaria de tentar.','???: Vai no seu ritmo, eu também estou esperando alguém e ainda vai demorar, então posso esperar o tempo que for necessário.','Einar: Bom, sendo sincero, minha mãe nunca foi um bom exemplo de figura materna, ela vivia fumando e quase nunca estava sóbria.','Einar:Acho que acabei adquirindo alguns hábitos ruins dela, e eu meio que a culpo e a odeio por isso, mas mesmo assim eu tenho medo de perder ela. Não sei o que seria de mim sem ela, e dela sem mim.','???: E você teve e está tendo que lidar com toda essa confusão sozinho?','Einar: Sim, meu pai deixou a gente quando eu era muito novo, e ter que aguentar minha mãe depois da partida dele não foi algo fácil, por assim dizer. Ela me machucou muito, e no entanto, não consigo deixar de amá-la completamente.','???: É possível amar uma rosa apesar de seus espinhos? Eu acho que sim. Todavia, é preciso tomar cuidado para não se espetar, e se você sangrar, precisa cuidar da ferida também, não basta deixar cicatrizar sozinha, se não pode acabar em infecções inimagináveis.','???:E, pelo visto, parece que hoje você consegue ver que esses espinhos deixaram cicatrizes.','Einar: É, sinto cada marca que isso me deixou ao longo dos anos, e, para ser sincero, eu realmente não queria amar alguém que me faz tão mal e sequer se importou com o que eu sentia.','Einar:E apesar disso, eu sempre acabava voltando como um cachorrinho que segue seu dono, independente de quantas vezes ele é machucado por isso.','Einar:Se quer saber a verdade, eu tô cansado disso tudo, às vezes até sinto que…','Einar:Se ela finalmente…','Einar:…descansasse','Einar:eu talvez teria um pouco de paz.','[...]','*O silêncio invade a conversa por alguns instantes…','???: Não controlamos nossos sentimentos e é natural sentir a ambiguidade deles, independentemente por quem seja.Todos nós estamos sempre procurando por paz, esse sentimento te faz humano não é mesmo?','Einar: Acho que sim.'],4,[]),
    complicacoes: new Criador_de_falas(['Recepção: Einar Ramos??','Einar: É, acho que tenho que ir.De qualquer forma, foi muito bom conversar com você moça, muito obrigado por ter me ouvido, mesmo que seja algo muito bom de se ouvir assim do nada.','???: Tudo bem, não precisa se preocupar, não foi nenhum problema ouvir você, caso volte, fique a vontade para se abrir e confiar em mim.','Einar: É… obrigado, até uma próxima, caso a gente se encontre de novo.','???: Até.'],4,[]),
    uhh: new Criador_de_falas(['Elisa: Olá senhor Einar, sinto te informar mas…','Elisa: A cirurgia da sua mãe sofreu algumas complicações a mais, e mesmo o médico tendo estabilizado ela um pouco, o procedimento ainda vai demorar mais algumas horas.','Elisa: Por isso, acredito que seja melhor o senhor ir para casa agora e descansar um pouco enquanto não temos novidades.','Einar: Certo, mas e se algo acontecer com minha mãe ou tiver algumas atualizações de como tudo está indo?','Elisa: Olha, sendo bem sincera, a situação atual não é muito grave, mas sim delicada.','Elisa: Assim, o risco da operação não é alto, mas levara algum tempo, e caso aconteça alguma coisa eu posso ligar para o senhor para te informar sobre o que está acontecendo.','Elisa: Por agora, eu recomendo fortemente que relaxe e descanse, coisas que não serão possíveis enquanto estiver no hospital.','Einar: Ok, eu entendo, acho que talvez seja melhor mesmo. Muito obrigado pela preocupação.','Einar: Vou indo embora então, e por favor, não espere para ligar, me avise na mesma hora que receber notícias, é a melhor ajuda que eu poderia contar agora.','Elisa: Pode deixar senhor Einar, eu prometo que vou ligar, até outra hora, bom descanso.','Einar: Obrigado, e um ótimo trabalho para você.'],4,[]),
    reflect1:new Criador_de_falas(['Einar: “Ufa, só quero ir pra casa agora, não tô aguentando de sono.”','Einar: “É incrivel como ficar com a minha mãe é exaustivo, não importa se a conversa é longa ou curta, tudo é sempre muito desgastante, sempre aquele mesmo jeito cinico e acido, falando sobre como ela é uma mãe incrivel e como eu sou um filho ingrato por não devolver o favor de me criar.”','Einar: “Ainda bem que eu bati de frente, mostrei que ela é não tão perfeita como se vangloria, em parte eu só sou esse fracasso que sou hoje porque ela foi um fracasso comigo.”','Einar: “Inclusive, acho que tenho que continuar o que venho tentando nos ultimos dias, de me controlar e essas coisas, assim o fracasso dela vai morrer aos poucos conforme o esforço que eu…','Einar: *Buaaa…','Einar: Ah… eu tô… tão cansado…','Einar: Passei tanto tempo ligado… e alerta… que não percebi que tô quase… dormindo…','Einar: Tenho que ficar atento ao meu…','*Einar apaga de sono, dormindo por algumas horas'],4,[]),
    ligação_Hospicio3:new Criador_de_falas(['Elisa: Alô? Senhor Einar?','Einar: Alô, boa tarde, com quem eu falo?','Elisa: Sou a enfermeira do hospital, Elisa, aquela que ligou para o senhor ontem.','Einar: Ah sim, me lembro de ontem.Inclusive, aconteceu alguma coisa? Não é todo dia que o hospital liga para mim.','Elisa: Bom senhor Einar, é sobre sua mãe, ela teve uma piora repentina, e acabou tendo algumas paradas cardíacas, mas pode ficar tranquilo senhor, ela já está sendo encaminhada para a cirurgia, no entanto, ainda existe a possibilidade de sua mãe precisar de um acompanhante, o senhor poderia vir aqui?','Einar: …','Elisa: Senhor Einar? Ainda está aí?','Einar: Ah… Sim, sim, eu estou, só… espera um pouquinho, vou me arrumar e em breve eu estarei no hospital.','Elisa: Ok senhor, muito obrigado pela compreensão, sua mãe ficará bem, pode contar com a gente.','Einar: Certo… Muito obrigado.','...','*A enfermeira desliga a ligação.','Einar: Puta mierda…','Einar: Eu… Eu não consigo ver ela de novo, não depois do que eu falei ontem.','Einar: É melhor eu não ir, não vai mudar nada, pode piorar o estado dela na verdade, talvez ela não queira me ver assim que se recuperar.','Einar: Que saco, pra que eu fui falar aquilo pra ela ontem? Inferno.'],4,[]),
    reflect2: new Criador_de_falas(['Einar: …','Einar: Será que era melhor eu ter ido? Sei que brigamos, mas… Querendo ou não, ela é tudo que eu tenho de família, e em uma situação como essa ela precisaria de mim.','Einar: Ou talvez não precise tanto assim, tenho que parar de achar que eu sou tão importante, o máximo que ela deve estar sentindo é raiva, ainda mais que eu falei coisas que não deviam ser ditas.','Einar: Eu sou realmente um péssimo filho, olha o que minha mãe tem que passar por minha causa.','Einar: Se eu não tivesse nascido ela estaria mil vezes melhor…','Einar: mil vezes melhor…','Einar: Acho que tive uma ideia, para resolver tudo isso…','*demonstra uma certa alegria pelo que acabara de pensar em fazer.'],4,[]),
    acordaMae: new Criador_de_falas(['Einar: Ahn?? Onde é que eu tô?','* Einar se levanta, dá o sinal para o ônibus parar e desce','Einar: Pera, essa é a casa da minha mãe? Nem ferrando que parei logo aqui.','*Einar percebe que dormiu muito, e agora está com fome','Einar: Porra, que fome.','Einar: Bom, eu ainda tenho a chave, custa nada entrar, já tô aqui mesmo, vai me economizar algum tempo.'],5,[]),
    seAcalmando: new Criador_de_falas(['Einar: calma… O que é aquilo no quintal?','*Vai em direção ao objeto','Einar: Isso é… O meu nunchaku?','Einar: ah… Nick… meu velho amigo, foi aqui que eu te deixei partir pra sempre.','Einar: Faz tanto tempo, e mesmo assim, nada nunca conseguiu superar as memórias e momentos que você me deu.','Einar: Você foi o melhor amigo e… tartaruga, que eu poderia ter tido, você veio justo no momento que eu mais precisava de algo para me apoiar, e foi a pior coisa do mundo você ter partido, acho que nunca me senti tão sozinho quanto naquele dia.','Einar: Engraçado que mesmo depois disso eu continuei vindo aqui e conversando com você.','Einar: Sinceramente eu não sei se você tá aqui, ou se têm algo do outro lado, mas se tiver, eu espero que você esteja bem, e que tenha conseguido me ouvir.','Einar: Uff, acho que tô me sentindo um pouco mais… leve, e talvez calmo.','Einar: Acho que isso é graças ao Mick, se não fosse por ele meu surto só iria de mal a pior.','Einar: Mas, ainda não me sinto bem totalmente, é como se pudesse acontecer de novo, caso eu…','Einar: Não tenha alguém… para ajudar??','Einar: Isso soa tão estranho, pensar que eu tenho que ter alguém para contar com a ajuda, logo eu que sempre estive sozinho.','Einar: Não sei, parece algo estranho, e errado, mas, eu tenho que tentar, pelo Mick, ele ia gostar de me ver bem e melhorando, é o que eu acho.','Einar: Alô, Nemo? Você tá aí? Acho que… Preciso… Da sua ajuda.'],5,[]),
    Decisorios1: new Criador_de_falas(['???: ...','Nemo: Boa tarde, aqui é o Nemo, quem fala? ','Einar: Oi, Nemo, sou eu. Einar.','Nemo: Einar!? Mano do céu, você tá bem? Onde você tá?','Einar: … '],5,[]),
    Decisorios21: new Criador_de_falas(['Nemo: Einar? Aconteceu alguma coisa?','Einar: Eu... Eu não sei. Eu tô me sentindo meio perdido.'],5,[]),
    Decisorios22: new Criador_de_falas(['Nemo:  Einar? Tá tudo bem? Por que você não veio trabalhar?','Einar:  Tô passando por alguns problemas, e queria tirar algum tempo para resolver, o que não deu muito certo.'],5,[]),
    Decisorios31: new Criador_de_falas(['Nemo: Perdido? Como assim?','Einar: Eu não sei como explicar, minha cabeça tá uma bagunça.','Einar: Mas fica tranquilo, acho que estou prestes a resolver todos os meus problemas de uma vez.'],5,[]),
    Decisorios32: new Criador_de_falas(['Nemo: Você faltou esses dias só por isso? Pelo seu bem, espero que não tenha uma próxima. Mas você já tá melhor pelo menos?','Einar: Mas não vai ter proxima,  vou fazer com que tudo acabe agora, sem mais faltas no trabalho ou qualquer outro problema, apenas um fim pacifico.'],5,[]),
    Decisorios41: new Criador_de_falas(['Nemo: Ok Einar, pense bem antes de tudo, tá? Agora fiquei preocupado com você.','Einar: Só agora? Você não se importaria de fato caso eu fizesse isso né? Que ótimo, isso é bom, muito bom.','Nemo: Não Einar, não foi isso que quis dizer, eu me importo como você, é muito sem noção da sua parte dizer que não me importo, se não me importasse, não estariamos conversando','Einar: Ainda assim, se importando ou não, eu só tô cansado, e quero acabar com isso logo.'],5,[]),
    Decisorios42: new Criador_de_falas(['Nemo: Ok Einar, você está confortável em me dizer exatamenete o que está acontcendo?','Einar: Eu tô cansado, Nemo. Não aguento ser só mais um desgraçado na vida de quem se importa comigo, e eu não quero que mais ninguém tenha de me aguentar e me aturar.','Einar: O que eu vou fazer agora será um alívio para todo mundo.'],5,[]),
    Decisorios51: new Criador_de_falas(['Nemo: Hermano, mesmo que essa situação aparenta ser difícil, sempre existe a possibilidade da mudança. As coisas não são fixas, você ainda pode mudar.','Einar: O problema não é sobre mudança, eu já tentei mudar, ver as coisas de um outro jeito, mas nunca deu certo, tudo na minha vida foi feito para dar errado, enquanto que minha morte parece a unica coisa certa agora.','Nemo: Einar... Sua vida não foi feita para dar errado, você é apenas uma ótima pessoa que infelizmente passou por coisas que eu não desejaria a ninguém, mas isso não significa que você deve desistir de tudo.','Acontecem coisa ruins na vida, sim, algumas realmente ruins, mas também existem bons momentos, e é por isso que vale viver.','Einar: Eu não... Eu não... ','Einar: Nemo... Me perdoa, eu sinto muito, por tudo, foi bom ter sido seu... amigo.'],5,[]),
    Decisorios52: new Criador_de_falas(['Nemo: Sério mesmo Einar, tudo isso só por que você tá cansado? Com tanta coisa mais importante para se preocupar...','Einar: É, você tem razão, mas eu sou fraco demais, talvez meu único fim fosse esse, não acho que teria outra saída.','Nemo: Como assim saída? Do que você tá falando?'],5,[]),
    Decisorios53: new Criador_de_falas(['Nemo: Se sentir candado é algo tão  natural quanto beber água, isso é apenas uma demostracão de que você é humano. ','Nemo: Além disso, você não é uma desgraça na vida daqueles que se importam Einar, ao contrário na verdade, você é uma dádiva, é um bom amigo e claramente se importa com os outros.','Einar: Eu sou mesmo uma dádiva? Logo eu, que sempre fui uma decepção para os meus pais e nunca tive amigos pois não era bom o bastante...','Nemo: Essas pessoas simplesmente não conseguiam enxergar a pessoa incrível que você é, elas focavam nas coisas negativas e esqueciam de trazer suas qualidades a luz, Einar.','Elas menospresaram seus sentimentos para tentar se sentir melhor consigo mesmo, seus sentimentos e opiniões são importantes e tenho certeza que não sou o unico a perceber todo de bom que você é','Einar: Eu... Eu nunca ouvi algo assim antes... Nemo, eu posso ir ver você? Qualquer lugar já tá de bom tamanho.','Nemo: É claro que pode! Vamos no Café Real.'],5,[]),
}

let Falas_Geral = {
    Falas_Segunda : {
        Falas_Banheiro : new Criador_de_falas(['Estou atrasado, não posso ficar parando agora','Estou atrasado, não posso ficar parando agora'],0,[false,false]),
        Falas_Quarto : new Criador_de_falas(['Estou atrasado, não posso ficar parando agora','Estou atrasado, não posso ficar parando agora','estou atrasado,não posso ficar parando agora','voltar a dormir?','É, acho que vou ter que ir, não consigo dormir',"e lá vamos nós para um maravilhoso dia"],0,[false,false,false,true,false,false]),
        Falas_Cozinha : new Criador_de_falas(['Estou atrasado, não posso ficar parando agora','Estou atrasado, não posso ficar parando agora','estou atrasado,não posso ficar parando agora','estou atrasado,não posso ficar parando agora3','Einar está atrasado.Parar para tomar cafe da manhã?','Vou pegar algo rápido na geladeira, e já aproveito para preparar minha marmita','Preciso me apressar, não dá tempo de parar para comer agora','fazer marmita'],0,[false,false,false,false,true,false,false,true]),
        Falas_Sala : new Criador_de_falas(['Estou atrasado, não posso ficar parando agora','Fumar alguns cigarros?','jogar um pouco?','jogar um pouquinho não mata ninguem né'],0,[false,true,true,false]),
        Falas_Jardin : new Criador_de_falas([],0,[]),
        Falas_Ponto : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],0,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['Trabalhar?','Já está na hora de almoçar? Bom eu vou na cozinha esquntar minha marmita'],0,[true,false,false]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],0,[]),
    },
    Falas_Terca : {
        Falas_Banheiro : new Criador_de_falas(['Um espelho','Um vaso'],1,[false,false]),
        Falas_Quarto : new Criador_de_falas(['Minha cama','2','3','dormir?'],1,[false,false,false,true]),
        Falas_Cozinha : new Criador_de_falas(['Fazer marmita','2','3','Parar para tomar café da manhã?','não estou com fome','Já fiz a marmita'],1,[true,false,false,true,false,false]),
        Falas_Sala : new Criador_de_falas(['1','E lá vamos nós para mais um dia maravilhoso','Droga, não devia ter fumado, agora tenho que aguentar essa tosse maldita','Virar a noite jogando pode não ter sido uma boa, mas quem liga?','Tô acabado, mas acho que valeu a pena','jogar um pouco?'],1,[false,false,false,false,false,true]),
        Falas_Jardin : new Criador_de_falas([],1,[]),
        Falas_Ponto : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],1,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['Trabalhar?','Vou para a copa, pelo menos não vai precisar dividir comigo dessa vez','Se eu for para a copa, o Nemo vai se sentir obrigado a dividir o almoço comigo. Melhor eu ficar por aqui mesmo.','acender um cigarro?'],1,[true,false,false,true]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],1,[]),
    },
    Falas_Quarta : {
        Falas_Banheiro : new Criador_de_falas(['1','2','Lavar o rosto?','Cacete, eu tô completamente acabado, minhas olheiras estão realmente horríveis.Provavelmente deve ser por causa do meu sono, não durmo direito faz algum tempo.Talvez seja melhor ir no Hospital?','Ir ao médico, antes isso do que continuar não dormindo, mesmo que eu odeie ir lá.','Esperar um pouco, vai que passa né? E se não passar, talvez eu possa resolver sozinho, com algum chá ou algo assim.'],2,[false,false,true,true,false,false]),
        Falas_Quarto : new Criador_de_falas(['1','2','3','Fumar?','jogar?','Bom, jogar só por hoje não faz mal, preciso relaxar um pouco no fim das contas.','Talvez fumar já seja o suficiente por essa noite, me sinto relaxado o suficiente.','Virar só mais uma noitezinha não parece uma má ideia.','Acho  melhor tentar dormir ao invés de jogar, ficar  só jogando durante a noite deve ser uma das coisas que está ferrando meu sono.'],2,[false,false,false,true,true]),
        Falas_Cozinha : new Criador_de_falas(['Fazer marmita?','2','3','Marmita feita','Ah, lembrei, tenho que fazer minha marmita, senão o Nemo vai precisar dividir a dele, e odeio quando ele precisa se preocupar com um peso a mais.'],2,[true,false,false,false,false,false]),
        Falas_Sala : new Criador_de_falas(['1','Fumar?'],2,[false,true]),
        Falas_Jardin : new Criador_de_falas([],2,[]),
        Falas_Ponto : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],2,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas(['Einar está cansado e quer ir para casa jogar.Desistir da consulta?','Estou muito cansado agora eu vou amanhã'],2,[true]),
        Falas_Fabrica_Corredor : new Criador_de_falas(['Não tô muito a fim de almoçar com alguém hoje, mas se eu não for o Nemo vai vir aqui me procurar. Já sei! É só eu almoçar no almoxarifado, lá ele não vai me encontrar.Até que eu consigo pensar um pouco as vezes!'],2,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['trabalhar?','Ir para o refeitorio se encontrar com nemo?'],2,[true,true]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],2,[]),
    },
    Falas_Quinta : {
        Falas_Banheiro : new Criador_de_falas(['1','2','Lavar o rosto?'],3,[false,false,true]),
        Falas_Quarto : new Criador_de_falas(['1','2','3'],3,[false,false,false]),
        Falas_Cozinha : new Criador_de_falas(['Fazer marmita?','2','3','marmita feita','Não posso esquecer minha marmita, se não o Nemo vai ter que lidar com um peso morto na hora do almoço.'],3,[true]),
        Falas_Sala : new Criador_de_falas(['1','Fumar?','Tem certeza? Melhor pensar de novo...Fumar?','Foi um dia cansativo, estressante e já faz tempo que você não fuma...Fumar?','Vamos lá, última chance...Fumar?','Fala especifia'],3,[false,true,true,true,true]),
        Falas_Jardin : new Criador_de_falas(['...'],3,[]),
        Falas_Ponto : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],3,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas(['Trabalhar?','Finalmente o horário de almoço, não aguentava mais ficar aqui.'],3,[true]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],3,[]),
        Falas_Hospital_Recpcao: new Criador_de_falas([],3,[])
    },
    Falas_Sexta : {
        Falas_Banheiro : new Criador_de_falas(['1','2'],4,[false,false]),
        Falas_Quarto : new Criador_de_falas(['1','2','3'],4,[]),
        Falas_Cozinha : new Criador_de_falas(['1','2','3'],4,[]),
        Falas_Sala : new Criador_de_falas(['1','MEIO DIA?? Merda, eu tô muito fudido.','Ah, foda-se, nem adianta mais eu ir, até eu pegar o ônibus já vai levar mais um tempo, e quando eu chegar lá o chefe vai encher o meu saco e vou ter que ficar até umas tantas da noite fazendo hora extra.','Tentar voltar a dormir?','Eu… só… quero… dormir, desgraça.Ah, foda-se, tanto faz, vou ficar aqui deitado para relaxar o minimo que seja.','Bom não a nada que eu possa fazer.'],4,[false,false,false,true]),
        Falas_Jardin : new Criador_de_falas([],4,[]),
        Falas_Ponto : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Frente : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Recepcao : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Corredor : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Escritorio : new Criador_de_falas([],4,[]),
        Falas_Fabrica_Cozinha : new Criador_de_falas([],4,[]),
        Falas_Hospital_Recpcao: new Criador_de_falas(['Ficar no Hospital?'],4,[true])
    },
    Falas_Sabado : {
        Falas_Banheiro : new Criador_de_falas([],5,[]),
        Falas_Quarto : new Criador_de_falas([' '],5,[true]),
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
    'HospitalFrente':false,
    'HospitalRecpcao':false,
    'HospitalCorredor':false,
    "HospitalQuarto":false,
    "CasaMae":false,
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
    if (event.clientX>=0&&event.clientX<=40) {
        if (event.clientY>=0&&event.clientY<=40) {
            configs = !(configs)
            cronos = true
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
let personagemSpeed = 5
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
//quadros

let id = -1
class Quadrinhos {
    constructor(scrs,id) {
        this.image = new Image()
        this.src = scrs
        this.id = id
    }
    load(active){
        this.image.onload = ()=>{
            
        }
        this.image.src = this.src
    }
    DrawIt(active,id){
        if (active&&id===this.id) {
            cxt.drawImage(this.image,0,0,1360,765)
        }
        this.image.src = this.src
    }
}
let quadro_fumando = new Quadrinhos('images/fumaste.png',0)
let quadro_jogando = new Quadrinhos('images/jogaste.png',1)
let quadro_Homo = new Quadrinhos('images/Homocherife.png',2)
let quadro_psciquico = new Quadrinhos('images/fotoFamilia.png',3)
let quadro_nemo1 = new Quadrinhos('images/NemoQuadroP.png',4)
let quadro_nemo2 = new Quadrinhos('images/NemoQuadroS.png',5)
let quadro_nemo3 = new Quadrinhos('images/NemoQuadroT.png',6)
let Final_Aceita = new Quadrinhos('images/AceitaAjuda.png',7)
let Final_Suic = new Quadrinhos('images/CemiterioQuadro.png',8)
let Final_suic_falho = new Quadrinhos('images/nemoSfalho.png',9)
let Final_cafezinho = new Quadrinhos('images/Cafezinho.png',10)


//fim quadros
export{text,escritaText,pressingM,interaction,star}
personagem.onload = function(){

    function animation(){
        cxt.clearRect(0,0,y,x)
        nemo = new Places('images/nemo-andando.png',10,nemo_pos[0],nemo_pos[1],330,330,27,240,240)
        nemo_pos[1] = personagemY
        let Onibus = new Places('images/Onibus.png',0,onibusX,OnibusY,900,700)
        if(place){
            console.log(personagemX)
            console.log(personagemY)
        }
        quadro_fumando.load(star)
        quadro_fumando.DrawIt(star,id)
        quadro_jogando.load(star)
        quadro_jogando.DrawIt(star,id)
        quadro_Homo.load(star)
        quadro_Homo.DrawIt(star,id)
        quadro_psciquico.load(star)
        quadro_psciquico.DrawIt(star,id)
        quadro_nemo1.load(star)
        quadro_nemo1.DrawIt(star,id)
        quadro_nemo2.load(star)
        quadro_nemo2.DrawIt(star,id)
        quadro_nemo3.load(star)
        quadro_nemo3.DrawIt(star,id)
        Final_suic_falho.load(star)
        Final_suic_falho.DrawIt(star,id)
        Final_Suic.load(star)
        Final_Suic.DrawIt(star,id)
        Final_cafezinho.load(star)
        Final_cafezinho.DrawIt(star,id)
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
            Hospital_Corredor.animeteImg()
            Hospital_Frente.animeteImg()
            Hospital_Quarto.animeteImg()
            Hospital_Recepcao.createImg()
            Hospital_Recepcao.animeteImg()
            Casa_mae.animeteImg()
            config.animeteImg(true)
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
                tersa.tells(24)
                if (animation_end) {
                    played[2] = true
                    anend(false)
                    star = false
                }
            }
        }
        if (semana===2&&played[3]===false) {
            star = true
            Quarta.createImg()
            if (played[2]) {
                Quarta.tells(21)
                if (animation_end) {
                    played[3] = true
                    anend(false)
                    star = false
                }
            }
        }
        if (semana===3&&played[4]===false) {
            star = true
            Quinta.createImg()
            if (played[3]) {
                Quinta.tells(20)
                if (animation_end) {
                    played[4] = true
                    anend(false)
                    star = false
                }
            }
        }
        if (semana===4&&played[5]===false) {
            star = true
            Sexta.createImg()
            if (played[4]) {
                Sexta.tells(20)
                if (animation_end) {
                    played[5] = true
                    anend(false)
                    star = false
                }
            }
        }
        if (semana===5&&played[6]===false) {
            star = true
            Sexta.createImg()
            if (played[5]) {
                Sexta.tells(22)
                if (animation_end) {
                    played[6] = true
                    anend(false)
                    star = false
                }
            }
        }
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
        let porta_escrito = new HitBoxes(50,530,150,200)
        let porta_Hospital = new HitBoxes(540,500,400,50)
        let Hospital_CorredorH = new HitBoxes(-100,418,1400,50)
        let Hospital_CorredorB = new HitBoxes(450,423,565,100)
        let Hospital_QuartoP1 = new HitBoxes(110,423,80,400)
        let Hospital_QuartoP2 = new HitBoxes(110,423,660,223)
        let Hospital_QuartoB = new HitBoxes(800,423,358,120)
        let Hospital_QuartoH = new HitBoxes(0,423,1358,80)
        let Hospital_Recep = new HitBoxes(880,480,300,80)
        let Hospital_Banco = new HitBoxes(200,480,450,60)
        let sofa = new HitBoxes(257,660,430,180)
        let otherparede = new HitBoxes(1200,140,360,780)
        let casamaehit = new HitBoxes(0,490,1360,20)
        let escadacasa = new HitBoxes(1020,430,160,620)
        let entercasa = new HitBoxes(920,500,160,220)
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
        //cxt.fillRect(920,500,160,220)
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

            let prt = new HitBoxes(0,140,360,780)

            colliderArson(2,banheiro_planta)

            colliderArson(2,prt)

            colliderArson(2,sala_quina2)
        }
        if(room[3]){

            colliderArson(3,sala_quina1)

            colliderArson(3,sala_quina2)
            colliderArson(3,sofa)
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
            colliderArson(10,otherparede)
        }
        if (room[11]) {
            colliderArson(11,fabrica_parede)
        }
        if (room[12]) {
            colliderArson(12,fabrica_parede)
        }
        if (room[13]) {
            colliderArson(13,Hospital_CorredorH)
            colliderArson(13,Hospital_CorredorB)
        }
        if (room[14]) {
            colliderArson(14,Hospital_QuartoB)
            colliderArson(14,Hospital_QuartoP1)
            colliderArson(14,Hospital_QuartoP2)
            colliderArson(14,Hospital_QuartoH)
        }
        if (room[15]) {
            colliderArson(15,casamaehit)
            colliderArson(15,escadacasa)

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
            if (semana===3&&pilha[35]) {
                pilha[35] = false
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
        }if(personagemX>= y-200 && room[1]&&trasiType===0&&countdown&&pilha[19]&&(pilha[35]||pilha[36]===false)){
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
        if(personagemX>= y-200 && room[4]&&trasiType===0&&countdown&&((semana!==4)||pilha[58]===false)&&!(pilha[50]&&semana===4)){
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
        if(ponto_viagem.Collider(HitboxInfo)&&enterPlace&&room[5]&&trasiType===0&&countdown&&TrabHosp){
            onibus[0] = true
            cronos = false
        }
        if(ponto_viagem.Collider(HitboxInfo)&&enterPlace&&room[5]&&trasiType===0&&countdown&&TrabHosp===false){
            onibus[0] = true
            cronos = false
        }
        //fora fabrica
        if(enterPlace&&ponto_volta.Collider(HitboxInfo) && room[6]&&trasiType===0&&countdown){
            onibus[0] = true
            cronos = false
            countdown = false
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
        //Hospital Frente
        if (ponto_volta.Collider(HitboxInfo)&&enterPlace&&room[11]&&countdown) {
            onibus[0] = true
            cronos = false
        }  
        if (porta_Hospital.Collider(HitboxInfo)&&enterPlace&&room[11]&&countdown) {
            room[12] = true
            room[11] = false
            personagemX = -54
            personagemY = 344
            BOXes.HospitalRecpcao = true
            BOXes.HospitalFrente = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //Hospital recepção
        if (personagemX<= -55 && room[12]&&countdown&&!(pilha[62]===false&&THECISIONS.sex[1]===true&&semana===4)) {
            room[11] = true
            room[12] = false
            personagemX = 587
            personagemY = 224
            BOXes.HospitalFrente = true
            BOXes.HospitalRecpcao = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if (personagemX>= y-200 && room[12]&&countdown) {
            room[13] = true
            room[12] = false
            personagemX = -30
            BOXes.HospitalCorredor = true
            BOXes.HospitalRecpcao = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //Hosptal Corredor
        if (personagemX<= -55 && room[13]&&countdown) {
            room[12] = true
            room[13] = false
            personagemX = y-220
            personagemY = 335
            BOXes.HospitalRecpcao = true
            BOXes.HospitalCorredor = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if (personagemX>= y-200 && room[13]&&countdown&&pilha[58]) {
            room[14] = true
            room[13] = false
            personagemX = y-220
            personagemY = 335
            BOXes.HospitalQuarto = true
            BOXes.HospitalCorredor = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        //Hospial Quarto
        if (personagemX>= y-200 && room[14]&&countdown) {
            room[13] = true
            room[14] = false
            personagemX = y-201
            BOXes.HospitalCorredor = true
            BOXes.HospitalQuarto = false
            countdown = false
            setTimeout(function(){countdown = true},1000)
        }
        if(interaction!==true&&((porta_Hospital.Collider(HitboxInfo)&&room[11])||(ponto_volta.Collider(HitboxInfo)&&room[11])||(porta_escrito.Collider(HitboxInfo)&&room[10])||(room[6]&&ponto_volta.Collider(HitboxInfo))||(porta_escritorio.Collider(HitboxInfo)&&room[9])||(fabrica_recp.Collider(HitboxInfo)&&room[8])||(porta_fabrica.Collider(HitboxInfo)&&room[6])||(ponto_viagem.Collider(HitboxInfo)&&room[5]))||(Hospital_Banco.Collider(HitboxInfo)&&room[12]&&pilha[59]===false)||(Hospital_Recep.Collider(HitboxInfo)&&room[12]&&pilha[59])){
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
        if (star===false&&perso) {
            cxt.drawImage(personagem,242*(frameX+frameM),0,242,242,personagemX,personagemY,330,330)
        }
        if (onibus[0]) {
            countdown = false
            if (onibusX<=(personagemX-609)) {
                onibusX+=6
            }else{
                if (onibus[2]===false) {
                    setTimeout(() => {
                        onibus[1] = true
                    }, 2000);
                    onibus[2] = true
                }
            }
            if (onibus[1]) {
                if (onibus[4]===false) {
                    perso=false
                }else{
                    perso=true
                }
                if (onibusX>=1360) {
                    if (onibus[3]===false&&onibus[4]===false) {
                        onibus[3] = true
                        if (room[5]) {
                            if (TrabHosp) {
                                room[6] = true
                                room[5] = false
                                personagemX = 925
                                BOXes.foraFabrica = true
                                BOXes.ponto = false
                                enterPlace = false
                                countdown = false
                                setTimeout(function(){countdown = true},1000)
                            }else{
                                room[11] = true
                                room[5] = false
                                personagemX = 925
                                BOXes.HospitalFrente = true
                                BOXes.ponto = false
                                enterPlace = false
                                countdown = false
                                setTimeout(function(){countdown = true},1000)
                            }
                        }else{
                            if (room[6]) {
                                room[5] = true
                                room[6] = false
                                personagemX = 559
                                BOXes.ponto = true
                                BOXes.foraFabrica = false
                                countdown = false
                                setTimeout(function(){countdown = true},1000)
                            }else{
                                room[5] = true
                                room[11] = false
                                personagemX = 559
                                BOXes.ponto = true
                                BOXes.HospitalFrente = false
                                countdown = false
                                setTimeout(function(){countdown = true},1000)
                            }
                        }
                    }
                    if (onibus[4]===true) {
                        onibus[0] = false
                        onibus[1] = false
                        onibus[2] = false
                        onibus[3] = false
                        onibus[4] = false
                        onibusX = -900
                        countdown=true
                    }
                }else{
                    onibusX+=6
                }
            }
            if (onibus[3]===true&&onibus[4]===false) {
                onibusX=-900
                onibus[4] = true
                onibus[1] = false
                onibus[2] = false
                cronos = true
                countdown = true
            }
            Onibus.createImg()
            Onibus.animeteImg(true)
        }
        if(interaction_jumper||colaboration){
            interaction = false
            chager(false)
        }
        if (stop) {
            nemo.createImg()
        }
        if (star===false) {
            salaC.animeteImg()
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
                        if (currentFala===0&&((pilha[23]&&THECISIONS.qua[0])||(THECISIONS.qua[2]&&pilha[23]===false))) {
                            week().Falas_Cozinha.escrita(interaction,help,3)
                            break
                        }
                        if (currentFala===0&&((pilha[23]&&THECISIONS.qua[0]===undefined)||(THECISIONS.qua[2]===undefined&&pilha[23]===false))) {
                            week().Falas_Cozinha.escrita(interaction,help,currentFala,false,false)
                            break
                        }
                    }
                    if (semana===3) {
                        if (currentFala===0&&THECISIONS.qui[0]===undefined) {
                            week().Falas_Cozinha.escrita(interaction,help,currentFala,false,false)
                            break
                        }
                        if (currentFala===0&&THECISIONS.qui[0]!==undefined) {
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
                    if (semana===2) {
                        if (currentFala===0&&((THECISIONS.qua[1]&&pilha[23])||(THECISIONS.qua[3]&&pilha[23]===false))) {
                            week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,true)
                            break
                        }
                        if (currentFala===0&&((THECISIONS.qua[1]===undefined&&pilha[23])||(THECISIONS.qua[3]===undefined&&pilha[23]===false))) {
                            week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,false,false)
                            break
                        }
                    }
                    if (semana===3) {
                        if (currentFala===0&&THECISIONS.qui[1]!==undefined) {
                            week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,true)
                            break
                        }
                        if (currentFala===0&&THECISIONS.qui[1]===undefined) {
                            week().Falas_Fabrica_Escritorio.escrita(interaction,help,currentFala,false,false)
                            break
                        }
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
            if (DECISIONS[2]===true) {
                week().Falas_Fabrica_Escritorio.escrita(interaction,help,1)
                cronologia[2] = 0
                heppen.trabalhoS = false
            } else {
                cronologia[2] = 1
                heppen.trabalhoS = false
            }
        }
        if (cronologia[2]===0&&heppen.nemo&&semana===0) {
            if (room[9]&&personagemX>=300&&heppen.nemo) {
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
                    star = true
                    id = 0
                    dialogos.fumando.escrita(true,help,dialogoHelper-1)
                    if (pressingM[5]) {
                        if (dialogoHelper<3) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            star = false
                            id = -1
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
                if (DECISIONS[5]!==undefined) {
                    if (pilha[5]) {
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        pilha[5] = false
                    }
                    /*Falas_Geral.Falas_Segunda.Falas_Sala.escrita(true,help,3)
                    if (pressingM[5]) {
                        semana === 1
                        cronos = true
                        personagemX,personagemY = 295,289
                        pilha[4] = false
                    }*/
                   star = true
                   id = 1
                   if (pressingM[5]) {
                    personagemX = 295
                    personagemY = 289+70
                    semana = 1
                    cronos = true
                    cronologia[4] = true
                    played[1]=true
                    star = false
                    id = -1
                   }
                }
            }
        }
        if (semana===1) {
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
                if (pilha[12]===false&&pilha[14]&&(BOXes.sala||BOXes.quarto)) {
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
                            star = true
                            id=0
                            dialogos.reflexao.escrita(true,help,dialogoHelper)
                            if (dialogoHelper<dialogos.reflexao.fala.length&&pressingM[5]&&escritaTermina&&dialogos.reflexao.fala[dialogoHelper]!==undefined) {
                                dialogoHelper++
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                            }else{
                                if (pressingM[5]&&dialogoHelper>=dialogos.reflexao.fala.length) {
                                    star = false
                                    id = -1
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
            //
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
                    star = true
                    id=1
                    if (pressingM[5]) {
                        semana = 2
                        cronos=true
                        star = false
                        id=-1
                    }
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
                week().Falas_Banheiro.escrita(true,help,3)
                if(k){
                    pressingM[5] = false
                    k = false
                }
                if (pressingM[5]&&THECISIONS.qua[2]!==undefined) {
                    cronos = true
                    pilha[22] = false
                    k = true
                }
            }
            if (pilha[23]===false&&THECISIONS.qua[1]&&pilha[22]===false&&pilha[24]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Banheiro.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos = true
                    pilha[24] = false
                    k = true
                }
            }
            if (pilha[23]===false&&THECISIONS.qua[1]===false&&pilha[22]===false&&pilha[24]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Banheiro.escrita(true,help,5)
                if (pressingM[5]) {
                    cronos = true
                    pilha[24] = false
                    k = true
                }
            }
            if (((THECISIONS.qua[1]&&pilha[23])||(THECISIONS.qua[3]&&pilha[23]===false))&&pilha[25]&&BOXes.corredorFabrica) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Fabrica_Escritorio.escrita(true,help,1)
                if (pressingM[5]) {
                    cronos = true
                    pilha[25] = false
                    k = true
                }
            }
            if (((THECISIONS.qua[1]&&pilha[23])||(THECISIONS.qua[3]&&pilha[23]===false))&&pilha[26]&&BOXes.corredorFabrica) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Fabrica_Corredor.escrita(true,help,0)
                if (pressingM[5]) {
                    cronos = true
                    pilha[26] = false
                    k = true
                }
            }
            if (((THECISIONS.qua[2]===false&&pilha[23])||(THECISIONS.qua[4]===false&&pilha[23]===false))&&pilha[26]===false) {
                star = true
                cronos = false
                id=2
                if (pressingM[5]) {
                    star=false
                    id=-1
                    cronos=true
                }
            }
            if (BOXes.cozinhaFabrica&&((THECISIONS.qua[2]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))&&pilha[26]===false) {
                if (personagemX>=340) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        nemo_pos[1]=personagemY
                        nemo_pos[0]=-30
                    }
                    if (nemo_pos[0]+148<personagemX) {
                        nemo_pos[0]+=2
                        nemo.NPC(7,3)
                    }else{
                        nemo.NPC(2,0)
                        pilha[27] = false
                    }
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
                            pilha[26] = false
                            k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
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
                            pilha[26] = false
                            k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                        }
                    }
                }
                if (pilha[26]===false) {
                    if (nemo_pos[0]>-30) {
                        nemo_pos[0]-=2
                        nemo.NPC(26,21)
                    }else{
                        k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                    }
                }
            }
            if (((THECISIONS.qua[2]===false&&pilha[23])||(THECISIONS.qua[4]===false&&pilha[23]===false))&&pilha[28]) {
                week().Falas_Fabrica_Escritorio.escrita(true,help,2)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[28] = false
                }
            }
            if (BOXes.foraFabrica&&(pilha[28]===false||pilha[26]===false)&&pilha[23]===false&&pilha[29]) {
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
            if (BOXes.quarto&&((THECISIONS.qua[3]===false&&pilha[23])||(THECISIONS.qua[5]===false&&pilha[23]===false))&&pilha[31]) {
                week().Falas_Quarto.escrita(true,help,3)
                cronos = false
                if (pressingM[5]) {
                    cronos=true
                    pilha[31] = false
                }
            }
            if (pilha[32]&&(((THECISIONS.qua[4]&&pilha[23])||(THECISIONS.qua[6]&&pilha[23]===false))||((THECISIONS.qua[3]&&pilha[23])||(THECISIONS.qua[5]&&pilha[23]===false)))) {
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
                star = true
                id=0
                dialogos.fumandaQA.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.fumandaQA.fala.length&&pressingM[5]&&escritaTermina&&dialogos.fumandaQA.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.fumandaQA.fala.length) {
                        star = false
                        id=-1
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                        pilha[32] = false
                    }
                }
                if (((THECISIONS.qua[3]&&pilha[23])||(THECISIONS.qua[4]&&pilha[23]===false))) {
                    if (pilha[23]) {
                        TH('qua',4,true)
                    }else{
                        TH('qua',6,true)
                    }
                }
            }
            if (BOXes.quarto&&((THECISIONS.qua[4]!==undefined&&pilha[23])||(THECISIONS.qua[7]!==undefined&&pilha[23]===false))&&pilha[33]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Quarto.escrita(true,help,4)
                if (pressingM[5]) {
                    cronos=true
                    pilha[33] = false
                    k=true
                }
            }
            if (pilha[33]) {
                star = true
                cronos= false
                id=1
                if (pressingM[5]) {
                    cronos=true
                    star=false
                    id=-1
                }
            }
            if (BOXes.quarto) {
                if (((THECISIONS.qua[4]&&pilha[23])||(THECISIONS.qua[6]&&pilha[23]===false))&&pilha[34]) {
                    if (((THECISIONS.qua[5]&&pilha[23])||(THECISIONS.qua[7]&&pilha[23]===false))) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                        }
                        week().Falas_Quarto.escrita(true,help,5)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                            k=true
                        }
                    }else{
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                        }
                        week().Falas_Quarto.escrita(true,help,6)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                            k=true
                        }
                    }
                }if(((THECISIONS.qua[4]===false&&pilha[23])||(THECISIONS.qua[6]===false&&pilha[23]===false))&&pilha[34]){
                    if (((THECISIONS.qua[4]&&pilha[23])||(THECISIONS.qua[6]&&pilha[23]===false))) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                        }
                        week().Falas_Quarto.escrita(true,help,7)
                        if (pressingM[5]) {
                            cronos=true
                            pilha[34] = false
                            k=true
                        }
                    }else{
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                        }
                        week().Falas_Quarto.escrita(true,help,8)
                        if (pressingM[5]) {
                            k=true
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
        //Quinta
        if (semana===3) {
            if (pilha[35]===false&&pilha[37]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Cozinha.escrita(true,help,4)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[37] = false
                }
            }
            if (THECISIONS.qui[0]===true&&pilha[36]) {
                pilha[36] = false
            }
            if (THECISIONS.qui[1]!==undefined&&pilha[38]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Fabrica_Escritorio.escrita(true,help,1)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[38] = false
                }
            }
            if (((THECISIONS.qua[4]===true&&pilha[23])||(THECISIONS.qua[7]===true&&pilha[23]===false))) {
                pilha[39] = false
            }
        
            if (BOXes.cozinhaFabrica&&THECISIONS.qui[1]!==undefined&&personagemX>=340&&pilha[42]) {
                cronos=false
                if (pilha[41]) {
                    if (nemo_pos[0]+148<personagemX) {
                        nemo_pos[0]+=2
                        nemo.NPC(7,3)
                    }else{
                        nemo.NPC(2,0)
                        pilha[40] = false
                    }
                }
                if (pilha[40]===false&&pilha[41]) {
                    if (pilha[39]) {
                        dialogos.dialog6.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.dialog6.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog6.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.dialog6.fala.length) {
                            pilha[41] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            }
                        }
                    }else{
                        dialogos.dialog61.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.dialog61.fala.length&&pressingM[5]&&escritaTermina&&dialogos.dialog61.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.dialog61.fala.length) {
                                pilha[41] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                                cronos=true
                            }
                        }
                    }
                }
            }
            if (pilha[41]===false&&pilha[42]) {
                if (nemo_pos[0]>-30) {
                    nemo_pos[0]-=2
                    nemo.NPC(26,21)
                }else{
                    k = true
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                    dialogoHelper = 0
                    cronos=true
                    pilha[42] = false
                }
            }   
            if (BOXes.ponto&&pilha[42]===false&&pilha[43]) {
                cronos=false
                dialogos.onibuess.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.onibuess.fala.length&&pressingM[5]&&escritaTermina&&dialogos.onibuess.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.onibuess.fala.length) {
                        pilha[43] = false
                        k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                    }
                }
            }
            if (BOXes.sala&&pilha[43]===false&&THECISIONS.qui[2]===undefined) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Sala.escrita(true,help,1)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[44] = false
                }  
            }
            if (pilha[44]===false&&THECISIONS.qui[2]===true&&pilha[47]) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Sala.escrita(true,help,5)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[47] = false
                }
            }
            if (pilha[44]===false&&THECISIONS.qui[3]===undefined&&THECISIONS.qui[2]===false) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Sala.escrita(true,help,2)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[45] = false
                }
            }
            if (pilha[45]===false&&THECISIONS.qui[4]===undefined&&THECISIONS.qui[3]===false) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Sala.escrita(true,help,3)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[46] = false
                }
            }
            if (pilha[46]===false&&pilha[48]&&THECISIONS.qui[4]===false) {
                cronos = false
                if(k){
                    pressingM[5] = false
                    k = false
                    help = 0
                    text=''
                }
                week().Falas_Sala.escrita(true,help,4,true)
                if (pressingM[5]) {
                    k=true
                    cronos=true
                    pilha[48] = false
                }
            }
            if ((THECISIONS.qui[2]||THECISIONS.qui[3]||THECISIONS.qui[4])&&pilha[48]) {
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
                star = true
                id=0
                if (THECISIONS.qui[2]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Jardin.escrita(true,help,0)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[48] = false
                        pilha[50] = false
                        star = false
                        id=-1
                    }
                } else {
                    dialogos.alivio.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.alivio.fala.length&&pressingM[5]&&escritaTermina&&dialogos.alivio.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.alivio.fala.length) {
                            pilha[48] = false
                            pilha[50] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            star=false
                        }
                    }
                }
            }
            if (pilha[48]===false&&pilha[49]&&BOXes.sala) {
                cronos=false
                dialogos.ligação_Hospicio.escrita(true,help,dialogoHelper)
                if (dialogoHelper<dialogos.ligação_Hospicio.fala.length&&pressingM[5]&&escritaTermina&&dialogos.ligação_Hospicio.fala[dialogoHelper]!==undefined) {
                    dialogoHelper++
                    help = 0
                    text = ''
                    chageMd(false)
                    escritaMD(false)
                }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.ligação_Hospicio.fala.length) {
                        pilha[49] = false
                        TrabHosp = false
                        k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                    }
                }
            }
            if (pilha[51]&&BOXes.HospitalQuarto) {
                if (pilha[50]) {
                    cronos=false
                    dialogos.conversa_irra.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.conversa_irra.fala.length&&pressingM[5]&&escritaTermina&&dialogos.conversa_irra.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.conversa_irra.fala.length) {
                            pilha[51] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }else{
                    cronos=false
                    dialogos.conversa_norma.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.conversa_norma.fala.length&&pressingM[5]&&escritaTermina&&dialogos.conversa_norma.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.conversa_norma.fala.length) {
                            pilha[51] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
            }
            if (pilha[51]===false&&BOXes.ponto&&pilha[52]) {
                if (pilha[50]) {
                    cronos=false
                    dialogos.refletir2.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.refletir2.fala.length&&pressingM[5]&&escritaTermina&&dialogos.refletir2.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.refletir2.fala.length) {
                                pilha[52] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                                cronos=true
                                semana=4
                                room[3] = true
                                room[5] = false
                                personagemX = 295
                                personagemY = 289+70
                                BOXes.sala = true
                                countdown = false
                                setTimeout(function(){countdown = true},1000)
                                BOXes.ponto = false
                        }
                    }
                } else {
                    cronos=false
                    dialogos.refletir1.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.refletir1.fala.length&&pressingM[5]&&escritaTermina&&dialogos.refletir1.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                    if (pressingM[5]&&dialogoHelper>=dialogos.refletir1.fala.length) {
                            pilha[52] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            semana=4
                            room[3] = true
                            room[5] = false
                            personagemX = 295
                            personagemY = 289+70
                            BOXes.sala = true
                            countdown = false
                            setTimeout(function(){countdown = true},1000)
                            BOXes.ponto = false
                        }
                    }
                }
            }
        }
        //sexta
        if(semana===4){
            if (pilha[50]) {
                //sexta 1.2
                if (pilha[53]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,1)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[53] = false
                    }
                }
                if (pilha[54]&&pilha[53]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,2)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[54] = false
                    }
                }
                if (pilha[55]&&pilha[54]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,3)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[55] = false
                    }
                }
                if (THECISIONS.sex[0]===true&&pilha[56]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,4)
                    if (pressingM[5]) {
                        k=true
                        pilha[56] = false
                        setTimeout(function(){pilha[57]=false},20000)
                    }
                }
                if (THECISIONS.sex[0]===false&&pilha[56]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,5)
                    if (pressingM[5]) {
                        k=true
                        pilha[56] = false
                        setTimeout(function(){pilha[57]=false},20000)
                    }
                }
                if (pilha[57]===false&&pilha[58]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    dialogos.ligação_Hospicio3.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.ligação_Hospicio3.fala.length&&pressingM[5]&&escritaTermina&&dialogos.ligação_Hospicio3.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.ligação_Hospicio3.fala.length) {
                            pilha[58] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            setTimeout(function(){pilha[59]=false},20000)
                        }
                    }
                }
                if (pilha[60]&&pilha[59]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    dialogos.reflect2.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.reflect2.fala.length&&pressingM[5]&&escritaTermina&&dialogos.reflect2.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.reflect2.fala.length) {
                            pilha[60] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            personagemX = 528
                            personagemY = 320
                            room[0] = true
                            room[1] = false
                            room[2] = false
                            room[3] = false
                            room[4] = false
                            BOXes.banheiro = false
                            BOXes.sala = false
                            BOXes.cozinha = false
                            BOXes.jardin = false
                            BOXes.quarto = true
                            semana=5
                        }
                    }
                }
            }else{
                //sexta 1.1
                if (pilha[53]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,1)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[53] = false
                    }
                }
                if (pilha[54]&&pilha[53]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,2)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[54] = false
                    }
                }
                if (pilha[55]&&pilha[54]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,3)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[55] = false
                    }
                }
                if (THECISIONS.sex[0]===true&&pilha[56]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Sala.escrita(true,help,4)
                    if (pressingM[5]) {
                        k=true
                        pilha[56] = false
                        setTimeout(function(){pilha[57]=false},20000)
                    }
                }
                if (pilha[57]===false&&pilha[58]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    dialogos.ligação_Hospicio2.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.ligação_Hospicio2.fala.length&&pressingM[5]&&escritaTermina&&dialogos.ligação_Hospicio2.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.ligação_Hospicio2.fala.length) {
                            pilha[58] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            TrabHosp = false
                        }
                    }
                }
                if (BOXes.HospitalRecpcao&&Hospital_Recep.Collider(HitboxInfo)&&((k===false&&pilha[58]===false)||enterPlace)&&pilha[59]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.Cirurgico.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.Cirurgico.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Cirurgico.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.Cirurgico.fala.length) {
                            pilha[59] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
                if (BOXes.HospitalRecpcao&&Hospital_Banco.Collider(HitboxInfo)&&((k===false&&pilha[59]===false)||enterPlace)&&pilha[59]===false&&pilha[60]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.conversa_desconhecida.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.conversa_desconhecida.fala.length&&pressingM[5]&&escritaTermina&&dialogos.conversa_desconhecida.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.conversa_desconhecida.fala.length) {
                            pilha[60] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
                if (pilha[60]===false&&pilha[61]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.uhh.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.uhh.fala.length&&pressingM[5]&&escritaTermina&&dialogos.uhh.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.uhh.fala.length) {
                            pilha[61] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
                if (pilha[62]&&pilha[61]===false) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    week().Falas_Hospital_Recpcao.escrita(true,help,0)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[62] = false
                    }
                }
                if (BOXes.HospitalRecpcao&&Hospital_Banco.Collider(HitboxInfo)&&((k===false&&pilha[62]===false)||enterPlace)&&pilha[62]===false&&pilha[63]&&THECISIONS.sex[1]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    week().Falas_Hospital_Recpcao.escrita(true,help,0,true)
                    TH('sex',1,false)
                    if (pressingM[5]) {
                        k=true
                        cronos=true
                        pilha[62] = false
                    }
                }
                if (THECISIONS.sex[1]===false&&pilha[62]===false&&pilha[63]&&BOXes.ponto) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.reflect1.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.reflect1.fala.length&&pressingM[5]&&escritaTermina&&dialogos.reflect1.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.reflect1.fala.length) {
                            pilha[63] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                            semana=5
                        }
                    }
                }
            }
        }
        //SABADOOOOOOO
        if (semana===5) {
            if (pilha[50]===false) {
                //sabado 2
                if (pilha[70]) {
                    room[15] = true
                    room[5] = false
                    personagemX = -10
                    BOXes.CasaMae = true
                    countdown = false
                    setTimeout(function(){countdown = true},1000)
                    BOXes.ponto = false
                    pilha[70] = false
                }
                if (pilha[70]===false&&pilha[69]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.acordaMae.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.acordaMae.fala.length&&pressingM[5]&&escritaTermina&&dialogos.acordaMae.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.acordaMae.fala.length) {
                            pilha[69] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
                if (entercasa.Collider(HitboxInfo)&&enterPlace&&countdown) {
                    pilha[71] = false
                }
                if (pilha[71]===false&&pilha[72]) {
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    cronos = false
                    star = true
                    id=4
                    if (pressingM[5]) {
                        star = false
                        id=-1
                        k = true
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                        dialogoHelper = 0
                        cronos=true
                        pilha[72] = false
                    }
                }
                if (pilha[72]===false&&pilha[73]&&(pressingM[1]||pressingM[0]||pressingM[2]||pressingM[3])) {
                    pilha[73] = false                    
                }
                if (pilha[73]===false&&pilha[74]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.seAcalmando.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.seAcalmando.fala.length&&pressingM[5]&&escritaTermina&&dialogos.seAcalmando.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.seAcalmando.fala.length) {
                            pilha[74] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                            cronos=true
                        }
                    }
                }
                if (pilha[74]) {
                    star = true
                    Final_Aceita.load(star)
                    Final_Aceita.DrawIt(star)
                }
            }else{
                //sabado 3
                if (pilha[70]) {
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    cronos=false
                    star = true
                    id=5
                    if (pressingM[5]) {
                        k=true
                        id=-1
                        pilha[70] = false
                    }
                }
                if (pilha[71]&&pilha[70]===false) {
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    cronos=false
                    star = true
                    id=6
                    if (pressingM[5]) {
                        k=true
                        id=-1
                        pilha[71] = false
                    }
                }
                if (pilha[72]&&pilha[71]===false) {
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    cronos=false
                    star = true
                    id=7
                }
                if (pilha[71]===false&&pilha[73]) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                        enterPlace = false
                    }
                    dialogos.Decisorios1.escrita(true,help,dialogoHelper)
                    if (dialogoHelper<dialogos.Decisorios1.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios1.fala[dialogoHelper]!==undefined) {
                        dialogoHelper++
                        help = 0
                        text = ''
                        chageMd(false)
                        escritaMD(false)
                    }else{
                        if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios1.fala.length) {
                            pilha[73] = false
                            k = true
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                            dialogoHelper = 0
                        }
                    }
                }
                if (pilha[73]===false&&THECISIONS.sab[0]===undefined) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Quarto.escrita(true,help,0,false,true,'Einar? Aconteceu alguma coisa?                           ','Einar? Tá tudo bem?')
                    if (pressingM[5]) {
                        k=true
                        pilha[74] = false
                    }
                }
                if (pilha[74]===false&&pilha[75]&&pilha[76]) {
                    if (THECISIONS.sab[0]) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios21.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios21.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios21.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios21.fala.length) {
                                pilha[75] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    } else {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios22.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios22.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios22.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios22.fala.length) {
                                pilha[76] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }
                }
                if (pilha[75]===false&&THECISIONS.sab[1]===undefined) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Quarto.escrita(true,help,0,false,true,'Perdido? Como assim?                                     ','faltou só por isso?')
                    if (pressingM[5]) {
                        k=true
                        pilha[76] = false
                    }
                }
                if (pilha[76]===false&&pilha[77]&&pilha[78]) {
                    if (THECISIONS.sab[1]===true) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios31.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios31.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios31.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios31.fala.length) {
                                pilha[77] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }else{
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios32.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios32.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios32.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios32.fala.length) {
                                pilha[78] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }
                }
                if (pilha[77]===false&&THECISIONS.sab[2]===undefined) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Quarto.escrita(true,help,0,false,true,'Ok Einar, pense bem                                      ','Ok Einar, você está')
                    if (pressingM[5]) {
                        k=true
                        pilha[78] = false
                    }
                }
                if (pilha[78]===false&&pilha[79]&&pilha[80]) {
                    if (THECISIONS.sab[2]===true) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios42.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios42.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios42.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios42.fala.length) {
                                pilha[79] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }else{
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios41.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios41.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios41.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios41.fala.length) {
                                pilha[80] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }
                }
                if (pilha[79]===false&&THECISIONS.sab[3]===undefined) {
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Quarto.escrita(true,help,0,false,true,'só por que você tá cansado?                               ','sentir cansado é algo natural')
                    if (pressingM[5]) {
                        k=true
                        pilha[81] = false
                    }
                }
                if (pilha[81]===false&&pilha[85]&&pilha[86]) {
                    if (THECISIONS.sab[3]===true) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios52.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios52.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios52.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios52.fala.length) {
                                pilha[85] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    } else {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios53.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios53.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios53.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios53.fala.length) {
                                pilha[86] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }
                }
                if (pilha[81]===false&&pilha[82]) {
                    TH('sab',1,false)
                    TH('sab',2,false)
                    cronos = false
                    if(k){
                        pressingM[5] = false
                        k = false
                        help = 0
                        text=''
                    }
                    week().Falas_Quarto.escrita(true,help,0,false,true,'Hermano, mesmo que                                        ','só por que você tá cansado?')
                    if (pressingM[5]) {
                        k=true
                        pilha[82] = false
                        pilha[83] = false
                    }
                }
                if (pilha[83]) {
                    if (THECISIONS.sab[3]===true) {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios51.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios51.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios51.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios51.fala.length) {
                                pilha[84] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    } else {
                        cronos = false
                        if(k){
                            pressingM[5] = false
                            k = false
                            help = 0
                            text=''
                            enterPlace = false
                        }
                        dialogos.Decisorios52.escrita(true,help,dialogoHelper)
                        if (dialogoHelper<dialogos.Decisorios52.fala.length&&pressingM[5]&&escritaTermina&&dialogos.Decisorios52.fala[dialogoHelper]!==undefined) {
                            dialogoHelper++
                            help = 0
                            text = ''
                            chageMd(false)
                            escritaMD(false)
                        }else{
                            if (pressingM[5]&&dialogoHelper>=dialogos.Decisorios52.fala.length) {
                                pilha[85] = false
                                k = true
                                help = 0
                                text = ''
                                chageMd(false)
                                escritaMD(false)
                                dialogoHelper = 0
                            }
                        }
                    }
                }
                if (pilha[84]===false) {
                    star=true
                    id=8
                }
                if (pilha[85]===false) {
                    id=9
                    star=true
                }
                if (pilha[86]===false) {
                    id=10
                    star=true
                }
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
        player.tab = TrabHosp
        localStorage.setItem('player',JSON.stringify(player))
        if (c) {
            console.log(cronologia)
            console.log(heppen)
            console.log(THECISIONS)
            console.log(pilha)
            a(pilha.length)
            console.log(semana)
            a(room)
            c = false
        }
        if(interaction===true&&text===''){
            interaction= false
        }
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
//quarta:{"ro":[true,false,false,false,false,false,false,false,false,false,false],"peX":480,"peY":320,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[],"qui":[],"sex":[]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":true,"SEMANA":2,"stare":false,"playede":[true,true,true,false,false,false,false],"Caixas":{"quarto":true,"banheiro":false,"cozinha":false,"sala":false,"jardin":false,"ponto":false,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]}
//quinta:{"ro":[true,false,false,false,false,false,false,false,false,false,false],"peX":528,"peY":320,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[true,true,false,false,false,true],"qui":[],"sex":[]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":true,"SEMANA":3,"stare":false,"playede":[true,true,true,true,true,false,false],"Caixas":{"quarto":true,"banheiro":false,"cozinha":false,"sala":false,"jardin":false,"ponto":false,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,false,false,true,true,true,false,false,true,false,true,false,false,true,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]}
//sexta1.1:{"ro":[false,false,false,true,false,false,false,false,false,false,false,false,false,false,false],"peX":295,"peY":289,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[true,true,false,false,false,true],"qui":[true,true,false,true],"sex":[]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":false,"SEMANA":4,"stare":false,"playede":[true,true,true,true,true,false,false],"Caixas":{"quarto":false,"banheiro":false,"cozinha":false,"sala":true,"jardin":false,"ponto":false,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false,"HospitalFrente":false,"HospitalRecpcao":false,"HospitalCorredor":false,"HospitalQuarto":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,false,false,true,true,true,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,false,false,false,false,false,true,true,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]}
//sexta1.2:{"ro":[false,false,false,true,false,false,false,false,false,false,false,false,false,false,false],"peX":295,"peY":359,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[true,true,false,false,false,true],"qui":[true,true,false,false,false],"sex":[]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":true,"SEMANA":4,"stare":false,"playede":[true,true,true,true,true,false,false],"Caixas":{"quarto":false,"banheiro":false,"cozinha":false,"sala":true,"jardin":false,"ponto":false,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false,"HospitalFrente":false,"HospitalRecpcao":false,"HospitalCorredor":false,"HospitalQuarto":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,false,false,true,true,true,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,true,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],"tab":false}
//sabado2:{"ro":[false,false,false,false,false,true,false,false,false,false,false,false,false,false,false],"peX":559,"peY":224,"decisions":{"dec":[false,false,false,true,false,true,true,true,true,false,true,true],"qua":[true,true,false,false,false,true],"qui":[true,true,false,true],"sex":[true,false]},"Cronologia":[false,true,1,true,false],"Cronoslogos":[true,true],"Cronos":true,"SEMANA":4,"stare":false,"playede":[true,true,true,true,true,false,false],"Caixas":{"quarto":false,"banheiro":false,"cozinha":false,"sala":false,"jardin":false,"ponto":true,"foraFabrica":false,"cozinhaFabrica":false,"fabricaRecept":false,"corredorFabrica":false,"escritorio":false,"HospitalFrente":false,"HospitalRecpcao":false,"HospitalCorredor":false,"HospitalQuarto":false},"pilhas":[false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true,true,true,false,false,true,true,true,false,false,true,false,true,false,false,true,false,false,false,false,false,false,true,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],"tab":false}
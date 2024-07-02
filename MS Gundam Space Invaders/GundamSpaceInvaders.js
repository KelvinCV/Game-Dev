// Mobile Suit Gundam: Space Invaders - Basic Version
// KelvinCV


// Instruções de controle
var playername = prompt("Jogador: ");
var instructions = confirm("Use as setas ESQUERDA e DIREITA para mover o GUNDAM. " + "\n" + "CIMA para atirar." +"\n" + "A e D para movimento newtype flash");

var tela;
var c;
var score = 0; // Contador da pontuação
var scoreRandom =  Math.round(Math.random() * 99 + 1)*10; // Pontuação vermelho
var lives = 3; // Contador das vidas
var cont = 0; // Contador de zakus atingidos
var contZakuBeta = 0; // Contador zaku alternativo para tiros

var gundam;
var stopGame = 0; // Ajuda a indentificar o fim de jogo
var laser;
var zakuLaser;
var zaku;
var zaku2;
var zaku3;
var zaku4;
var zaku5;
var zaku0;

var gundamX = 675;
var gundamY = 529;
var laserX = 690;
var laserY = 510;



var zakuX = 0;
var zakuY = 0;
var zaku2X = 0;
var zaku2Y = 0;
var zaku3X = 0;
var zaku3Y = 0;
var zaku4X = 0;
var zaku4Y = 0;
var zaku5X = 0;
var zaku5Y = 0;
var zaku0X = 0;
var zaku0Y = 0;

var inicioLaser = false;
var inicioZakuLaser = false;
var impactoLaserX;
var impactoZakuLaserX;
var laserMovendo;
var zakuLaserMovendo;
var intervalo = 40; // Altera velocidade do Zaku
var posicao = 0;
var posicaoZaku = 0
var posicaoZaku5 = 0;

var zaku0Linhas = [1290] // vermelho
var zaku0Colunas = [10];
var zakus0Restantes = [];

var zakuLinhas = [10, 50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690, 730, 770, 810, 850, 890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290];
var zakuColunas = [50];
var zakusRestantes = [];

var zaku2Linhas = [10, 50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690, 730, 770, 810, 850, 890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290]
var zaku2Colunas = [90];
var zakus2Restantes = [];

var zaku3Linhas = [10, 50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690, 730, 770, 810, 850, 890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290]
var zaku3Colunas = [130];
var zakus3Restantes = [];

var zaku4Linhas = [10, 50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690, 730, 770, 810, 850, 890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290]
var zaku4Colunas = [170];
var zakus4Restantes = [];

var zaku5Linhas = [10, 50, 90, 130, 170, 210, 250, 290, 330, 370, 410, 450, 490, 530, 570, 610, 650, 690, 730, 770, 810, 850, 890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290]
var zaku5Colunas = [210];
var zakus5Restantes = [];


const C_ALTURA = 580;
const C_LARGURA = 1350;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_A = 65;
const TECLA_D = 68;
const TECLA_W = 87;
const TECLA_S = 83;
const TECLA_Esc = 27;

// Checar se o localStorage está disponível (Application/LocalStorage/file://)
const isStorage = 'undefined' !== typeof localStorage;
if (isStorage && localStorage.getItem('Rank Score')){
    score = localStorage.getItem('Rank Score').split(',');
}

// Carregar sons
var bgm = document.getElementById('bgm');
var fire = new Audio();
var fire2 = new Audio();
var hit = new Audio();
var move = new Audio();
var newTypeFlash = new Audio();
var CharLine = new Audio();
var alarm = new Audio();
var sadMusic = new Audio();
var victoryTheme = new Audio();

fire.src = "sounds/fire.mp3"; fire. volume = 0.6; fire.playbackRate = 2.0;
fire2.src = "sounds/MachineGun3.mp3";
hit.src = "sounds/hit.mp3"; hit.volume = 0.3; hit.playbackRate = 1.5;
move.src = "sounds/move.mp3"; move.volume = 0.4;
newTypeFlash.src = "sounds/newTypeFlash.mp3"; newTypeFlash.volume = 0.4;
CharLine.src = "sounds/Icameheretolaughatyou.mp3"; CharLine.volume = 1.0;
alarm.src = "sounds/alarm.mp3"; alarm.volume = 0.8;
sadMusic.src = "sounds/A Sad Conclusion.mp3";
victoryTheme.src = "sounds/victoryTheme.mp3";


onkeydown = movergundam; // Define função chamada ao  pressionar uma tecla

iniciar(); // Chama função inicial do jogo

// Funções
function desistir(){
    if (instructions == false){
    fimDeJogo();
    
    }
}

function kelvin(){
    if (playername == "KELVIN"){
        score = Infinity + " ∞ ";
        fimDeJogo2();
    }       
}


function iniciar() {

    tela = document.getElementById("tela");
    c = tela.getContext("2d"); 
    c.fillstyle = '#000000';
    c.fillRect(0, 0, C_LARGURA, C_ALTURA);

    startTime();
    startScore();
    startLives();
    var str = new String(" | PONTOS |");
    document.write(str.fontcolor('green'));
    var str = new String("| VIDAS | ");
    document.write(str.fontcolor('red'));
    var str = new String("| TEMPO | ");
    document.write(str.fontcolor('white'));

    jogador.innerText=playername;

    posicionarzaku0();
    posicionarzaku();
    posicionarzaku2();
    posicionarzaku3();
    posicionarzaku4();
    posicionarzaku5();
    carregarImagens();
    

    setInterval("moverzakus0()", intervalo);
    setInterval("zaku0Atingido()", 6);  

	setInterval("moverzakus()", intervalo);
    setInterval("zakuAtingido()", 6);  
    
    setInterval("moverzakus2()", intervalo);
    setInterval("zaku2Atingido()", 6); 

    setInterval("moverzakus3()", intervalo);
    setInterval("zaku3Atingido()", 6); 

    setInterval("moverzakus4()", intervalo);
    setInterval("zaku4Atingido()", 6);

    setInterval("moverzakus5()", intervalo);
    setInterval("zaku5Atingido()", 6); 
    
   

    desistir();
    kelvin();

    

}

function posicionarzaku0() {
    for (var i = 0; i < zaku0Linhas.length; i++){
        for (var j = 0; j < zaku0Colunas.length; j++){
            var novozaku = {
                posX : zaku0Linhas[i],
                posY : zaku0Colunas[j],
                foiAtingido : false
			};
			
            zakus0Restantes[zakus0Restantes.length] = novozaku;
        }
    }
}

function posicionarzaku() {
    for (var i = 0; i < zakuLinhas.length; i++){
        for (var j = 0; j < zakuColunas.length; j++){
            var novozaku = {
                posX : zakuLinhas[i],
                posY : zakuColunas[j],
                foiAtingido : false
			};
			
            zakusRestantes[zakusRestantes.length] = novozaku;
        }
    }
}

function posicionarzaku2() {
    for (var i = 0; i < zaku2Linhas.length; i++){
        for (var j = 0; j < zaku2Colunas.length; j++){
            var novozaku = {
                posX : zaku2Linhas[i],
                posY : zaku2Colunas[j],
                foiAtingido : false
			};
			
            zakus2Restantes[zakus2Restantes.length] = novozaku;
        }
    }
}

function posicionarzaku3() {
    for (var i = 0; i < zaku3Linhas.length; i++){
        for (var j = 0; j < zaku3Colunas.length; j++){
            var novozaku = {
                posX : zaku3Linhas[i],
                posY : zaku3Colunas[j],
                foiAtingido : false
			};
			
            zakus3Restantes[zakus3Restantes.length] = novozaku;
        }
    }
}

function posicionarzaku4() {
    for (var i = 0; i < zaku4Linhas.length; i++){
        for (var j = 0; j < zaku4Colunas.length; j++){
            var novozaku = {
                posX : zaku4Linhas[i],
                posY : zaku4Colunas[j],
                foiAtingido : false
			};
			
            zakus4Restantes[zakus4Restantes.length] = novozaku;
        }
    }
}

function posicionarzaku5() {
    for (var i = 0; i < zaku5Linhas.length; i++){
        for (var j = 0; j < zaku5Colunas.length; j++){
            var novozaku = {
                posX : zaku5Linhas[i],
                posY : zaku5Colunas[j],
                foiAtingido : false
			};
			
            zakus5Restantes[zakus5Restantes.length] = novozaku;
        }
    }
}




function carregarImagens() {

    backgroundImage = new Image();
    backgroundImage.src = "img/spacebg.png";

    backgroundImage2 = new Image();
    backgroundImage2.src = "img/GameOver.png";

    backgroundImage3 = new Image();
    backgroundImage3.src = "img/GundamRX78-2Perfil.png"
    

    flag = new Image();
    flag.src = "img/zeonFlag.png";

    flag2 = new Image();
    flag2.src = "img/earthFederationFlag.png";

    gundam = new Image();
    gundam.src = "gundamRX78-2.png";
    gundam.onload = function(){
        c.drawImage(gundam, gundamX, gundamY);
    }

    nuGundam = new Image();
    nuGundam.src = "NuGundam.png";
    
    laser = new Image();
    laser.src = "laser.png";

    zakuLaser = new Image();
    zakuLaser.src = "enemyLaser.png";

    zaku = new Image();
    zaku.src = "zakuPreto.png";

    zaku2 = new Image();
    zaku2.src = "zakuAzul.png";

    zaku3 = new Image();
    zaku3.src = "zakuAmarelo.png";

    zaku4 = new Image();
    zaku4.src = "zakuRoxo.png";

    zaku5 = new Image();
    zaku5.src = "zaku.png";

    zaku0 = new Image();
    zaku0.src = "zakuChar2.png";

    newtype = new Image();
    newtype.src = "newtype.png";

}


function moverzakus(){
        if (posicaoZaku <= 65){
            zakuX += 1;
            posicaoZaku += 1;
            zakuLaserX += 1;
        } else if ((posicaoZaku > 65) && (posicaoZaku <= 80)){
            zakuX += 1;
            zakuY += 1;
            posicaoZaku += 1;
            zakuLaserX += 1;
            zakuLaserY += 1;            
        } else if ((posicaoZaku > 80) && (posicaoZaku <= 147)){
            zakuX -= 1;
            posicaoZaku += 1;
            zakuLaserX -= 1;
        } else if ((posicaoZaku > 147) && (posicaoZaku < 162)){
            zakuX -= 1;
            zakuY += 1;
            posicaoZaku += 1;
            zakuLaserX -= 1;
            zakuLaserY +=1
        } else{
            posicaoZaku = 0;
        }
        
        for (var i = 0; i < zakusRestantes.length; i++){
            if (!zakusRestantes[i].foiAtingido){
                c.fillRect((zakuX + zakusRestantes[i].posX - 1), (zakuY + zakusRestantes[i].posY - 1), 34, 34   );
                c.drawImage(zaku, (zakuX + zakusRestantes[i].posX), (zakuY + zakusRestantes[i].posY));
                
				
                if ((zakusRestantes[i].posY + zakuY + 31) >= 530){
                    alarm.play();
                    sadMusic.play();
                    fimDeJogo();
                }
            }
        }

}
// Posição incial da rajada de tiros dos inimigos
var zakuLaserX = zakuX+20;
var zakuLaserY = 220

function zakuAtingido(){
    for(var i = 0; i < zakusRestantes.length; i++){
        if ((laserY >= (zakuY + zakusRestantes[i].posY)) && (laserY <= (zakuY + zakusRestantes[i].posY + 20)) && 
            (impactoLaserX >= (zakuX + zakusRestantes[i].posX - 5)) && (impactoLaserX <= (zakuX + zakusRestantes[i].posX + 34))){
                
            if (!zakusRestantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((zakuX + zakusRestantes[i].posX - 1), (zakuY + zakusRestantes[i].posY - 1), 34, 34);
                zakusRestantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                score += 40;
                cont++;
                contZakuBeta++;
                hit.play();
                zaku0Again()
                checkVictory();
                
            }
        }
    }
}

function moverzakus2(){
        if (posicao <= 65){
            zaku2X += 1;
            posicao += 1;
        } else if ((posicao > 65) && (posicao <= 80)){
            zaku2X += 1;
            zaku2Y += 1;
            posicao += 1;            
        } else if ((posicao > 80) && (posicao <= 147)){
            zaku2X -= 1;
            posicao += 1;
        } else if ((posicao > 147) && (posicao < 162)){
            zaku2X -= 1;
            zaku2Y += 1;
            posicao += 1;
        } else{
            posicao = 0;
        }
        
        for (var i = 0; i < zakus2Restantes.length; i++){
            if (!zakus2Restantes[i].foiAtingido){
                c.fillRect((zaku2X + zakus2Restantes[i].posX - 1), (zaku2Y + zakus2Restantes[i].posY - 1), 34, 34 );
                c.drawImage(zaku2, (zaku2X + zakus2Restantes[i].posX), (zaku2Y + zakus2Restantes[i].posY));
                
				
                if ((zakus2Restantes[i].posY + zaku2Y + 31) >= 530){
                    alarm.play();
                    sadMusic.play();
                    fimDeJogo();
                }
            }
        }

}

function zaku2Atingido(){
    for(var i = 0; i < zakus2Restantes.length; i++){
        if ((laserY >= (zaku2Y + zakus2Restantes[i].posY)) && (laserY <= (zaku2Y + zakus2Restantes[i].posY + 20)) && 
            (impactoLaserX >= (zaku2X + zakus2Restantes[i].posX - 5)) && (impactoLaserX <= (zaku2X + zakus2Restantes[i].posX + 34))){
                
            if (!zakus2Restantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((zaku2X + zakus2Restantes[i].posX - 1), (zaku2Y + zakus2Restantes[i].posY - 1), 34, 34);
                zakus2Restantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                score += 20;
                cont++;
                hit.play();
                zaku0Again()
                checkVictory();
            }
        }
    }
}

function moverzakus3(){
        if (posicao <= 65){
            zaku3X += 1;
            posicao += 1;
        } else if ((posicao > 65) && (posicao <= 80)){
            zaku3X += 1;
            zaku3Y += 1;
            posicao += 1;            
        } else if ((posicao > 80) && (posicao <= 147)){
            zaku3X -= 1;
            posicao += 1;
        } else if ((posicao > 147) && (posicao < 162)){
            zaku3X -= 1;
            zaku3Y += 1;
            posicao += 1;
        } else{
            posicao = 0;
        }
        
        for (var i = 0; i < zakus3Restantes.length; i++){
            if (!zakus3Restantes[i].foiAtingido){
                c.fillRect((zaku3X + zakus3Restantes[i].posX - 1), (zaku3Y + zakus3Restantes[i].posY - 1), 34, 34 );
                c.drawImage(zaku3, (zaku3X + zakus3Restantes[i].posX), (zaku3Y + zakus3Restantes[i].posY));
                
				
                if ((zakus3Restantes[i].posY + zaku3Y + 31) >= 530){
                    alarm.play();
                    sadMusic.play();
                    fimDeJogo();
                }
            }
        }

}

function zaku3Atingido(){
    for(var i = 0; i < zakus3Restantes.length; i++){
        if ((laserY >= (zaku3Y + zakus3Restantes[i].posY)) && (laserY <= (zaku3Y + zakus3Restantes[i].posY + 20)) && 
            (impactoLaserX >= (zaku3X + zakus3Restantes[i].posX - 5)) && (impactoLaserX <= (zaku3X + zakus3Restantes[i].posX + 34))){
                
            if (!zakus3Restantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((zaku3X + zakus3Restantes[i].posX - 1), (zaku3Y + zakus3Restantes[i].posY - 1), 34, 34);
                zakus3Restantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                score += 20;
                cont++;
                hit.play();
                zaku0Again()
                checkVictory();
            }
        }
    }
}

function moverzakus4(){
        if (posicao <= 65){
            zaku4X += 1;
            posicao += 1;
        } else if ((posicao > 65) && (posicao <= 80)){
            zaku4X += 1;
            zaku4Y += 1;
            posicao += 1;            
        } else if ((posicao > 80) && (posicao <= 147)){
            zaku4X -= 1;
            posicao += 1;
        } else if ((posicao > 147) && (posicao < 162)){
            zaku4X -= 1;
            zaku4Y += 1;
            posicao += 1;
        } else{
            posicao = 0;
        }
        
        for (var i = 0; i < zakus4Restantes.length; i++){
            if (!zakus4Restantes[i].foiAtingido){
                c.fillRect((zaku4X + zakus4Restantes[i].posX - 1), (zaku4Y + zakus4Restantes[i].posY - 1), 34, 34 );
                c.drawImage(zaku4, (zaku4X + zakus4Restantes[i].posX), (zaku4Y + zakus4Restantes[i].posY));
                
				
                if ((zakus4Restantes[i].posY + zaku4Y + 31) >= 530){
                    alarm.play();
                    sadMusic.play();
                    fimDeJogo();
            
                }
            }
        }

}

function zaku4Atingido(){
    for(var i = 0; i < zakus4Restantes.length; i++){
        if ((laserY >= (zaku4Y + zakus4Restantes[i].posY)) && (laserY <= (zaku4Y + zakus4Restantes[i].posY + 20)) && 
            (impactoLaserX >= (zaku4X + zakus4Restantes[i].posX - 5)) && (impactoLaserX <= (zaku4X + zakus4Restantes[i].posX + 34))){
                
            if (!zakus4Restantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((zaku4X + zakus4Restantes[i].posX - 1), (zaku4Y + zakus4Restantes[i].posY - 1), 34, 34);
                zakus4Restantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                score += 10;
                cont++;
                hit.play();
                zaku0Again()
                checkVictory();
               
            }
        }
    }
}

function moverzakus5(){
        if (posicaoZaku5 <= 65){
            zaku5X += 1;
            posicaoZaku5 += 1;
        } else if ((posicaoZaku5 > 65) && (posicaoZaku5 <= 80)){
            zaku5X += 1;
            zaku5Y += 1;
            posicaoZaku5 += 1;            
        } else if ((posicaoZaku5 > 80) && (posicaoZaku5 <= 147)){
            zaku5X -= 1;
            posicaoZaku5 += 1;
            // Inicia os tiros inimigos
            if (zakuLaserY <= gundamY &&  contZakuBeta < 33){
                 inicioZakuLaser = true;
                c.drawImage(zakuLaser, zakuLaserX, zakuLaserY);
                impactoZakuLaserX = zakuLaserX;
                zakuLaserMovendo = setInterval("dispararZakuLaser()", 10);
            }
        } else if ((posicaoZaku5 > 147) && (posicaoZaku5 < 162)){
            zaku5X -= 1;
            zaku5Y += 1;
            posicaoZaku5 += 1;
        } else{
            posicaoZaku5 = 0;
        }
        
        for (var i = 0; i < zakus5Restantes.length; i++){
            if (!zakus5Restantes[i].foiAtingido){
                c.fillRect((zaku5X + zakus5Restantes[i].posX - 1), (zaku5Y + zakus5Restantes[i].posY - 1), 34, 34 );
                c.drawImage(zaku5, (zaku5X + zakus5Restantes[i].posX), (zaku5Y + zakus5Restantes[i].posY));
                
				
                if ((zakus5Restantes[i].posY + zaku5Y + 31) >= 530){
                    alarm.play();
                    sadMusic.play();
                    fimDeJogo();
                }
            }
        }

}

function zaku5Atingido(){
    for(var i = 0; i < zakus5Restantes.length; i++){
        if ((laserY >= (zaku5Y + zakus5Restantes[i].posY)) && (laserY <= (zaku5Y + zakus5Restantes[i].posY + 20)) && 
            (impactoLaserX >= (zaku5X + zakus5Restantes[i].posX - 5)) && (impactoLaserX <= (zaku5X + zakus5Restantes[i].posX + 34))){
                
            if (!zakus5Restantes[i].foiAtingido){
                c.fillStyle = "black";
                c.fillRect((zaku5X + zakus5Restantes[i].posX - 1), (zaku5Y + zakus5Restantes[i].posY - 1), 34, 34);
                zakus5Restantes[i].foiAtingido = true;
                c.fillRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                score += 10;
                cont++;
                hit.play();
                zaku0Again()
                checkVictory();
               
            }
        }
    }
}

function moverzakus0(){
    if (posicao <= 1290){
        zaku0X -= 1;
        posicao -= 1;
    
    } 
    
    for (var i = 0; i < zakus0Restantes.length; i++){
        if (!zakus0Restantes[i].foiAtingido){
            c.fillRect((zaku0X + zakus0Restantes[i].posX - 1), (zaku0Y + zakus0Restantes[i].posY - 1), 34, 34 );
            c.drawImage(zaku0, (zaku0X + zakus0Restantes[i].posX), (zaku0Y + zakus0Restantes[i].posY));
            
        }
    }

}

function zaku0Atingido(){
for(var i = 0; i < zakus0Restantes.length; i++){
    if ((laserY >= (zaku0Y + zakus0Restantes[i].posY)) && (laserY <= (zaku0Y + zakus0Restantes[i].posY + 20)) && 
        (impactoLaserX >= (zaku0X + zakus0Restantes[i].posX - 5)) && (impactoLaserX <= (zaku0X + zakus0Restantes[i].posX + 34))){
            
        if (!zakus0Restantes[i].foiAtingido){
            c.fillStyle = "black";
            c.fillRect((zaku0X + zakus0Restantes[i].posX - 1), (zaku0Y + zakus0Restantes[i].posY - 1), 34, 34);
            zakus0Restantes[i].foiAtingido = true;
            c.fillRect(impactoLaserX, laserY, 6, 19);
            laserY = 0;
            score += scoreRandom;
            hit.play();
        }
    }
}
}

// Diminui o contador de vida toda vez que é atingido
function gundamAtingido(){
    if (zakuLaserY <= gundamY && impactoZakuLaserX >= gundamX-5 && zakuLaserY <= gundamY && impactoZakuLaserX <= gundamX+15) {
        hit.play();
        lives-= 1;
        if(lives < 1){
            fimDeJogo();
        }
    }
}


// Tela de derrota
function fimDeJogo(){
    stopGame += 1;
    gundamX = 675;
    nuGundam = false;
    laserX = 690;
    laserY = 510;
    zakuX = 0;
    zakuY = 0;
    zaku2X = 0;
    zaku2Y = 0;
    zaku3X = 0;
    zaku3Y = 0;
    zaku4X = 0;
    zaku4Y = 0
    zaku5X = 0;
    zaku5Y = 0;
    zaku0X = 0;
    zaku0Y = 0;
    posicao = 0;
    posicaoZaku = 0;
    posicaoZaku5 = 0;
    zakusRestantes = [];
    zakus2Restantes =[];
    zakus3Restantes = [];
    zakus4Restantes = [];
    zakus5Restantes = [];
    zakus0Restantes = [];
    inicioLaser = false;
    inicioZakuLaser = false;
    bgm.pause();

    // Salva a pontuação atualizada e guarda no item 'Rank Scores -' no localStorage
     isStorage && localStorage.setItem('Rank Score - ' + playername,score);
    
   
    
    setTimeout('fimDeJogo()', 500);   
    
    c.drawImage(backgroundImage2, 0, 0);
    c.drawImage(flag,  525, 25 );

    c.textAlign = "center";
    c.font = "bolder 24px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Jogador: " + playername,  C_LARGURA/4.5, C_ALTURA/4.5-50);

    c.font = "bolder 24px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Pontuação: " + score,  C_LARGURA/4, C_ALTURA/4-40);

    c.font = "bolder 24px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Tempo: " + count + " s",  C_LARGURA/3.5, C_ALTURA/3.5-40);

    c.textAlign = "center";
    c.font = "italic bolder 24px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Você NÃO conseguiu impedir a invasão....",  C_LARGURA/2, 250);

    c.textAlign = "center";
    c.font = "bolder 50px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Gλme Over ", C_LARGURA/2+20, C_ALTURA/2+20)
    c.textAlign = "center";
   
    sadMusic.play();
    onkeydown = null;

}

// Tela de vitória
function fimDeJogo2(){
    stopGame += 1;
    gundamX = 675;
    nuGundam = false;
    laserX = 690;
    laserY = 510;
    zakuX = 0;
    zakuY = 0;
    zaku2X = 0;
    zaku2Y = 0;
    zaku3X = 0;
    zaku3Y = 0;
    zaku4X = 0;
    zaku4Y = 0
    zaku5X = 0;
    zaku5Y = 0;
    zaku0X = 0;
    zaku0Y = 0;
    posicao = 0;
    posicaoZaku = 0;
    posicaoZaku5 = 0;
    zakusRestantes = [];
    zakus2Restantes =[];
    zakus3Restantes = [];
    zakus4Restantes = [];
    zakus5Restantes = [];
    zakus0Restantes = [];
    inicioLaser = false;
    inicioZakuLaser = false;
    bgm.pause();

    // Salva a pontuação atualizada e guarda no item 'Rank Scores -' no localStorage
    isStorage && localStorage.setItem('Rank Score - ' + playername,score);
    
   
    
    setTimeout('fimDeJogo2()', 500);  
    
    c.drawImage(backgroundImage, 0, 0);
    c.drawImage(backgroundImage3, 0, 0);
    c.drawImage(flag2,  515, 10 );

    c.textAlign = "center";
    c.font = "bolder 24px Courier New";
    c.fillStyle = "darkblue";
    c.fillText("Jogador: " + playername,  C_LARGURA/4.5, C_ALTURA/4.5-50);
    
    c.font = "bolder 24px Courier New";
    c.fillStyle = "darkblue";
    c.fillText("Pontuação: " + score,  C_LARGURA/4, C_ALTURA/4-40);

    c.font = "bolder 24px Courier New";
    c.fillStyle = "darkblue";
    c.fillText("Tempo: " + count + " s",  C_LARGURA/3.5, C_ALTURA/3.5-40);
   
    c.textAlign = "center";
    c.font = "italic bolder 24px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Você conseguiu impedir a invasão",  C_LARGURA/2, 250);

    c.textAlign = "center";
    c.font = "bolder 50px Courier New";
    c.fillStyle = "yellow";
    c.fillText("Pλrabéns! ", C_LARGURA/2 +20, C_ALTURA/2+20)

    victoryTheme.play();
    onkeydown = null;

}


function movergundam(tecla){
    var codigo = tecla.keyCode;
    
    if ((codigo == TECLA_DIREITA) && (gundamX <= 1310)){
        c.fillStyle = "black";
        c.fillRect(gundamX,  527, 32, 37);
        gundamX += 20;
        laserX += 20;
        c.drawImage(gundam, gundamX, gundamY);
        bgm.play();
        move.play();
        if (score >= 5000) {
            c.drawImage(nuGundam, gundamX, gundamY);
        }   
    }
    
    if ((codigo == TECLA_ESQUERDA) && (gundamX >= 10)){ 
        c.fillStyle = "black";
        c.fillRect(gundamX,  527, 32, 37);
        gundamX -= 20;
        laserX -= 20;
        c.drawImage(gundam, gundamX, gundamY);
        bgm.play();
        move.play();
        if (score >= 5000) {
            c.drawImage(nuGundam, gundamX, gundamY);
        }   
    }
    
    if ((codigo == TECLA_ACIMA || codigo == TECLA_W) && !inicioLaser){
        inicioLaser = true;
        c.drawImage(laser, laserX, laserY);
        impactoLaserX = laserX;
        laserMovendo = setInterval("dispararLaser()", 0);
        
    }
        
    // Boost de movimento  - Newtype Flash
     if ((codigo == TECLA_D) && (gundamX <= 1350)){ 
        c.fillStyle = "black";
        c.fillRect(gundamX, 527, 320, 37);
        gundamX += 100;
        laserX += 100;
        c.drawImage(newtype, gundamX, gundamY);
        c.drawImage(gundam, gundamX, gundamY);
        bgm.play();
        newTypeFlash.play();
        if (score >= 5000) {
            c.drawImage(nuGundam, gundamX, gundamY);
        }   
    }

    if ((codigo == TECLA_A) && (gundamX >= 0)){ 
        c.fillStyle = "black";
        c.fillRect(gundamX, 527, 320, 37 );
        gundamX -= 100;
        laserX -= 100;
        c.drawImage(newtype, gundamX, gundamY);
        c.drawImage(gundam, gundamX, gundamY);
        bgm.play();
        newTypeFlash.play();
        if (score >= 5000) {
            c.drawImage(nuGundam, gundamX, gundamY);
        }   
    }
}

// Disparo do Gundam
function dispararLaser(){
    if (inicioLaser && (laserY >= 10)){
        laserY -= 10;
        c.fillStyle = "black";
        c.fillRect(impactoLaserX, (laserY + 10), 6, 19);
        fire.play();
		bgm.play();
        if (laserY >= 10){
            c.drawImage(laser, impactoLaserX, laserY);
        
        }
    }
	
    if (laserY < 10){
        clearInterval(laserMovendo);
        inicioLaser = false;
        laserY = 510;
    
    }
    if (score >= 5000) {
        c.drawImage(nuGundam, gundamX, gundamY);
    }   
   
}

// Disparo dos Zakus
function dispararZakuLaser(){
    if (inicioZakuLaser && (zakuLaserY >= 10 && zakuLaserY <= gundamY)  ){
        zakuLaserY += 10;
        c.fillStyle = "black";
        c.fillRect(impactoZakuLaserX, (zakuLaserY - 10), 6, 19);
        fire2.play();
        if (zakuLaserY >= 10 ){
            c.drawImage(zakuLaser, impactoZakuLaserX, zakuLaserY);
        
        }
    }
	
    if (zakuLaserY > gundamY){
        clearInterval(zakuLaserMovendo);
        inicioZakuLaser = false;
        zakuLaserY -= 285 - zakuY
        zakuLaserX += 4
        gundamAtingido();
        if( zakuLaserX >= 1340){
            zakuLaserX = zakuX
        }
        
        
    
    }   
}

// Checa condição de vitória (Todos os 165 zakus abatidos)
function checkVictory() {
if ( cont == 165 ) {
    fimDeJogo2();
    }
}

// Atualiza pontuação na tela IN GAME
var scoreTracker = 0

function startScore(){

  if ((score + 10) >= 0){
   scoreTracker += 10; 
}
else  if ((score + 20) >= 0){
    scoreTracker += 20; 
 }
 else  if ((score + 40) >= 0){
    scoreTracker += 40; 
 }
 pontos.innerText=score;
 setTimeout('startScore();', 0);
}

// Atualiza vidas na tela IN GAME
var lifeTracker = 3

function startLives(){

  if (lives >= 0){
    lifeTracker -= 1; 
    vidas.innerText=lives;
    setTimeout('startLives();', 0);
    }
}

// Faz o zaku0 aparecer novamente de acordo com número de zakus atingidos(cont)
function zaku0Again() {
    if (cont == 30 || cont == 60 || cont == 90 || cont == 120 || cont == 150){
        posicionarzaku0();
        CharLine.play();
    }
}

// Conta o tempo e faz o zaku0 aparecer novamente pelo tempo(count)
var count = 0

function startTime(){
     
if ((count + 1) >= 0 && stopGame == 0){
   count += 1;
   
   }
   if (count == 10 || count == 20 || count == 30 || cont == 40){
        posicionarzaku0();
   }
   
   setTimeout('startTime();', 1000);
   tempo.innerText=count; 
    }

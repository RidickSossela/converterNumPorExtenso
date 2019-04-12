const dicionary = []
dicionary[0] = ''
dicionary[1] = 'um'
dicionary[2] = 'dois'
dicionary[3] = 'três'
dicionary[4] = 'quatro'
dicionary[5] = 'cinco'
dicionary[6] = 'seis'
dicionary[7] = 'sete'
dicionary[8] = 'oito'
dicionary[9] = 'nove'
dicionary[10] = 'dez'
dicionary[11] = 'onze'
dicionary[12] = 'doze'
dicionary[13] = 'treze'
dicionary[14] = 'quatorze'
dicionary[15] = 'quinze'
dicionary[16] = 'dezeseis'
dicionary[17] = 'dezesete'
dicionary[18] = 'dezoito'
dicionary[19] = 'dezenove'
dicionary[20] = 'vinte'
dicionary[30] = 'trinta'
dicionary[40] = 'quarenta'
dicionary[50] = 'cinquenta'
dicionary[60] = 'sessenta'
dicionary[70] = 'setenta'
dicionary[80] = 'oitenta'
dicionary[90] = 'noventa'
dicionary[100] = 'cem'
dicionary[200] = 'duzentos'
dicionary[300] = 'trezentos'
dicionary[400] = 'quatrocentos'
dicionary[500] = 'quinhentos'
dicionary[600] = 'seiscentos'
dicionary[700] = 'setecentos'
dicionary[800] = 'oitocentos'
dicionary[900] = 'novecentos'

console.log( toExtenso('102100.10') );


function toExtenso(num){
    if(num == '' || num == 0){
        return '';
    }

    if(hasCharacter(num) != null){
        return '';
    }

    num = num.toString();
    let valor = num.split('.');
    let reais = '';
    if(parseInt(valor[0]) > 0){
        reais = valor[0].replace(/^0+/, '');
        reais = fetchNumber(reais);
        reais += ' reais';
    }
    let centavos ='';
    if(typeof valor[1] != 'undefined' && parseInt(valor[1]) > 0){
        centavos = valor[1].replace(/^0+/, '');
        centavos = centavos.slice(0,2);
        centavos = fetchNumber(centavos);
        
        centavos += ' centavos';
    }
    if(reais != '' && centavos != ''){
        return reais +' e '+ centavos;
    }else{
        return reais + centavos;
    }
    
}
/**
 * Retorna Null se não conter letras
 * @param {string } n 
 */
function hasCharacter(n){
    n = n.replace(/\.|,/g,'');
    return n.match(/\D+/gi);
}

function fetchNumber(num){
    let res = dicionary[num];
    if(typeof res == 'undefined'){
        //Numeros inteiros de duas casas (21 - 99)
        if( num.length == 2){
            res = dezenas(num);
        }
        //Numeros inteiros de três casas (101 - 999)
        if( num.length == 3){
            res = centenas(num);
        }
        //Numeros inteiros com mais que 3 casas (1000 - 999999)
        if( num.length >3){
            let inicio = num.slice(0,-3)
            let final = num.slice(-3);
            res = milhar(inicio,final);
        }
    }
    return res;
}

function roundNumber(num){
    let result = num[0];
    for(let i=1; i<num.length; i++){
        result += '0'; 
    }
    return result;
}

function unidades(num){
    return dicionary[num];
}

function dezenas(num){
    let stringNumber = dicionary[num];
    if(typeof stringNumber != 'undefined'){
        return stringNumber;
    }
    
    let dezena = 0;
    let d ;
    let u;
    if(num[0] != 0){
        dezena = roundNumber(num);
        d = dicionary[dezena];
        u = unidades(num[1]);
        stringNumber = d + ' e ' + u;
    }else{
        u = unidades(num[1]);
        stringNumber = u;
    }   
    
    return stringNumber;  
}

function centenas(num){
    let stringNumber = dicionary[num];
    if(typeof stringNumber != 'undefined'){
        return stringNumber;
    }
    
    let centena = 0;
    let d;
    let c;
    if(num[0] != 0){    
        centena = roundNumber(num);
        c = dicionary[centena];
        d = dezenas(num[1]+num[2]);
        if(c == 'cem' && d != ''){
            c = 'cento';
        }
        stringNumber = c +' e '+ d;
    }else{
        d = dezenas(num[1]+num[2]);
        stringNumber = d;
    }
    
    return stringNumber; 
}

function milhar(inicio,final){
    let milhar;
    
    if(inicio.length == 1){
        milhar = unidades(inicio);
    }
    if(inicio.length == 2){
        milhar = dezenas(inicio);
    }
    if(inicio.length == 3){
        milhar = centenas(inicio);
    }
    let resto = '';
    if(final == 0){
        return milhar+ ' mil ';
    }
    resto = centenas(final);
    stringNumber = milhar+ ' mil e ' +resto;
    return stringNumber; 
}
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

toExtenso(329461.93);

function toExtenso(num){
    num = num.toString();
    let valor = num.split('.');
    let reais = valor[0];
    let centavos = valor[1];

teste = fetchNumber(reais);
    console.log( teste );
}

function fetchNumber(num){
    let res = dicionary[num];
    if(typeof res == 'undefined'){
    //Numeros de cuas casa demais. (21 - 99)
        if( num.length == 2){
            res = dezenas(num);
        }
    //Numeros de 3 casas demais. (101 - 999)
        if( num.length == 3){
            res = centenas(num);
        }
    //Numeros de casas demais maior que3
        if( num.length >3){
            let inicio = num.slice(0,-3)
            let final = num.slice(-3);
            res = milhar(inicio,final);
        }
    }
    return res;
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

function roundNumber(num){
    let result = num[0];
    for(let i=1; i<num.length; i++){
        result += '0'; 
    }
    return result;
}
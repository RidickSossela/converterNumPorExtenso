    new Vue({
      el: '#app',
      data: function(){
        return { 
          dicionario: {
            0 : '',1 : 'um',2 : 'dois',3 : 'três',4 : 'quatro',5 : 'cinco',6 : 'seis',7 : 'sete',8 : 'oito',9 : 'nove',10 : 'dez',
            11 : 'onze',12 : 'doze',13 : 'treze',14 : 'quatorze',15 : 'quinze',16 : 'dezeseis',17 : 'dezesete',18 : 'dezoito',19 : 'dezenove',
            20 : 'vinte',30 : 'trinta',40 : 'quarenta',50 : 'cinquenta',60 : 'sessenta',70 : 'setenta',80 : 'oitenta',90 : 'noventa',
            100 : 'cem',200 : 'duzentos',300 : 'trezentos',400 : 'quatrocentos',500 : 'quinhentos',600 : 'seiscentos',700 : 'setecentos',800 : 'oitocentos',900 : 'novecentos',
          },
          title: "Escrever numeros por extenso",
          valor: 'R$ ',
          numeroPorExtenso: '',
          valorInvalido: false
        }
      },
      
      methods:{
        inicio: function(){
          let numero =  this.valor.replace(/[r$ ]/gi,'');
          this.numeroPorExtenso = this.converter(numero);
          this.numeroPorExtenso ? this.numeroPorExtenso = this.primeiraLetraMaiuscula(this.numeroPorExtenso)
          : this.numeroPorExtenso = ""   
          
        },
        converter: function (num){
          if(num == '' || num == 0){
            return '';
          }
          
          if(this.VerificaCaractere(num) != null){
            return '';
          }
          
          num = num.toString();
          
          let valor = num.split(/[,.] *| +/); //Divide a string em um array separando por '.' ou ','
          let reais = '';
          
          if(parseInt(valor[0]) > 0){
            reais = valor[0].replace(/^0+/, '');
            reais = this.pesquisaNumero(reais);
            if(this.valorInvalido){
              reais = 'Digite um numero com ate 6 digitos!'
              this.valorInvalido = false
            }else{
              this.valorInvalido = false
              reais == 'um' ? reais += ' real' : reais += ' reais'
            }
          }
          
          let centavos ='';
          
          if(typeof valor[1] != 'undefined' && parseInt(valor[1]) > 0){
            centavos = valor[1].replace(/^0+/, '');
            centavos = centavos.slice(0,2);
            centavos = this.pesquisaNumero(centavos);
            
            centavos == 'um' ? centavos += ' centavo' : centavos += ' centavos';
          }
          
          if(reais != '' && centavos != ''){
            return reais +' e '+ centavos;
          }else{
            return reais + centavos;
          }
          
        },
        VerificaCaractere: function (n){
          n = n.replace(/\.|,/g,'');
          return n.match(/\D+/gi);
        },
        primeiraLetraMaiuscula: function(str){
          return str[0].toUpperCase() + str.slice(1);
        },
        pesquisaNumero: function(num){
          let res = this.dicionario[num];
          if(typeof res == 'undefined'){
            //Numeros inteiros de duas casas (21 - 99)
            if( num.length == 2){
              res = this.dezenas(num);
            }
            //Numeros inteiros de três casas (101 - 999)
            if( num.length == 3){
              res = this.centenas(num);
            }
            //Numeros inteiros com mais que 3 casas (1000 - 999999)
            if( num.length > 3){
              let inicio = num.slice(0,-3)
              let final = num.slice(-3);
              res = this.milhar(inicio,final);
            }
            if(num.length >= 7){
              this.valorInvalido = true
            }
          }
          return res;
        },
        arredondarNumero :function(num){
          let result = num[0];
          for(let i=1; i<num.length; i++){
            result += '0'; 
          }
          return result;
        },
        unidades: function(num){
          return this.dicionario[num];
        },
        dezenas: function (num){
          let stringNumber = this.dicionario[num];
          if(typeof stringNumber != 'undefined'){
            return stringNumber;
          }
          
          let dezena = 0;
          let d ;
          let u;
          
          if(num[0] != 0){
            dezena = this.arredondarNumero (num);
            d = this.dicionario[dezena];
            u = this.unidades(num[1]);
            stringNumber = d + ' e ' + u;
          }else{
            u = this.unidades(num[1]);
            stringNumber = u;
          }   
          
          return stringNumber;  
        },
        centenas: function (num){
          let stringNumber = this.dicionario[num];
          if(typeof stringNumber != 'undefined'){
            return stringNumber;
          }
          
          let centena = 0;
          let d;
          let c;
          if(num[0] != 0){    
            centena = this.arredondarNumero (num);
            c = this.dicionario[centena];
            d = this.dezenas(num[1]+num[2]);
            if(c == 'cem' && d != ''){
              c = 'cento';
            }
            stringNumber = c +' e '+ d;
          }else{
            d = this.dezenas(num[1]+num[2]);
            stringNumber = d;
          }
          
          return stringNumber; 
        },
        milhar: function (inicio,final){
          let milhar;
          
          if(inicio.length == 1){
            milhar = this.unidades(inicio);
          }
          if(inicio.length == 2){
            milhar = this.dezenas(inicio);
          }
          if(inicio.length == 3){
            milhar = this.centenas(inicio);
          }
          let resto = '';
          if(final == 0){
            return milhar+ ' mil ';
          }
          resto = this.centenas(final);
          let stringNumber = milhar+ ' mil e ' +resto;
          return stringNumber; 
        }
      }
    })
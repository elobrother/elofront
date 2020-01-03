function value(posAtual,posDesejado) {
        let valorTotal=0
        let valorRelativo=0
        let primeiroValor=0
        let eloRange=0
        const produtos = [
            {nome: 'FerroIV',id: 1,valor: 13},
            {nome: 'FerroIII',id: 2,valor: 13},
            {nome: 'FerroII',id: 3,valor: 13},
            {nome: 'FerroI',id: 4,valor: 13},
            {nome: 'BronzeIV',id: 5,valor: 13},
            {nome: 'BronzeIII',id: 6,valor: 13},
            {nome: 'BronzeII',id: 7,valor: 13},
            {nome: 'BronzeI',id: 8,valor: 13},
            {nome: 'PrataIV',id: 9,valor: 18},
            {nome: 'PrataIII',id: 10,valor: 18},
            {nome: 'PrataII',id: 11,valor: 18},
            {nome: 'PrataI',id: 12,valor: 18},
            {nome: 'OuroIV',id: 13,valor: 25},
            {nome: 'OuroIII',id: 14,valor: 25},
            {nome: 'OuroII',id: 15,valor: 25},
            {nome: 'OuroI',id: 16,valor: 25},
            {nome: 'PlatinaIV',id: 17,valor: 45},
            {nome: 'PlatinaIII',id: 18,valor: 45},
            {nome: 'PlatinaII',id: 19,valor: 45},
            {nome: 'PlatinaI',id: 20,valor: 45},
            {nome: 'DiamanteIV',id: 21,valor: 140},
            {nome: 'DiamanteIII',id: 22,valor: 140},
            {nome: 'DiamanteII',id: 23,valor: 140},
            {nome: 'DiamanteI',id: 24,valor: 140},
        ]

        primeiroValor=produtos.filter(e=>{
            if(e.id==posAtual){
                return e.valor
            }
        }).shift().valor
        console.log(primeiroValor) 
        eloRange=produtos.filter(e=>{
            if(e.id>=posAtual && e.id<=posDesejado){
                return true
            }
            return false;
        })
        // eloRange = produtos.filter(e=>{
        //     return e.id<=posDesejado
        // }).filter(e=>{
        //     return e.id>=posAtual
        // })
        console.log(eloRange)

        valoresSeparados = eloRange.map(i =>i.valor)
        valorRelativo=valoresSeparados.reduce((acom,elem)=>{
            return acom+=elem
        })
        console.log(valorRelativo)
        valorTotal = valorRelativo - primeiroValor
        console.log(valorTotal)
        return valorTotal
    }

module.exports.value = value;
function value(element) {
    const produtos = [
        {nome: 'FerroIV',id: 1},
        {nome: 'FerroIII',id: 2},
        {nome: 'FerroII',id: 3},
        {nome: 'FerroI',id: 4},
        {nome: 'BronzeIV',id: 5},
        {nome: 'BronzeIII',id: 6},
        {nome: 'BronzeII',id: 7},
        {nome: 'BronzeI',id: 8},
        {nome: 'PrataIV',id: 9},
        {nome: 'PrataIII',id: 10},
        {nome: 'PrataII',id: 11},
        {nome: 'PrataI',id: 12},
        {nome: 'OuroIV',id: 13},
        {nome: 'OuroIII',id: 14},
        {nome: 'OuroII',id: 15},
        {nome: 'OuroI',id: 16},
        {nome: 'PlatinaIV',id: 17},
        {nome: 'PlatinaIII',id: 18},
        {nome: 'PlatinaII',id: 19},
        {nome: 'PlatinaI',id: 20},
        {nome: 'DiamanteIV',id: 21},
        {nome: 'DiamanteIII',id: 22},
        {nome: 'DiamanteII',id: 23},
        {nome: 'DiamanteI',id: 24},
    ]
    const resp=produtos.filter((e) => {
        if(e.nome==element){ return e.id; }
    })
    return resp;
}
module.exports.value =  value;

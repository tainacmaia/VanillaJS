const tabela = document.createElement("table");
const cabecalho = document.createElement("thead");
const corpo = document.createElement("tbody");
const rodape = document.createElement("tfoot");

document.getElementById('table').appendChild(tabela);

const animais = [
    {
        nome: 'Onça-pintada',
        especie: 'Panthera onca',
        pais: 'Brasil',
        numExemplares: 10000
    },
    {
        nome: 'Lobo-guará',
        especie: 'Chrysocyon brachyurus',
        pais: 'Brasil',
        numExemplares: 50
    },
    {
        nome: 'Panda Gigante',
        especie: 'Ailuropoda melanoleuca',
        pais: 'China',
        numExemplares: 2500
    },
    {
        nome: 'Baleia-fin',
        especie: 'Balaenoptera physalus',
        pais: 'Oceano Pacífico',
        numExemplares: 1000
    },
    {
        nome: 'Arara-azul',
        especie: 'Anodorhynchus leari',
        pais: 'Brasil',
        numExemplares: 1200
    },
    {
        nome: 'Pinguim-africano',
        especie: 'Spheniscus demersus',
        pais: 'África do Sul',
        numExemplares: 50000
    },
    {
        nome: 'Peixe-boi-marinho',
        especie: 'Trichecus manatus Linnaeus',
        pais: 'Brasil',
        numExemplares: 500
    },
    {
        nome: 'Gorila-da-montanha',
        especie: 'Gorilla beringei beringei',
        pais: 'Wakanda',
        numExemplares: 1000
    },
    {
        nome: 'Condor-californiano',
        especie: 'Gymnogyps californianus',
        pais: 'Estados Unidos/México',
        numExemplares: 430        
    },
    {
        nome: 'Baleia-azul',
        especie: 'Balaenoptera musculus',
        pais: 'Antártica',
        numExemplares: 3000        
    }
]

const itens = [
    'Nome', 'Espécie', 'País', 'Nº de Exemplares'
]

itens.forEach(item => {
    const th = document.createElement('th')
    th.innerText = item;
    cabecalho.appendChild(th);
});

let totalAnimais = 0; 

for (let i=0; i<animais.length; i++) {
    const tr = document.createElement("tr");
    for(let j=0;j<itens.length;j++){
    const t = document.createElement("td");
    const texto=document.createTextNode(Object.values(animais[i])[j]);
    t.appendChild(texto);
    tr.appendChild(t);
    if (j == 3){
        totalAnimais+= Object.values(animais[i])[j];
    }
    }
    corpo.appendChild(tr);
}

const tr = document.createElement('tr')
tr.innerText = `Total de animais: ${totalAnimais}`;
rodape.appendChild(tr)

tabela.appendChild(cabecalho);
tabela.appendChild(corpo);
tabela.appendChild(rodape);

Object.assign(tabela.style, {
    border: '10px solid black',
    'font-size': '30px',
    textAlign: 'center',
    })

Object.assign(tabela.childNodes[0].style, {
    'font-size': '35px',
})

for (let i=0; i<animais.length; i++) {
    Object.assign(tabela.childNodes[1].childNodes[i].childNodes[1].style, {
        'font-style': 'italic',
    })  
}
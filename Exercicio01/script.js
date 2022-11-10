parser = new DOMParser();
const docXML = parser.parseFromString(
`<produtos>
    <produto>
        <titulo>Camiseta Esportiva</titulo>
        <descricao>Com tecnologia inovadora que, além de controlar o calor, ajuda a reduzir a transpiração.</descricao>
        <preco>35,50</preco>
    </produto>
    <produto>
        <titulo>Bermuda Jeans</titulo>
        <descricao>Bordada no estilo ROCK! 100% Algodão.</descricao>
        <preco>54,62</preco>
    </produto>
    <produto>
        <titulo>Calça Moletom</titulo>
        <descricao>Básica com modelagem reta, perfeita para o look confortável, com forro peludinho.</descricao>
        <preco>79,90</preco>
    </produto>
</produtos>`,'text/xml');

const produtos = document.querySelectorAll('div[data-item]')

const section = document.createElement('section');
let count = 1;

const h1 = document.createElement('h1')
const p = document.createElement('p')
const span = document.createElement('span')  

for (let i = 0; i < produtos.length; i++) {  
  const div = document.createElement('div')
  section.appendChild(div)
  
  h1.innerText = docXML.getElementsByTagName('titulo')[i].textContent
  div.appendChild(h1)

  p.innerText = docXML.getElementsByTagName('descricao')[i].textContent
  div.appendChild(p)

  span.innerText = docXML.getElementsByTagName('preco')[i].textContent
  div.appendChild(span)

  document.body.childNodes[1].childNodes[count].innerHTML = div.innerHTML;

  count +=2
}



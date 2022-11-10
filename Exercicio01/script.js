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

for (let i = 0; i < produtos.length; i++) {  
  const div = document.createElement('div')
  section.appendChild(div)

  const titulo = docXML.getElementsByTagName('titulo')[i].textContent
  const descricao = docXML.getElementsByTagName('descricao')[i].textContent
  const preco = docXML.getElementsByTagName('preco')[i].textContent

  let h1 = document.createElement('h1')
  h1.innerText = titulo;
  div.appendChild(h1)

  let p = document.createElement('p')
  p.innerText = descricao;
  div.appendChild(p)

  let span = document.createElement('span')
  span.innerText = preco;
  div.appendChild(span)

  document.body.childNodes[1].childNodes[count].innerHTML = div.innerHTML;

  count +=2
}



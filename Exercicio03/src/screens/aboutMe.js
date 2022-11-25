window.Page.aboutMe = {
    Body: async () => {
        main.innerHTML = "";
        const section = utils.CreateElementWithAttribute('section', 'class', 'about-me');
        const img = utils.CreateElementWithAttribute('img', 'src', '../../src/assets/taina.jpg');
        const p = document.createElement('p');
        p.innerText = "Projeto desenvolvido por Taina Maia durante o módulo de Front End Dinâmico da Let's Code by Ada"
        section.append(img, p)
        main.append(section)
    }
}
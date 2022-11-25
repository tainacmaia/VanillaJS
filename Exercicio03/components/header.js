window.Header = () => {
    const header = document.createElement('header');
    const nav = utils.CreateElementWithAttribute('nav', 'class', 'headerNav');
    const ul = document.createElement('ul');

    const navLinks = [
        {text: "HOME", onClick: () => {Page.home.Body()}},
        {text: "LIVROS", onClick: () => {Page.books.Body()}},
        {text: "INFO", onClick: () => {Page.aboutMe.Body()}},
    ]

    navLinks.forEach(page =>{
        const item = document.createElement('li');
        item.textContent = page.text;
        item.addEventListener("click", page.onClick);
        ul.appendChild(item);
    });
    nav.appendChild(ul);
    header.appendChild(nav);
    document.body.appendChild(header);  
};
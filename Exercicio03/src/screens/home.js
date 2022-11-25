window.Page.home = {
    Body: async () => {
        main.innerHTML = "";
        const section = utils.CreateElementWithAttribute('section', 'class', 'welcome');
        const title = document.createElement('h1');
        title.innerText = "SKYRIM BOOKSTORE";
        section.appendChild(title);

        const title2 = document.createElement('h2');
        title2.innerText = "A melhor de Tamriel";
        section.appendChild(title2);

        main.appendChild(section);
    }
};
window.Page.books = {
    Body: async () => {
        main.innerHTML = "";
        const tableHeadNames = ['TÍTULO', 'AUTOR', 'DESCRIÇÃO', 'TIRAGEM']
        let initialBooks= []

        const booksList = await services.GetBooks();

        booksList.forEach(element => {
            initialBooks.push({
            uid: element.uid,
            titulo: element.titulo,
            autor: element.autor,
            descricao: element.descricao,
            tiragem: element.tiragem
            })
        });

        let newTable = general.CreateTable(initialBooks, tableHeadNames);

        const section = utils.CreateElementWithAttribute('section', 'class', 'books');
        const h1 = document.createElement('h1');
        h1.innerText = "Confira nossos livros"     

        const searchDiv = utils.CreateElementWithAttribute('div', 'class', 'search-books');
        const searchSelect = document.createElement('select')
        const option0 = utils.CreateElementWithAttribute('option', 'value', 'Buscar por...')
        option0.innerText = 'Buscar por...'
        const option1 = utils.CreateElementWithAttribute('option', 'value', 'TÍTULO')
        option1.innerText = 'TÍTULO'
        const option2 = utils.CreateElementWithAttribute('option', 'value', 'AUTOR')
        option2.innerText = 'AUTOR'
        searchSelect.append(option0, option1, option2)
        const searchInput = utils.CreateElementWithAttribute('input','placeholder', 'Buscar palavra-chave...');
        const searchButton = utils.CreateButton('Buscar','search-button');
        const addButton = utils.CreateButton('Novo Livro','add-button');
        addButton.setAttribute('onclick', 'general.SendBook()')       
        
        searchDiv.append(searchSelect, searchInput, searchButton, addButton)

        const mainDiv = utils.CreateElementWithAttribute('div', 'id', 'main-div');
        const booksDiv = utils.CreateElementWithAttribute('div', 'class', 'books-div');

        booksDiv.append(newTable)

        const asideDiv = utils.CreateElementWithAttribute('aside', 'class', 'last-search');
        asideDiv.innerText = 'Últimas buscas:'
        let lastSearches = []
        lastSearches = JSON.parse(sessionStorage.getItem('books')) || [];
        let lastTypes = []
        lastTypes = JSON.parse(sessionStorage.getItem('type')) || [];
        if (lastSearches.length != 0) { 
            let tagA = [];              
            lastSearches.forEach(item => {  
                const a = document.createElement ('a')                               
                a.innerText = item;          
                asideDiv.append(a)
                tagA.push(a)
            })            
            for(let i = 0; i < lastTypes.length; i++){
                console.log('ultima busca', lastSearches[i])
                tagA[i].addEventListener('click', (() => {general.SearchBook(newTable, tableHeadNames, booksList, lastSearches[i], booksDiv, lastTypes[i])}))
            }                     
        }      

        const editDiv = utils.CreateElementWithAttribute('div', 'id', 'edit-div');
        
        mainDiv.append(h1, searchDiv, booksDiv)
        section.append(mainDiv, asideDiv)
        main.append(section,editDiv)

        searchButton.addEventListener('click', CallSearch)

        async function CallSearch() {
            if(searchInput.value != '' && searchSelect.value != 'Buscar por...') {  
                general.SearchBook(newTable, tableHeadNames, booksList, searchInput.value, booksDiv, searchSelect.value)   
                await general.CallStorageService(searchInput.value, 'books'); 
                await general.CallStorageService(searchSelect.value, 'type');    
                let totalTags = document.getElementsByTagName('a')          
                const a = document.createElement ('a')
                if (totalTags.length > 2) {
                    console.log(totalTags[0].innerText)
                    tmpSearch = JSON.parse(sessionStorage.getItem('books'));
                    delete tmpSearch[[0]];
                    tmpType = JSON.parse(sessionStorage.getItem('type'));
                    delete tmpType[[0]];
                    let newList = []
                    let newType = []
                    for(let i = 0; i < tmpSearch.length; i++) {
                        if(tmpSearch[i] != null){
                            newList.push(tmpSearch[i])
                            newType.push(tmpType[i])
                        }
                        if(i == tmpSearch.length - 1){
                            sessionStorage.setItem('books', JSON.stringify(newList));
                            sessionStorage.setItem('type', JSON.stringify(newType));
                        }
                    }                
                    totalTags[0].remove()
                }
                a.innerText = searchInput.value;
                a.addEventListener('click', (() => {general.SearchBook(newTable, tableHeadNames, booksList, searchInput.value, booksDiv, searchSelect.value)}))              
                asideDiv.append(a)
            }
            else {
                alert('Digite um texto e selecione o tipo de busca.')
            }
        }             
    }
}
window.general = {
    CreateTable: (row, tableHead) => {
        const table = utils.CreateElementWithAttribute('table', 'id', 'books-table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
    
        tableHead.forEach(item => {
            const th = document.createElement('th')
            th.innerText = item;
            thead.appendChild(th);
        });
    
        for (let i = 0; i < row.length; i++) {
            const tr = document.createElement("tr");
            for(let j = 1; j < tableHead.length + 1; j++) {
                const td = document.createElement("td");
                const texto = document.createTextNode(Object.values(row[i])[j]);
                td.appendChild(texto);
                tr.appendChild(td);
                if (j == tableHead.length ) {
                    const buttonsTd = document.createElement("td");
                    const buttonEdit = document.createElement('button');
                    const iconEdit = document.createElement('img');
                    iconEdit.setAttribute('src', './src/assets/edit_icon.svg');
                    buttonEdit.setAttribute('class', Object.values(row[i])[0]);
                    buttonEdit.appendChild(iconEdit);
                    buttonEdit.setAttribute('onclick', 'general.SendBook(this.className)')
                    buttonsTd.appendChild(buttonEdit);        
                    const buttonDelete = document.createElement('button');
                    const iconDelete = document.createElement('img');
                    iconDelete.setAttribute('src', './src/assets/delete_icon.svg');
                    buttonDelete.setAttribute('class',Object.values(row[i])[0]);
                    buttonDelete.setAttribute('onclick', 'general.DeleteBook(this.className)')
                    buttonDelete.appendChild(iconDelete);
                    buttonsTd.appendChild(buttonDelete);
                    tr.appendChild(buttonsTd);
                }
                
            }
            tbody.appendChild(tr);
        }
    
        table.appendChild(thead)
        table.appendChild(tbody)
    
        return table;
    },

    ClearTable: () => {
        const table = document.querySelector('table');
        table.remove();
    },
    
    RecreateTable: (table, items, headNames, tag) => {
        general.ClearTable();
        table = general.CreateTable(items, headNames)
        tag.appendChild(table)
        return table;
    },

    SendBook: async (uid = '') => {
        const editDiv = document.getElementById('edit-div')
        editDiv.style.display = 'flex'
        editDiv.textContent = '';
        editDiv.innerHTML = '';
        const titleLabel = document.createElement('label');
        titleLabel.innerText = 'Título: ';
        const titleInput = utils.CreateElementWithAttribute('input', 'id', 'title-input');
        const authorLabel = document.createElement('label');
        authorLabel.innerText = 'Autor: ';
        const authorInput = utils.CreateElementWithAttribute('input', 'id', 'author-input');
        const descriptionLabel = document.createElement('label');
        descriptionLabel.innerText = 'Descrição: ';
        const descriptionInput = utils.CreateElementWithAttribute('input', 'id', 'description-input');
        const totalLabel = document.createElement('label');
        totalLabel.innerText = 'Tiragem: ';
        const totalInput = utils.CreateElementWithAttribute('input', 'id', 'total-input');
        const sendButton = utils.CreateButton('Enviar')
        sendButton.setAttribute('id', 'enviar')
        const cancelButton = utils.CreateButton('Cancelar')
        cancelButton.addEventListener('click', (() => {
            editDiv.style.display = 'none';
        }))

        if (uid != ''){

            const bookList = await services.GetBooks();
            let chosenBook = filter.ByUid(bookList, uid)    

            titleInput.value = chosenBook[0].titulo
            authorInput.value = chosenBook[0].autor
            descriptionInput.value = chosenBook[0].descricao
            totalInput.value = chosenBook[0].tiragem
        
            sendButton.addEventListener('click', CallEditService)
            
            async function CallEditService(){
                if(titleInput.value == '' || authorInput.value == '' ){
                    alert('É preciso digitar pelo menos um título e nome do autor.')
                    return;
                }
                await services.UpdateBooks({uid: uid, total: parseInt(totalInput.value), title: titleInput.value, author: authorInput.value, description: descriptionInput.value});
                window.alert('Livro alterado com sucesso!');
                setTimeout((() => {
                    Page.books.Body(); 
                }), 1000)     
            }        
        }       
        
        if (uid == ''){       
            sendButton.addEventListener('click', CallAddService)
           
            async function CallAddService(){
                if(titleInput.value == '' || authorInput.value == '' ){
                    alert('É preciso digitar pelo menos um título e nome do autor.')
                    return;
                }                 
                await services.PostBooks({total: parseInt(totalInput.value), title: titleInput.value, author: authorInput.value, description: descriptionInput.value});
                window.alert('Livro adicionado com sucesso!');
                setTimeout((() => {
                    Page.books.Body(); 
                }), 1000)     
            }        
        } 
    
        editDiv.append(titleLabel, titleInput, authorLabel, authorInput, descriptionLabel, descriptionInput, totalLabel, totalInput, sendButton, cancelButton);  
    },

    DeleteBook: async (uid) => {
        if (confirm("Deseja realmente deletar esse livro?")) {  
            await services.DeleteBooks(uid);
            window.alert('Livro deletado com sucesso');
            setTimeout((() => {
                Page.books.Body(); 
            }), 1000)                   
        }   
    },   

    SearchBook: (table, tableHeadNames, booksList, search, div, searchType) => {

        const editDiv = document.getElementById('edit-div')
        editDiv.textContent = '';

        let filteredBooks = [];
        booksList.forEach(element => {
            filteredBooks.push({
            uid: element.uid,
            titulo: element.titulo,
            autor: element.autor,
            descricao: element.descricao,
            tiragem: element.tiragem
            })
        });
        filteredBooks = filter.ByKeyword(filteredBooks, search, searchType);

        general.RecreateTable(table, filteredBooks, tableHeadNames, div);
        return filteredBooks;
    },
    
    CallStorageService: (data, type) => {
        let a = [];
        a = JSON.parse(sessionStorage.getItem(type)) || [];
        a.push(data);
        sessionStorage.setItem(type, JSON.stringify(a));
    } 
}
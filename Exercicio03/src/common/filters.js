window.filter = {
    ByUid: (books, uid) => {
        let filteredBook = books;
        filteredBook = filteredBook.filter(book => book.uid.toLocaleLowerCase().includes(uid.toLocaleLowerCase()));
    
        return filteredBook;
    },

    ByKeyword: (items, searchText, searchType) => {
        let filteredItems = items;        
        if (searchType == 'TÍTULO') {
        filteredItems = filteredItems.filter(item => item.titulo.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));               
        }
        if (searchType == 'AUTOR') {
            filteredItems = filteredItems.filter(item => item.autor.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));               
        }     
        return filteredItems;
    }
}
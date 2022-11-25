const studentCode = "f75bcc7c-ff13-4703-ab36-5984c170f3bc";
const baseURL =
  "http://livros.letscode.dev.netuno.org:25390/services/livro";

window.services = {
    GetBooks: async () => {
        const response = await fetch(`${baseURL}/lista`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            text: "",
            aluno: {
                uid: studentCode,
            },
            }),
        }).catch((error) => {
            console.log("Erro na comunicação:", error);
        });

        if (!response) {
            errorHandler();
            const booksStorage = JSON.parse(sessionStorage.getItem('initalBooks'));
            return booksStorage;
        }

        const initialBooks = await response.json();
        sessionStorage.setItem('initialBooks', JSON.stringify(initialBooks));
        return initialBooks;
    },

    UpdateBooks: async ({uid, total, title, author, description}) => {
        const response = await fetch(`${baseURL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: uid,
                aluno: {
                    uid: studentCode,
                },
                tiragem: total,
                titulo: title,
                autor: author,
                descricao: description,
            }),
        }).catch((error) => {
            console.log("Erro na comunicação:", error);
        });

        if (!response) {
            errorHandler(response);
            return [];
        }

        return await response.json();
    },

    DeleteBooks: async (uid) => {
        const response = await fetch(`${baseURL}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            aluno: {
                uid: studentCode,
            },
            uid
            }),
        }).catch((error) => {
            console.log("Erro na comunicação:", error);
        });  

        if (!response) {
            errorHandler();
            return [];
        }

            return await response.json();
    },

    PostBooks: async ({ total, title, author, description }) => {
        console.log(total, title, author, description)
        const response = await fetch(`${baseURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                aluno: {
                uid: studentCode,
                },
                tiragem: total,
                titulo: title,
                autor: author,
                descricao: description,
            }),
        }).catch((error) => {
            console.log("Erro na comunicação:", error);
        });
    
        if (!response) {
            errorHandler();
            return [];
        }
    
        return await response.json();
    }
}
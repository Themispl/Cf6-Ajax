$(function(){
    
        fetchBooks()
    
})

function fetchBooks(){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', './books.json', true)

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if (xhr.status === 200){
                handleResultsJSON(JSON.parse(xhr.responseText))
            }
            else {
                //console.log("ena");
                onAPIError()
            }
        }
    }
    xhr.send()
}

function handleResultsJSON(response){
    if(!response) {
        showError()
        return
    }

    let books = response.books
    buildBooksJSON(books)
}
function buildBooksJSON(books){
    let output = `<tr><th>Title</th><th>Author</th></tr>`

    for (const book of books){
        let title = book.title
        let author = book.author
        output += `<tr><th>${title}</th><th>${author}</th></tr>`
    }

    $("#booksList").html(output)
}

function onAPIError(){
    console.log("Error on API");
}

function showError(){
    console.log($(".error.hidden").text());
}
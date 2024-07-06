$(function(){
    
        fetchBooks()
    
})

function fetchBooks(){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', './books.xml', true)

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if (xhr.status === 200){
                handleResults(xhr.responseXML)
            }
            else {
                //console.log("ena");
                onAPIError()
            }
        }
    }
    xhr.send()
}

function handleResults(response){
    if(!response) {
        showError()
        return
    }

    let booksList = $(response).find('book')
    buildResponse(booksList)
}

function buildResponse(booksList){
    let output = `<tr><th>Title</th><th>Author</th></tr>`

    for (const book of booksList){
        let title = $(book).find('title').text()
        let author = $(book).find('author').text()
        output += `<tr><th>${title}</th><th>${author}</th></tr>`
    }

    $("#booksList").html(output)
}
$(function() {
    fetchBooks();
});
 
function fetchBooks() {
    onBeforeSend();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', true);
 
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResults(JSON.parse(xhr.responseText));
            } else {
                onAPIError();
            }
        }
    };
 
    xhr.send();
 
    function onBeforeSend() {
        hideError();
    }
 
    function handleResults(response) {
        console.log('API Response:', response); // Added for debugging
        if (!response) {
            showError();
            return;
        }
 
        let books = response.books;
        if (!books) {
            showError();
            return;
        }
        buildBooks(books);
    }
 
    function buildBooks(books) {
        let output = `<tr><th>Title</th><th>Author</th></tr>`;
 
        for (const book of books) {
            let title = book.title;
            let author = book.author;
 
            output += `<tr><td>${title}</td><td>${author}</td></tr>`;
        }
 
        $('#booksList').html(output);
    }
 
    function onAPIError() {
        console.log('Error in API');
        showError();
    }
 
    function showError() {
        $('.error.hidden').clone().removeClass('hidden').appendTo($('.container'));
    }
 
    function hideError() {
        $('.container').find('.error').remove();
    }
}
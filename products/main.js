$(function() {
    fetchData();
});

function fetchData(){
    let ajaxRequest = new XMLHttpRequest();

    ajaxRequest.open('GET', `https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json`, true);
 ajaxRequest.onreadystatechange = function(){
    if (ajaxRequest.readyState === 4) {
        if (ajaxRequest.status === 200) {
            handleResults(JSON.parse(ajaxRequest.responseText));
        } else {
            onAPIError();
        }
    }
 };
 ajaxRequest.send();
}

function handleResults(response) {
    console.log('API Response:', response); // Added for debugging
    if (!response) {
        showError();
        return;
    }

    buildProducts(response)
}

function buildProducts(products){
    let row
        for( const product of products){
            const{name, price, type} = product
            row = `<strong>Name:</Strong>${name}<br>
            <strong>Name:</Strong>${price}<br>
            <strong>Name:</Strong>${type}<br>
            <hr>`
            $('#prodList').append(row)
        }
}

function onAPIError() {
    console.log('Error in API');
    showError();
}

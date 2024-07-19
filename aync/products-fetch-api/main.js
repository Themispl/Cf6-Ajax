$(function() {
    fetchData();
})

function fetchData() {
    fetch(`https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json`)
    .then(response =>{
        if(!response.ok) {//auto simenei status != 200
            return Promise.reject(new Error(`Status: ${response.statusText}`));
        }
        return response.json();
    })
    .then(data => handleResults(data))
    .catch(error => console.log(error.message));
}

function handleResults(products) {
    if(!products){
        return
    }
    buildProducts(products);
}

function buildProducts(products){
    const transformProducts = products.map(({name: proName, price, type}) =>{
        return` <strong>Name: </strong> ${proName} <br>
                <strong>Price: </strong> ${price}<br>
                <strong>Type:</strong> ${type}<br>
                <hr>`
        
    })

    $('#productsList').html(transformProducts.join(''));//edo kanei thn evosh kai ta bazei sto html san string
}
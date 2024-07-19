$(function(){
    showProducts();
})

async function showProducts(){
    try{
        const response = await fetchAllProducts();
        handleResponse(response);
    }catch(error){
        console.log(error);
    }
}

async function fetchAllProducts(){
    const url = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    return await getXHRPromise(url);
}

function getXHRPromise(url){
        return new Promise((resolve, reject) => {
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open('GET', url,true)

        ajaxRequest.timeout = 5000
        ajaxRequest.ontimeout = () => onAPIError()

        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState === 4){
                if(ajaxRequest.status === 200){
                    const products = JSON.parse(ajaxRequest.responseText);
                    resolve(products);
                }else{
                    reject(new Error(`Error einai: ${ajaxRequest.status}`));
                }
            }
        }
        ajaxRequest.send();
    })
}

function handleResponse(results){
    if(!results) return;
    buildProducts(results);
}

function buildProducts(products){
    const trabsformedProducts = products.map(({name: proName, price, type}) => {
        return `<div><strong>Name:</strong> ${proName}</div>
        <div><strong>Price:</strong> ${price}</div>
        <div><strong>type:</strong> ${type}</div>`
    });
    $('#prodList').html(trabsformedProducts.join(''));
}
function onAPIError(){
    console.log('API Error');
}


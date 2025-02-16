let itemsPerPage = 5
let currentPage = 1
let totalPages = 0
let allProducts = []

$(function () {
    fetchData()
    .then(products =>{
        allProducts = products 
        renderItems(products, currentPage)
        renderPagination(products)
    })

    .catch(error => console.log("Fail to fetch products",error))

    $('#pagination').on('click','a',function(e){
        e.preventDefault()
        currentPage = $(this).data('page')
        renderItems(allProducts, currentPage)
        renderPagination(allProducts)
    })
})

function renderItems(products, page){
    $('prod-list').empty()//thn katharizoume prota
    let startIndex = (page - 1) * itemsPerPage
    let endIndex = Math.min(startIndex + itemsPerPage, products.length)
    let productsHTML = products.slice(startIndex, endIndex)
    .map(product => `<div><strong>Name: </strong>${product.name}</div>
        <div><strong>Price: </strong>${product.price}</div>
        <div><strong>Type: </strong>${product.type}</div>
    `).join('');
    $('prod-list').html(productsHTML)
    }

function renderPagination(products){
    totalPages = Math.ceil(products.length / itemsPerPage)
    $('#pagination').empty()
    
    for(let i = 1; i <= totalPages; i++){
        const activeClass = i === currentPage ? 'active' : ''
        $('#pagination').append(`<li><a href="#" class="${activeClass}" data-page="${i}">${i}</a></li>`)
    }
    
}


//Promise AJAX call
function fetchData(){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json')
        xhr.timeout = 5000
        xhr.ontimeout = () => onApiError()
       xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    let products = JSON.parse(xhr.responseText)
                    resolve(products)
                }else{
                    reject(new Error('faild to load data'))
                }
            }
        }
        xhr.send()
    })
}

function onApiError(){
    console.log('API Error')
}
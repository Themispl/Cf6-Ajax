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
}
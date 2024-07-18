let myPromise = new Promise((resolve, reject) => {
    
        let input1 = Math.floor(Math.random()*10)
        if (input1  !== 0) {
            resolve(input1)
        } else reject(new Error('Odd Number'))
          
})


// myPromise.then(response =>{
//     console.log(response);
// }, error => {
//     console.log(error.message, error.stack);
// })

//to idio se pio aplo
myPromise.then(response => response +20)
.then(res =>console.log(res))
.catch(error => console.log(error.message, error.stack))


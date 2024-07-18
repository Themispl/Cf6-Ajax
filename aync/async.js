let input1 = 10
//callback Hell
func1(input1, (result1) => {
    func2(result1, (result2) => {
        func3(result2, (result3) => {
            console.log(result3);
        })
    })
})





function func1(input1, callback1){
    setTimeout(() => {
        let result = input1 +20 //long runing task
        callback1(result)
    }, 1000);
}

function func2(res, callback2){
    setTimeout(() => {
        let result = res +30 //long runing task
        callback2(result)
    }, 1000);
}

function func3(res, callback3){
    setTimeout(() => {
        let result = res +30 //long runing task
        callback3(result)
    }, 1000);
}


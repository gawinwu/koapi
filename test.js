// async function foo() {
//     return 'foo'
// }
// console.log(1)
// console.log(foo())


/** -------------------------- 
 * Promise 异步 的异常处理 正确方式
*/
function func1() {
    func2()
}

async function func2() {
    try {
        await func3()
    } catch (error) {
        console.log('func2: ' + error)
    }

}

function func3() {
    // reject 在异常时返回，resolve在正确时返回
    return new Promise((resolve, reject) => {
        setTimeout(function()  {
            const r = Math.random()
            if (r < 0.5) {
                reject('r < 0.5 error')
            }
        }, 1000);
    })
}
func1()


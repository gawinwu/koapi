// async function foo() {
//     return 'foo'
// }
// console.log(1)
// console.log(foo())


/** -------------------------- 
 * Promise 异步 的异常处理 正确方式
*/
// function func1() {
//     func2()
// }

// async function func2() {
//     try {
//         await func3()
//     } catch (error) {
//         console.log('func2: ' + error)
//     }

// }

// function func3() {
//     // reject 在异常时返回，resolve在正确时返回
//     return new Promise((resolve, reject) => {
//         setTimeout(function()  {
//             const r = Math.random()
//             if (r < 0.5) {
//                 reject('r < 0.5 error')
//             }
//         }, 1000);
//     })
// }
// func1()

/**---------------------------------- */
// class Base {
//     constructor() {
//         this.aaa = 123
//     }
//     get s(){
//         return this.aaa + 5
//     }
// }
// class Music extends Base {
//     constructor() {
//         super()
//         this.bbb = 789
//     }
//     show(){
//         return this.bbb + 5
//     }
// }
// const c = new Music()
// console.log(c.aaa)
// console.log(c.bbb)
// console.log(c.s)
// console.log(c.show())
/**---------------------------------- */


// const validator = require('validator')
// console.log(validator.isInt('1.0'))

console.log(parseInt('F1.9L'))


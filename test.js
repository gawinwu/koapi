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

var moment = require('moment');

moment.locale('zh-cn');
var today = {};
var _today = moment();
today.year = _today.format('yyyy'); /*现在的年*/
today.date = _today.format('YYYY-MM-DD'); /*现在的时间*/
today.yesterday = _today.subtract(1, 'days').format('YYYY-MM-DD'); /*前一天的时间*/

var formatDate = moment(12345678977).format('YYYY-MM-DD HH:mm:ss'); /*格式化时间*/
console.log(formatDate)

var myDate = new Date().toLocaleString()
console.log(myDate)




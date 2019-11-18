const obj = {
    name: 'gawin',
    age: 18,
    toJSON: function () {
        return {
            name1: 'yaphet'
        }
    }
}

console.log(obj);
console.log(JSON.stringify(obj));

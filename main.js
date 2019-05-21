function main(){
    console.log('start')
    console.log(map2([1, 2, 3], x => x * x))
    console.log(filter2([-1, 0, 1, 2], x => x > 0))
    console.log(uniq([1, 2, 3, 1, 2]))
    console.log(deepFlatten([1, [2], [[3], [4, [5]]]]))*
    console.log(countLobby(users))
    const fmem = memoize((x) => x*x)
    console.log(fmem(2))
    console.log(fmem(2))
    console.log(safeGet({ a: { b: 5 } }, 'a.b'))
    console.log(safeGet({ a: { b: 5 } }, 'a.b.c.d'))
    const sum = curry((a, b, c) => a + b + c)
    console.log(sum(1)(2)(3))
}

function map2(arr, f){
    return arr.reduce((acc, el) => {
        //acc.push(f(el))
        return [...acc, f(el)]
    }, []);
}

function filter2(arr, f){
    return arr.reduce((acc, el) => {
        return f(el)?[...acc, el]:acc
    }, []);
}

function uniq(arr){
    return arr.reduce((acc, el) => {
        return acc.indexOf(el) === -1?[...acc, el]:acc
    }, []);
}

function deepFlatten(arr){
    return arr.reduce((acc, el) => {
        return !Array.isArray(el)?[...acc, el]:[...acc, ...deepFlatten(el)]
    }, []);
}

const users = [
  { name: 'John', hobbies: ['singing', 'walking', 'playing guitar'] },
  { name: 'Terry', hobbies: ['swimming', 'playing guitar'] },
  { name: 'Anna', hobbies: ['walking', 'swimming', 'playing guitar'] },
  { name: 'Paul', hobbies: ['swimming', 'singing'] },
]

const countLobby = (users) => {
    const hobbies = uniq(deepFlatten(users.map((el) => el.hobbies )))
    return hobbies.map((h) => { let c ={}; c[h] = users.filter((u) => u.hobbies.indexOf(h) > -1).length; return c; })
}

const memoize = (f) => {
    const cache= {}
    return (...args) => {
        const key = args.join('-')
        if(!cache[key]){
            console.log('compute');
            cache[key] = f(args)
        }
        return cache[key]
    }
}

const safeGet = (obj, path) => {
   const paths = path.split('.')
   return paths.reduce((acc, el) => {
    return (acc|| {})[el]?acc[el]:null
   }, obj); 
}

const curry = (f, arity) => {
    arity = arity || f.length
    return (...args) => {
        if(args.length < arity){
            return curry((...rest) => f(...args, ...rest), arity-args.length)
        }else{
            return f(...args)
        }
    }
}

main()
let object = {
  a:1,
  b:2
}
let handlers= new Map()

let usedReactivities = []

function reactive(obj){
  return new Proxy(obj,{
    get(obj,prop){
     usedReactivities.push([obj,prop])
      return obj[prop]
    },
    set(obj,prop,val){
      obj[prop] = val
      if(handlers.get(obj))
        if (handlers.get(obj).get(prop))
          for (let handler of handlers.get(obj).get(prop))
            handler()
      return obj[prop]
    }
  })
}
let dummy
let proxy = reactive(object)

function effect(handler) {
  usedReactivities = []
  handler()
  for(let usedReactivity of usedReactivities){
    let [obj,prop] = usedReactivity
    console.log([obj,prop])
    if(!handlers.has(obj)){
      handlers.set(obj, new Map())
    }

    if(!handlers.get(obj).has(prop)){
      handlers.get(obj).set(prop,[])
    }
    handlers.get(obj).get(prop).push(handler)
  }
}

effect(()=>dummy = proxy.a)

console.log(dummy)
proxy.a = 2
console.log(dummy)
 const a = ()=>{
     
     return new Promise((resolve, reject)=>{
        const timeoutPromise = setTimeout(()=>{
            console.log("bbb")
            resolve(true)
            console.log("aaaa")

        }, 10000)
         return
     })
 }
//  scope/context
 const b = ()=>{
    return new Promise((resolve, reject)=>{
        const timeoutPromise = setTimeout(()=>{
            let v1 = 3
            console.log("bbb")
            resolve("bbb")
            return
            console.log("t2")
        }, 3000)
     
        return
    })
}
setTimeout(()=>{
    console.log("outside")
}, 1000)
a().then(()=>{

    console.log("A promise 2")
}).then(()=>{

    console.log("A promise 3")

})
.catch(err=>{
    console.log(err)
})

b().then((data)=>{
    console.log("B promise 2")
})
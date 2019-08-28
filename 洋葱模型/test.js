const Koa = require('./Onion.js.js')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(1)
    await next()
    console.log(1)
})

app.use(async (ctx, next) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => { console.log(2); resolve() }, 3000)
    })
    await next()
    console.log(2)
})

app.start()
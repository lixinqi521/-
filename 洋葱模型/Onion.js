class Onion {
    constructor() {
        this.middlewares = []
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
    start() {
        this.compose(this.middlewares)({ req: {}, resp: {} })
    }
}
module.exports = Onion
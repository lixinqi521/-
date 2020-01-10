class Router {
    constructor(options) {
        this.$options = options
        this.routerMap = {}

        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        this.bindEvents(); //监听url变化
        this.createRouteMap(this.$options); //解析路由配置
        this.initComponent(); // 实现两个组件
    }

    bindEvents() {
        window.addEventListener("load", this.onHashChange.bind(this));
        window.addEventListener("hashchange", this.onHashChange.bind(this));
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || "/";
    }

    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component;
        });
    }

    initComponent() {
        Vue.component("router-link", {
            props: { to: String },
            render(h) {
                // h(tag, data, children)
                return h("a", { attrs: { href: "#" + this.to } }, [
                    this.$slots.default
                ]);
            }
        });

        // <router-view></router-view>
        Vue.component("router-view", {
            render: h => {
                console.log(this.routeMap[this.app.current]);
                const comp = this.routeMap[this.app.current];
                return h(comp);
            }
        });
    }
}

VueRouter.install = function (Vue) {
    // 混入
    Vue.mixin({
        beforeCreate() {
            // this是Vue实例
            if (this.$options.router) {
                // 仅在根组件执行一次
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    });
};
/**
 * 此代码为另一版本的框架分离方案，耦合度较高，可后期考虑使用
 */

const koa = require('koa');
const koaRouter = require('koa-router');

class Mar {
    constructor(conf) {
        this.$app = new koa(conf); // 相当于koa的实例
        this.$router = new koaRouter(); // 相当于koa-router的实例
        this.model = new Model(this);
        this.service = new Service(this);
        this.controller = new Controller(this);
        this.router = new Router(this);

    }
    listen(port) {
        this.$app.listen(port, async () => {
            console.log(`[mar]Server is running at http://localhost:${port}`);
        })
    }
}

class Router {
    constructor(app) {
        const { controller, $router, $app } = app;
        $router.get('/', controller.index);
        $app.use($router.routes());
    }
}
class Controller {
    constructor(app) {
        const { service } = app;
        console.log('Controller:', service.test());
        Controller.prototype.service = service;
    }
    test() {
        return 'Controller for Router'
    }
    async index(ctx) {
        const service = Controller.prototype.service;
        ctx.body = await service.index();
    }
}
class Service {
    constructor(app) {
        const { model } = app;
        Service.prototype.model = model;
    }
    test() {
        return 'Service for Controller'
    }
    async index() {
        const model = Service.prototype.model;
        let data = await model.index();
        data.age = '20';
        data.remarks = 'forever 18';
        return data;
    }
}

const Sequelize = require('sequelize');

class Model {
    constructor(app) {
        this.connect();
    }
    // 给其他层的测试函数
    test() {
        return "Model for Service"
    }
    // 连接数据库的函数
    connect() {
        this.sequelize = new Sequelize('marron', 'root', 'example', {
            host: 'localhost',
            dialect: 'mysql'
        })
    }

    // 测试是否连接成功
    testSQL() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connect has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
    async index() {
        return await this.find.user()
    }
    addTable = {
        user: async () => {
            const User = this.sequelize.define('user', {
                // 属性
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                date: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                }
            });
            User.sync({ force: true })
        }
    }

    User() {
        return this.sequelize.define('user', {
            // 属性
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });

    }
    add = {
        user: async (person) => {
            const User = this.User();
            User.create(person);
            // 同步新增用户
            this.sequelize.sync();
        }
    }
    find = {
        user: async () => {
            const User = this.User();
            return await User.findAll();
        }
    }
}

module.exports = Mar;
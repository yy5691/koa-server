const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const appRoutes = require('./routes');
const moment = require('moment');
const koaStatic = require('koa-static');
const betterJwt = require('./middleware/better-jwt');
const { accessLogger } = require('./utils/better-log4');
const betterErrorHandle = require('./middleware/better-err-handle');

const app = new Koa();
const router = new Router();

// 路由
appRoutes.forEach(route => {
    router[route.method](route.path, route.action)
});
app.use(betterErrorHandle);
app.use(betterJwt);
// 文件上传
app.use(koaBody({ multipart: true, formidable: { maxFileSize: 10 * 1024 * 1024 } }));
app.use(bodyParser());
app.use(accessLogger());
app.use(router.routes());
app.use(koaStatic(__dirname, '/static'));



app.listen(3000, () => { console.log(`${moment().format('YYYY/MM/DD hh:mm:ss')} server is running`) });

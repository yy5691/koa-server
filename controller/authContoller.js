const authService = require('../service/authService')

class authController {
    static async login(ctx) {
        ctx.body = await authService.login(ctx)
    }
    static async register(ctx) {
        ctx.body = await authService.register(ctx)
    }

    static async uploadFile(ctx){
        ctx.body = await authService.uploadFile(ctx)
    }
}                              

module.exports = authController

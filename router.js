const router = require('koa-router')();
const DBXTools = require('dbx-chain-tools');
const { ChainConfig } = require('bitsharesjs-ws');

ChainConfig.setPrefix('DBX');

router.post('/:method', async (ctx, next) => {
	const { method } = ctx.params
	const params = ctx.request.body

	if (method in DBXTools) {
		try {
			const data = DBXTools[method](params)
			ctx.body = {
				data,
				code: 200,
				message: 'Success'
			}
		} catch(e) {
			ctx.body = {
				code: 0,
				data: null,
				message: e.message
			}
		}
	} else {
		ctx.status = 404
	}
});

module.exports = router;

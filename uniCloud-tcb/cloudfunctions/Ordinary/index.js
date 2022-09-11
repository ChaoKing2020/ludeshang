'use strict';
const getChong = require('./getChong/index');
const getChongBoth = require('./getChongBoth/index');
const getChongClass = require('./getChongClass/index');
const getChongRegion = require('./getChongRegion/index');
const getW_Bao = require('./getW-Bao/index');
const getW_BaoBoth = require('./getW-BaoBoth/index');
const getW_BaoClass = require('./getW-BaoClass/index');
const getW_BaoRegion = require('./getW-BaoRegion');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const st = "不限"
	let Chong = [{}]
	let Wen = [{}]
	let Bao = [{}]
	let Cempty = 0
	let Wempty = 0
	let Bempty = 0
	let C
	let W
	const level = 434
	if (event.b.indexOf("物理") != -1) {
		if (event.a >= level) {
			event.b = "WL"
		} else {
			event.b = "WL_S"
		}
	} else {
		if (event.a >= level) {
			event.b = "LS"
		} else {
			event.b = "LS_S"
		}
	}
	let z = event.c[0]
	let x = event.d[0]
	if (z.indexOf(st) != -1 && x.indexOf(st) != -1) {
		C = await getChong.main(event, context)
		W = await getW_Bao.main(event, context)
	} else if (event.c[0].indexOf(st) == -1 && event.d[0].indexOf(st) != -1) {
		C = await getChongRegion.main(event, context)
		W = await getW_BaoRegion.main(event, context)
	} else if (event.c[0].indexOf(st) != -1 && event.d[0].indexOf(st) == -1) {
		C = await getChongClass.main(event, context)
		W = await getW_BaoClass.main(event, context)
	} else {
		C = await getChongBoth.main(event, context)
		W = await getW_BaoBoth.main(event, context)
	}
	Chong = C.Chong
	Wen = W.Wen
	Bao = W.Bao
	Chong.reverse()
	Wen.reverse()
	Bao.reverse()
	Cempty = C.Cempty
	Wempty = W.Wempty
	Bempty = W.Bempty
	return {
		Chong,
		Wen,
		Bao,
		Cempty,
		Wempty,
		Bempty,
	}
	//返回数据给客户端
};

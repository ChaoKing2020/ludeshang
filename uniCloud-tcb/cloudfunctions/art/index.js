'use strict';
// 云函数入口文件
const getChong = require('./getChong/index');
const getChongRegion = require('./getChongRegion/index');
const getW_Bao = require('./getW-Bao/index');
const getW_BaoRegion = require('./getW-BaoRegion/index');
const get = require('./get/index');
// 云函数入口函数
exports.main = async (event, context) => {
	const st = "不限"
	let Chong = [{}]
	let Wen = [{}]
	let Bao = [{}]
	let Cempty = 0
	let Wempty = 0
	let Bempty = 0
	let C
	let W
	let S = await get.main(event, context)
	event.a = S.a
	event.e = S.e
	event.b = S.b1
	if (event.c[0].indexOf(st) != -1) {
		C = await getChong.main(event, context)
		W = await getW_Bao.main(event, context)
	} else {
		C = await getChongRegion.main(event, context)
		W = await getW_BaoRegion.main(event, context)
	}
	Chong = C.Chong
	Wen = W.Wen
	Bao = W.Bao
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

}

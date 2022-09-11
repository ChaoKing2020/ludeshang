// 云函数入口文件
'use strict';

// 云函数入口函数
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const _ = db.command
	let Wen = [{}]
	let Bao = [{}]
	let Wen_1 = [{}]
	let Bao_1 = [{}]
	let s = 0
	let s1 = -1
	let Wempty = 0
	let Bempty = 0
	let sum = 0
	let S = "2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,96%,97%,98%,98%,99%"
	let zhibiao = S.split(",")
	const E = event.e
	while (sum < 12) {
		if (s > 3) {
			break
		}
		s++
		s1++
		Wen_1 = await db.collection(event.b).where({
			"T": _.gte(event.a - s).and(_.lte(event.a - s1)),
			"N": _.eq(E)
		}).get()
		for (let i = 0; i < Wen_1.data.length; i++) {
			Wen[sum] = Wen_1.data[i]
			Wen[sum].M = zhibiao[8 + s]
			sum++
		}
	}
	if (sum > 0) {
		Wempty = 1
	}
	// ------------------------------------------------------
	sum = 0
	while (sum < 29) {
		if (s > 10) {
			break
		}
		s++
		s1++
		Bao_1 = await db.collection(event.b).where({
			"T": _.gte(event.a - s).and(_.lte(event.a - s1)),
			"N": _.eq(E)
		}).get()
		for (let i = 0; i < Bao_1.data.length; i++) {
			Bao[sum] = Bao_1.data[i]
			Bao[sum].M = zhibiao[s + 8]
			sum++
		}
	}
	if (sum > 0) {
		Bempty = 1
	}
	return {
		Wen,
		Wempty,
		Bao,
		Bempty
	}
}

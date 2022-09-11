'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const _ = db.command
	let Wen = [{}]
	let Wen_1 = [{}]
	let Bao = [{}]
	let Bao_1 = [{}]
	let Wempty = 0
	let Bempty = 0
	let s = -1
	let sum = 0
	let S = "2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,,96%,97%,98%,98%,99%"
	let zhibiao = S.split(",")
	while (sum < 12) {
		if (s > 3) {
			break
		}
		s++
		Wen_1 = await db.collection(event.b).where({
			"G": _.eq(event.a - s)
		}).get()
		for (let i = 0; i < Wen_1.data.length; i++) {
			for (let j = 0; j < event.c.length; j++) {
				if (Wen_1.data[i].J.indexOf(event.c[j]) != -1) {
					Wen[sum] = Wen_1.data[i]
					Wen[sum].M = zhibiao[s + 8]
					sum++
					break
				}
			}
		}
	}
	if (sum > 0) {
		Wempty = 1
	}
	// ----------------------------------------------------
	sum = 0
	while (sum < 29) {
		if (s > 10) {
			break
		}
		s++
		Bao_1 = await db.collection(event.b).where({
			"G": _.eq(event.a - s)
		}).get()
		for (let i = 0; i < Bao_1.data.length; i++) {
			for (let j = 0; j < event.c.length; j++) {
				if (Bao_1.data[i].J.indexOf(event.c[j]) != -1) {
					Bao[sum] = Bao_1.data[i]
					Bao[sum].M = zhibiao[s + 8]
					sum++
					break
				}
			}
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

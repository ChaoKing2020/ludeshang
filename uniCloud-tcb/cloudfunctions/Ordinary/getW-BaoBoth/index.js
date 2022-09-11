'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const _ = db.command
	let Wen = [{}]
	let Wen_1 = [{}]
	let Wen_12 = [{}]
	let Bao = [{}]
	let Bao_1 = [{}]
	let Bao_12 = [{}]
	let Wempty = 0
	let Bempty = 0
	let s = -1
	let sum = 0
	let llj = 0
	let S = "2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,,96%,97%,98%,98%,99%"
	let zhibiao = S.split(",")
	while (llj < 12) {
		if (s > 3) {
			break
		}
		s++
		Wen_12 = await db.collection(event.b).where({
			"G": _.eq(event.a - s)
		}).get()
		Wen_12 = Wen_12.data
		sum = 0
		for (let i = 0; i < Wen_12.length; i++) {
			for (let j = 0; j < event.c.length; j++) {
				if (Wen_12[i].J.indexOf(event.c[j]) != -1) {
					Wen_1[sum] = Wen_12[i]
					sum++
					break
				}
			}
		}
		if (sum == 0) {
			continue
		}
		sum = 0
		for (let i = 0; i < Wen_1.length; i++) {
			for (let j = 0; j < event.d.length; j++) {
				if (Wen_1[i].K.indexOf(event.d[j]) != -1) {
					Wen[llj] = Wen_1[i]
					Wen[llj].M = zhibiao[8 + s]
					llj++
					break
				}
			}
		}
	}
	if (llj > 0) {
		Wempty = 1
	}
	// ----------------------------------------------------
	sum = 0
	llj = 0
	while (llj < 29) {
		s++
		if (s > 10) {
			break
		}
		Bao_12 = await db.collection(event.b).where({
			"G": _.eq(event.a - s)
		}).get()
		Bao_12 = Bao_12.data
		sum = 0
		for (let i = 0; i < Bao_12.length; i++) {
			for (let j = 0; j < event.c.length; j++) {
				if (Bao_12[i].J.indexOf(event.c[j]) != -1) {
					Bao_1[sum] = Bao_12[i]
					sum++
					break
				}
			}
		}
		if (sum == 0) {
			continue
		}
		sum = 0
		for (let i = 0; i < Bao_1.length; i++) {
			for (let j = 0; j < event.d.length; j++) {
				if (Bao_1[i].K.indexOf(event.d[j]) != -1) {
					Bao[llj] = Bao_1[i]
					Bao[llj].M = zhibiao[s + 8]
					llj++
					break
				}
			}
		}
	}
	if (llj > 0) {
		Bempty = 1
	}

	return {
		Wen,
		Wempty,
		Bao,
		Bempty
	}
}

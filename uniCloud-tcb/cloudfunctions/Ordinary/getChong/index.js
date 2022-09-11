'use strict';
exports.main = async (event, context) => {
    const db = uniCloud.database()
    const _ = db.command
    let Chong = [{}]
    let Chong_1 = [{}]
    let s = 0
    let sum = 0
    let Cempty = 0
    let S="2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,,96%,97%,98%,98%,99%"
    let zhibiao=S.split(",")
    while (sum < 4) {
        if(s>8){
            break
        }
        s++;
        Chong_1 = await db.collection(event.b).where({
            "G": _.eq(event.a + s)
        }).get()
        for (let i = 0; i < Chong_1.data.length; i++) {
            Chong[sum] = Chong_1.data[i]
            Chong[sum].M=zhibiao[8-s]
            sum++
        }
    }
    if (sum > 0) {
        Cempty = 1
    }
    return {
        Chong,
        Cempty
    }
}
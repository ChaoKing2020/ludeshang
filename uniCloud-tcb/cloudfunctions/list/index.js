'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database()
	    const DB = db.command
	   
	    const st = "不限"
	    var Chong = [{}]
	    var Wen = [{}]
	    var Bao = [{}] 
	    var Chong_1 = [{}]
	    var Wen_1 = [{}]
	    var Bao_1 = [{}]
	    var Chong_12 = [{}]
	    var Wen_12 = [{}]
	    var Bao_12 = [{}]
	    var sum = 0
	    let s=0
	    let llj=4
	    if(event.b.indexOf("物理")!=-1){
	        event.b="WL"
	    }else{
	        event.b="LS"
	    }
	    llj=6
	    let z=event.c[0]
	    let x=event.d[0]
	        if (z.indexOf(st) != -1 && x.indexOf(st) != -1) {
	             Chong = await db.collection(event.b).where({
	                "G": DB.eq(event.a + 1)
	            }).get()
	            llj=7
	            Chong = Chong.data
	            let count=Chong.length
	             s=1
	            sum=count
	            llj=8
	            while(count<4){
						break
					if(s>12){
					}
	                s++;
	                llj=9
	                Chong_1=await db.collection(event.b).where({
	                    "G": DB.eq(event.a + s)
	                }).get()
	                count=count+Chong_1.data.length
	                for(let i=0;i<Chong_1.data.length;i++){
	                     Chong[sum]=Chong_1.data[i]
	                     sum++
	                }
	            }
	             Wen = await db.collection(event.b).where({
	                "G": DB.eq(event.a)
	            }).get()
	            Wen = Wen.data
	           count=Wen.length
	           s=0;
	           sum=count
	           while(count<12){
				   if(s>12) {
					 break
				   }
	               s++
	               Wen_1=await db.collection(event.b).where({
	                "G": DB.eq(event.a-s)
	            }).get()
	            count=count+Wen_1.data.length
	            for(let i=0;i<Wen_1.data.length;i++){
	                Wen[sum]=Wen_1.data[i]
	                sum++
	            }
	           } 
	           s++
	             Bao = await db.collection(event.b).where({
	                "G": DB.eq(event.a - s)
	            }).get()
	            Bao = Bao.data
	            count=Bao.length
	            sum=count
	            while(count<29){
					if(s>24){
						break
					}
	                s++
	                Bao_1=await db.collection(event.b).where({
	                    "G":DB.eq(event.a-s)
	                }).get()
	                count=count+Bao_1.data.length
	                for(let i=0;i<Bao_1.data.length;i++){
	                    Bao[sum]=Bao_1.data[i]
	                    sum++
	                }
	            }
	            sum=1
	        } else if (event.c[0].indexOf(st) == -1 && event.d[0].indexOf(st) != -1) {
	            
	            s=0
	            sum=0
	            while(sum<4){
	                if(s>=9){
	                    break
	                }
	                s++
	                Chong_12=await db.collection(event.b).where({
	                    "G": DB.eq(event.a + s)
	                }).get()
	                for (let i = 0; i < Chong_12.data.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Chong_12.data[i].J.indexOf(event.c[j]) != -1) {
	                            Chong[sum] = Chong_12.data[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	            sum = 0
	            
	            s=-1
	            sum=0
	            while(s<12){
	                if(s>=10){
	                    break
	                }
	                s++
	                Wen_12=Chong_12=await db.collection(event.b).where({
	                    "G": DB.eq(event.a - s)
	                }).get()
	                for (let i = 0; i < Wen_12.data.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Wen_12.data[i].J.indexOf(event.c[j]) != -1) {
	                            Wen[sum] = Wen_12.data[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	           
	            sum=0
	            while(sum<29){
	                if(s>=22){
	                    break
	                }
	                s++
	                Bao_12=await db.collection(event.b).where({
	                    "G":DB.eq(event.a-s)
	                }).get()
	                for (let i = 0; i < Bao_12.data.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Bao_12.data[i].J.indexOf(event.c[j]) != -1) {
	                            Bao[sum] = Bao_12.data[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	        } else if (event.c[0].indexOf(st) != -1 && event.d[0].indexOf(st) == -1) {
	           
	            sum=0
	            s=0
	            while(sum<4){
					if(s>=9){
						break
					}
	                s++
	                Chong_12=await db.collection(event.b).where({
	                    "G": DB.eq(event.a + s)
	                }).get()
	                for (let i = 0; i < Chong_12.data.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Chong_12.data[i].K.indexOf(event.d[j]) != -1) {
	                            Chong[sum] = Chong_12.data[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	            s=-1
	            sum=0
	            while(sum<12){
					if(s>=10){
						break
					}
	                s++
	                Wen_12 = await db.collection(event.b).where({
	                    "G": DB.eq(event.a-s)
	                }).get()
	                for (let i = 0; i < Wen_12.data.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Wen_12.data[i].K.indexOf(event.d[j]) != -1) {
	                            Wen[sum] = Wen_12.data[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	        
	            sum=0
	            while(sum<29){
					if(s>=22){
						break
					}
	                s++
	                Bao_12 = await db.collection(event.b).where({
	                    "G": DB.eq(event.a - s)
	                }).get()
	                for (let i = 0; i < Bao_12.data.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Bao_12.data[i].K.indexOf(event.d[j]) != -1) {
	                            Bao_1[sum] = Bao[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
	            }
	            sum = 3
	        } else {
	            sum=0
	            s=0
	            let llj=0
	            while(llj<4){
					if(s>=11){
						break
					}
	                s++
	                Chong_12 = await db.collection(event.b).where({
	                    "G": DB.eq(event.a + s)
	                }).get()
					sum=0
	                Chong_12 = Chong_12.data
	                for (let i = 0; i < Chong_12.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Chong_12[i].J.indexOf(event.c[j]) != -1) {
	                            Chong_1[sum] = Chong_12[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
					if(sum==0){
						continue
					}
	                sum = 0
	                for (let i = 0; i < Chong_1.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Chong_1[i].K.indexOf(event.d[j]) != -1) {
	                            Chong[llj] = Chong_1[i]
	                            llj++
	                            break
	                        }
	                    }
	                }
	            }
	            sum = 0
	            llj=0
	            s=0
	            while(llj<12){
					if(s>=14){
						break
					}
	                s++
	                Wen_12 = await db.collection(event.b).where({
	                    "G": DB.eq(event.a + s)
	                }).get()
					sum=0
	                Wen_12 = Wen_12.data
	                for (let i = 0; i < Wen_12.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Wen_12[i].J.indexOf(event.c[j]) != -1) {
	                            Wen_1[sum] = Wen_12[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
					if(sum==0){
						continue
					}
	                sum = 0
	                for (let i = 0; i < Wen_1.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Wen_1[i].K.indexOf(event.d[j]) != -1) {
	                            Wen[llj] = Wen_1[i]
	                            llj++
	                            break
	                        }
	                    }
	                }
	            }
	            sum = 0
	            llj=0
	            while(llj<29){
					if(s>=26){
						break
					}
	                s++
	                Bao_12 = await db.collection(event.b).where({
	                    "G": DB.eq(event.a - s)
	                }).get()
					sum=0
	                Bao_12 = Bao_12.data
	                for (let i = 0; i < Bao_12.length; i++) {
	                    for (let j = 0; j < event.c.length; j++) {
	                        if (Bao_12[i].J.indexOf(event.c[j]) != -1) {
	                            Bao_1[sum] = Bao_12[i]
	                            sum++
	                            break
	                        }
	                    }
	                }
					if(sum==0){
						continue
					}
	                sum = 0
	                for (let i = 0; i < Bao_1.length; i++) {
	                    for (let j = 0; j < event.d.length; j++) {
	                        if (Bao_1[i].K.indexOf(event.d[j]) != -1) {
	                            Bao[llj] = Bao_1[i]
	                            llj++
	                            break
	                        }
	                    }
	                }
	            }
	            sum=4
	        }
	
	    return {
	        Chong,
	        Wen,
	        Bao,
	    }
	
	//返回数据给客户端
};

const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {  //ประกาศโทเคนของไลน์
    channelAccessToken:"ADvE36Ta/Ai35JTlT4ICIRDse5kTSYWfEJ3soSiFK6fVieCxyFSux7U1d+TAWqjgGI4TBMyCdAC8qrJvL0OrLXOd94ITFWtWpqkAkTblllP1tQMwK6hIHp9G73JpdL13qYyYW8ho7fpri50wxIh7ugdB04t89/1O/w1cDnyilFU=",
    channelSecret:"a42c7981ca5d2acaa0d2a0e17741df70"
}

const client = new line.Client(config)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post('/',line.middleware(config),(req,res)=>{ //จัดการการส่งข้อมูลแบบPOST
    Promise.all(req.body.events.map(handleEvent)).then((result)=> res.json(result))
}) 

function handleEvent(event){ //ฟังก์ชั่นจัดการอเช็คอีเวนต์ต่างๆที่มาจากผู้ใช้
    if(event.type !=='message' || event.message.type !="text"){ //เช็คค่าว่างที่ส่งมา
        return Promise.resolve(null)
    }

    if(event.message.text === "อยากได้สติกเกอร์ครับเฌอปรางค์"){
        return client.replyMessage(event.replyToken,{ //ส่งอีเวนต์ที่เราเลือก คืนหาผู้ใช้(ข้อความ)ในพารามิเตอร์มี(โทเคนที่ส่งกลับ,ชนิดข้อมูล,ข้อความ)
            type:'sticker',
            packageId:'3',
            stickerId:'180'
        }) 
    }

    if(event.message.text === "ควยไรอะ"){
        return client.replyMessage(event.replyToken,{ //ส่งอีเวนต์ที่เราเลือก คืนหาผู้ใช้(ข้อความ)ในพารามิเตอร์มี(โทเคนที่ส่งกลับ,ชนิดข้อมูล,ข้อความ)
            type:'text',
            text:"มึงเป็นเหี้ยไรไอสัส มาด่าอะ อยากโดนตีนหรอ"
        }) 
    }

    return client.replyMessage(event.replyToken,{ //ส่งอีเวนต์ที่เราเลือก คืนหาผู้ใช้(ข้อความ)ในพารามิเตอร์มี(โทเคนที่ส่งกลับ,ชนิดข้อมูล,ข้อความ)
        type:'text',
        text:event.message.text
    }) 
}

app.listen(port,()=> console.log(`App running: ${port}`))
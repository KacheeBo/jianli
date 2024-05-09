import ajax from '../js/ajax.js'

// 基础信息修改
var info = document.querySelector('form')
var button=document.querySelector('.button')

button.onclick=function(){
    var user=new FormData(info)
    console.log(user.get("username"))
    ajax({
        url:"http://localhost:8080/InfoUpdate",
        method:"post",
        data:{
            name:user.get("name"),
            birthday:user.get("birthday"),
            mianmao:user.get("mianmao"),
            phonenumber:user.get("phonenumber"),
            address:user.get("address"),
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
})
    confirm("修改完成")
    
}

// 修改个人介绍
// var introup = document.querySelector('.form1')
// var button1=document.querySelector('.button1')

//     button1.onclick=function(){
//     var user=new FormData(introup)
//     ajax({
//         url:"http://localhost:8080/IntroductionUpdate",
//         method:"post",
//         data:{
//             intro:user.get("intro"),
//         },
//         headers:{
//             "Content-Type":"application/x-www-form-urlencoded"
//         }
// })
//     confirm("修改完成")
// }
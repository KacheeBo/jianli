import ajax from '/js/ajax.js'

var loginInfo = document.querySelector('form')
var button=document.querySelector('.loginbutton')
    
button.onclick=function(){
    var user=new FormData(loginInfo)
    ajax({
        url:"http://localhost:8080/login",
        method:"post",
        data:{
            username:user.get("username"),
            password:user.get("password")
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
            if(res == "1"){
            confirm("登录成功",res)
            window.location.href ='./个人简历.html'
        }
        },
        error:function(err){
            confirm("账号或密码错误",err)
    }
    
    })
}
import ajax from '../js/ajax.js'

var regist = document.querySelector('form')
var button=document.querySelector('.signupbutton')
button.onclick=function(){
    var user=new FormData(regist)
    ajax({
        url:"http://localhost:8080/register",
        method:"post",
        data:{
            username:user.get("username"),
            password:user.get("password")
        },
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
            if(res == 1){
            alert("注册成功",res)
            }
            window.location.href ='../html/login.html'
        },
        error:function(err){
            confirm("该用户名已被使用",err)
    }
    
})
}


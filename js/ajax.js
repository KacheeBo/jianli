//使传入的数据username:"1111",变成"username=1111&password=2222"
//           password:"2222"
function queryStringfy(obj){
    let str  = ''
    for(let k in obj) str +=`${k}=${obj[k]}&`
    //会得到username=1111&password=2222&
    return str.slice(0,-1)//从0开始截出到倒数第一个为止
    //会得到username=1111&password=2222
}
function ajax(options){
    let defaultoptions = {
        url: "",
        method: "GET",
        async:true,
        data:{},
        headers:{},
        success:function(){ },
        error:function(){ }
    }
    let {url,method,async,data,headers,success,error}={
        ...defaultoptions,
        ...options
    }
    
    if(typeof data === 'object' && headers["content-type"]?.indexof("json")>-1){
        data =JSON.stringify(data)
    }
    else{
        data = queryStringfy(data)
    }
    //如果是get请求，并且有参数，那么直接组装一下url的信息
    if(/^get$/i.test(method) && data) url += '?'+ data
    //发送请求 
    const xhr = new XMLHttpRequest()
    xhr.open(method,url,async)
    xhr.onload = function(){
        //err
        if(!/^2\d{2}$/.test(xhr.status)){
            error(`错误状态码:${xhr.status}`)//回调
            return
        }
        try{
            let result = JSON.parse(xhr.responseText)
            success(result)
        }catch(err){
            error("解析失败")
        }
    }
    //设置请求头内的信息
    for(let k in headers) xhr.setRequestHeader(k,headers[k])
    if(/^get$/i.test(method)){///^get$/i忽略大小写
        xhr.send()
    }else{
        xhr.send(data)
    }
}
export default ajax
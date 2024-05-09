function gettime() {
    document.getElementById("time").innerHTML = Date();
}

// 字幕滚动
let list = [];
let flag = false;
getList();

//获取所有li标签
function getList() {
    let list = document.querySelectorAll('.education>ul>li');
    let h = 0;
    for (let i = 0; i < list.length; i++) {
        list[i].style.top = h + 'px';
        h = list[i].offsetTop + list[i].offsetHeight;
        list[i].onmouseenter = function () {
            if (flag) {

            } else {
                flag = true;
                setStyle(this, list);
                //   多少秒执行此方法
                setTimeout(() => {
                    position(this);
                    getList();
                    flag = false;
                }, 300);
            }

        }
    }
}

function setStyle(node, list) {
    let i;
    for (let j = 0; j < list.length; j++) {
        if (node == list[j]) {
            i = j;
        }
    }
    list.forEach((item, index) => {
        if (node == item) {
            item.setAttribute('class', 'item');
            item.style.top = 0;
        } else {
            item.setAttribute('class', '');
        }
        if (index < i) {
            item.style.top = item.offsetTop + item.offsetHeight + 'px';
        }
    })
}

function position(cnode) {
    return cnode.parentNode.insertBefore(cnode, cnode.parentNode.firstElementChild);
}


// 广告弹窗
var box = document.getElementById("advertise");
var close = document.getElementById("close");
var max_left = document.documentElement.clientWidth - box.offsetWidth;
var max_top = document.documentElement.clientHeight - box.offsetHeight;
var x = 1;
var y = 1;

function active() {
    var old_left = box.offsetLeft;
    var old_top = box.offsetTop;
    var new_left = old_left + x;
    //+random
    var new_top = old_top + y;

    if (new_left > max_left) {
        new_left = max_left;
    }
    if (new_top > max_top) {
        new_top = max_top;
    }
    if (new_left < 0) {
        new_left = 0;
    }
    if (new_top < 0) {
        new_top = 0;
    }

    box.style.left = new_left + "px";
    box.style.top = new_top + "px";

    if (new_top >= max_top) {
        y = -1;
    }
    if (new_top == 0) {
        y = 1;
    }
    if (new_left >= max_left) {
        x = -1;
    }
    if (new_left == 0) {
        x = 1;
    }
}

var time = setInterval(active, 10)

window.onresize = function () {
    max_left = document.documentElement.clientWidth - box.offsetWidth;
    max_top = document.documentElement.clientHeight - box.offsetHeight;

    box.style.left = 0;
    box.style.top = 0;
    x = 1;
    y = 1;
}
box.onmouseover = function () {
    //      	鼠标移入，广告不动清理定时器
    clearInterval(time);
}
//           鼠标移出
box.onmouseout = function () {
    time = setInterval(active, 10)
}


close.onclick = function () {
    box.style.display = "none";
}

window.onload = function() {
    var nav = document.getElementById("navigation");
    var navTop = nav.offsetTop;

    window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
        if(scrollTop > navTop) {
            nav.style.width='100%';
            nav.style.top = "0";
            nav.style.left = "0";
            nav.style.position = "fixed";
        }else if(scrollTop == navTop){
            nav.style.position = ""; 
            nav.style.position = " ";
        }
    }
}


var upd = document.querySelector('.update')
    upd.onclick= function(){
        window.location.href = './update.html'
}

var load = new XMLHttpRequest()
load.open("post","http://localhost:8080/Info")
load.send()
load.onload =function(){
        if(load.status===200){
            console.log(JSON.parse(load.responseText))
            res = JSON.parse(load.responseText)
            document.querySelector('.info').innerHTML = 
            '<li>姓名：' + res[0].name + 
            '</li><li>出生日期：' + res[0].birthday+ 
            '</li><li>政治面貌：' + res[0].mianmao + 
            '</li><li>电话：' + res[0].phonenumber + 
            '</li><li>住址：' + res[0].address+'</li>'
    }
}

// var load1 = new XMLHttpRequest()
// load1.open("post","http://localhost:8080/Intro")
// load1.send()
// load1.onload =function(){
//         if(load.status===200){
//             console.log(JSON.parse(load.responseText))
//             res = JSON.parse(load.responseText)
//             console.log(res)
//             document.querySelector('.wzl').innerHTML = '<div>' + res[0].intro + '</div>'
//     }
// }
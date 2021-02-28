$(function(){
    // 登录界面拖拽
    $('.login1').mousedown(function(e){
        let  x  = e.offsetX
        let  y =  e.offsetY;
        $(document).mousemove(function(e){
            let l = e.clientX -x+150;
            let t = e.clientY -y+150;
            $('.login').css({
                left:l,
                top:t
            })
        })
    })
    $(document).mouseup(function(){
        $(document).off('mousemove')
    }) 
    let username = $('.login2');
    let password = $('.login3');
    // 用户名验证
    username.change(function () {
        let usernameText = /^[\u4e00-\u9fa5]{2,14}$/i.test(username.val())
        if (!usernameText) {
            $(this).next().html('用户名不合法!')
            $(this).next().css('color','red')
        } else {
            $(this).next().html('')
        }
    })
    // 密码验证
    password.change(function () {
        let passwordText = /([a-zA-Z0-9]){6,14}/i.test(password.val())
        if (!passwordText) {
            $(this).next().html('密码错误!')
            $(this).next().css('color','red')
        } else {
            $(this).next().html('')
        }
    })
    //  登录链接数据库
    $('.login4').click(function(){
        $.ajax({
            url:'../php/login.php',
            type:'get',
            data:{
                username:`${username.val()}`,
                password:`${password.val()}`
            },
            success:function(res){
                if(JSON.parse(res).id){
                  setCookie('login',username.val());
                  let url = localStorage.getItem('url');
                  if(url){
                      location.href = url;
                      localStorage.removeItem('url');
                  }else{
                      location.href = '../index.html';
                  }
                }
            }
        })
    })
})
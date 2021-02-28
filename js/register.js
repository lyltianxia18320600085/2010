$(function () {
    let username = $('.reg1Inp');
    let password = $('.reg2Inp');
    let sure = $('.reg3Inp');
    let obj = {};
    // 用户名正则验证
    username.change(function () {
        let usernameText = /^[\u4e00-\u9fa5]{2,14}$/i.test(username.val())
        if (!usernameText) {
            $(this).next().html('用户名不合法!')
        } else {
            obj.usernameText = usernameText;
            $(this).next().html('用户名注册成功')
            $(this).next().css('color', 'blue')
        }
        yanzheng()
    })
    // 密码正则验证
    password.change(function () {
        let passwordText = /([a-zA-Z0-9]){6,14}/i.test(password.val())
        if (!passwordText) {
            $(this).next().html('密码不符合要求!')
        } else {
            obj.passwordText = passwordText;
            $(this).next().html('设置密码成功')
            $(this).next().css('color', 'blue')
        }
        yanzheng()
    })
    // 确认密码正则验证
    sure.change(function () {
        let pw = password.val();
        if (sure.val() == pw) {
            obj.pw = true;
            $(this).next().html('确认密码成功')
            $(this).next().css('color', 'blue')
        } else {
            $(this).next().html('密码输入不正确')
        }
        yanzheng()
    })
    // 立即注册 验证
    function yanzheng() {
        if (obj.pw && obj.usernameText && obj.passwordText) {
            $('.reg4').prop('disabled', false);
            $('.reg4').css({
                opacity: 1,
                cursor: 'pointer'
            })
        } else {
            $('.reg4').prop('disabled', true);
        }

    }
    // 注册用户 链接数据库
    $('.reg4').click(function () {
        $.ajax({
            url: '../php/register.php',
            type: 'get',
            data: {
                username: `${username.val()}`,
                password: `${password.val()}`
            },
            success: function (res) {
                console.log(res);
                if (res == 1) {
                    alert('注册成功,请登陆')
                    window.location.href = './login.html';
                }
            }
        })
    })
})
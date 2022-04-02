$(function() {
        getUserInfo()
        var layer = layui.layer
            // 为退出按钮绑定点击事件
        $('#btnlogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1清空本地存储的token
                localStorage.removeItem('token')
                    // 2.跳转到登录注册页面
                location.href = '/login.html'
                    //关闭询问框
                layer.close(index);
            });
        })

    })
    //获取用户资料
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                //将用户的data信息传给user
                renderAvatar(res.data)
            }
            //不论成功还是失败都会调用complete回调函数
            // complete: function(res) {
            //     // console.log(res);
            //     //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的对象
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //             // 2.认证失败后强制跳转会登录页面
            //         location.href = '/login.html'
            //     }
            // }
    })
}
//渲染头像/名称
function renderAvatar(user) {
    // 1.获取头像名称
    var name = user.nickname || user.username
        // 2.渲染用户名称
    $('.welcome').html('欢迎&nbsp;&nbsp' + name).show()
        //3渲染用户头像
        //判断用户的头像是否为null

    if (user.user_pic !== null) {
        // 3.1 如果不为空则渲染用户图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //3.2为空 则渲染用户名首字母文字头像
        $('.layui-nav-img').hide()
            //获取用户名的第一个首字母/文字  toUpperCase()转化为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }

}
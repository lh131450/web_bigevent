$.ajaxPrefilter(function(options) {
    //发起ajax前,统一根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // console.log(options.url);
        //统一有权限的接口,设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    // 统一全局complete回调函数
    options.complete = function(res) {
        // console.log(res);
        //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的对象
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
                // 2.认证失败后强制跳转会登录页面
            location.href = '/login.html'
        }
    }

})
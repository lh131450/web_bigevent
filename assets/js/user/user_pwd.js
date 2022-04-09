$(function() {
    var form = layui.form
    var layer = layui.layer
        //校验规则
    form.verify({
            //密码校验
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验新密码和旧密码是否一直 value代表输入框的值
            samePwd: function(value) {
                if (value === $('[name=oldpwd]').val()) {
                    return '新密码不能与旧密码一致'
                }
            },
            repwd: function(value) {
                if (value !== $('[name=newpwd]').val()) {
                    return "两次输入的新密码不一致"
                }
            }
        })
        //发起请求实现密码重置功能
    $('.layui-form').on('submit', function(e) {
        // 阻止表单默认提交
        e.pereventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            //快速获取表单里面的值
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                    //重置表单 
                $('.layui-form')[0].reset()
            }
        })
    })
})
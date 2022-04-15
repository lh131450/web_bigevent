$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
        // 获取文章类别管理表单的数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null;
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理函数的方式为form-add绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败!')
                }
                initArtCateList()
                layer.msg('添加成功!')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
        // 给编辑按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                    type: 1,
                    area: ['500px', '300px'],
                    title: '修改文章分类',
                    content: $('#dialog-edit').html()
                })
                // 获取到id号
            var id = $(this).attr('data-id');
            // 发起请求获取对应的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        // 为确认修改绑定提交事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类失败!')
                    }
                    layer.msg('更新分类成功!')
                    layer.close(indexEdit)
                    initArtCateList()
                }

            })
        })
        // 通过代理方法,给删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            // 点击确认按钮执行的函数
            function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除文章分类失败!')
                        }
                        layer.msg('删除文章分类成功!')
                        layer.close(index);
                        initArtCateList()
                    }
                })


            });
    })
})
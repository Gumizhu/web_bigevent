$(function () {
    // 引入 layui 的form 对象
    var form = layui.form;

    var layer = layui.layer;

    // 定义规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！';
            }
        },
    });

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起Ajax请求，修改密码
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！');
                }
                layer.msg('重置密码成功！');
                // 情况表单
                $('.layui-form')[0].reset();
            },
        });
    });
});

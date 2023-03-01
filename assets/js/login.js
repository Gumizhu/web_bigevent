$(function () {
    // 点击“去注册账号”按钮跳转到 注册 表单
    $('#link_reg').on('click', function () {
        // 隐藏登录表单
        $('.login-box').hide();
        // 显示 注册表单
        $('.reg-box').show();
    });

    //   点击“去登录” 跳转到 登录表单
    $('#link_login').on('click', function () {
        // 隐藏注册表单
        $('.reg-box').hide();
        // 显示 登录表单
        $('.login-box').show();
    });

    // 通过 layui 获取一个表单对象
    const form = layui.form;
    // 自定义一个密码的校验规则
    form.verify({
        // 校验密码
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 定义 再次输入密码一致性校验
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次输入的密码不一致，请重新输入确认密码！';
            }
        },
    });

    // 导入 layui 消息提示
    var layer = layui.layer;

    // 注册
    $('#form-reg').on('submit', function (e) {
        // 阻止表单的默认提交
        e.preventDefault();
        const data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val(),
        };
        // 发起Ajax 请求
        $.post('/api/reguser', data, function (res) {
            // 注册失败，提示信息
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 注册成功，提示信息
            layer.msg('注册成功，请登录！');
            // 使用代码点击跳转到登录界面
            $('#link_login').click();
        });
    });

    // 登录
    $('#form-login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起Ajax 请求
        $.post('/api/login', $(this).serialize(), function (res) {
            // 注册失败，提示信息
            if (res.status !== 0) {
                return layer.msg('登录失败！');
            }
            // 登录成功，提示信息
            layer.msg('登录成功！');
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token);
            // 跳转到后台主页
            location.href = '/index.html';
        });
    });
});

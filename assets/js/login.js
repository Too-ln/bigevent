$(function(){
    const layer=layui.layer
    const form = layui.form

    //表单验证
    form.verify({
        pass: [
            /^[\S]{6,15}$/
            ,'密码必须6到15位，且不能出现空格'
        ],
        repass:function(value){
           let pwd= $('.reg-box [name=password]').val()
           if(pwd!==value){
            return '两次密码不一致'
           }
        }
    })

    //1.登录盒子和注册盒子的切换
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.注册用户名
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        const uname=$('#form_reg [name=username]').val().trim()
        const pwd=$('#form_reg [name=password]').val().trim()
        // if(!uname||!pwd){
        //    return layer.msg('输入内容不能为空')
        // }
         //发起请求
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{username:uname,password:pwd},
            success:function(res){
                let {status,message}=res
                console.log(res);
                if(status!==0) return layer.msg(message)
                layer.msg(message)
                $('#link_login').click()
            }
        })
    })

    //登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                let {status,message,token}=res
                if(status!==0) return layer.msg(message)
                layer.msg(message)
                localStorage.setItem('token',token)
                location.href='./index.html'
            }
        })
    })
})
$(function(){
    const layer=layui.layer
    const form =layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6) return'用户昵称长度必须在1-6个字符之间！'
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success:function(res){
                let{status,message,data}=res
                if(status!==0) return  layer.msg(message)
                console.log(data);
                form.val("formUserInfo",data)
            }
        })
    }

    //实现表单的重置效果
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfo()
    })

    //发起请求更新用户的信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        console.log($(this).serialize());

        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                let{status,message}=res
                console.log(res);
                if(status!==0) return layer.msg('更新用户信息失败！')
                layer.msg('更新用户信息成功！')
                window.parent.initIndex()
                
            }
        })
    })
})
$(function(){
    const layer=layui.layer
    const form=layui.form

    form.verify({
        pass: [
            /^[\S]{6,15}$/
            ,'密码必须6到15位，且不能出现空格'
        ],
        same:function(value){
            if(value===$('[name=oldPwd]').val()) return '新旧密码相同！'
        },
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()) return '两次输入的密码不相同！'
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        resetPwd()
        
    })

    function resetPwd(){
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                let{status,message}=res
                if(status!==0) return layer.msg(message)
                layer.msg(message)
            }
        })
    }

})
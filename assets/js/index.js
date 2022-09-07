$(function(){
    initIndex()
    const layer = layui.layer

    //渲染用户头像和昵称
    function initIndex(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                let {status,message,data}=res
                if(status!==0) return layer.msg(message)
                let {nickname,username,user_pic}=data
                let str=nickname?nickname:username
                $('#welcome').html('欢迎 '+str)
                if(user_pic!==null){
                    $('.layui-nav-img').show()
                    $('.text-avatar').hide()
                }else{
                    $('.layui-nav-img').hide()
                    $('.text-avatar').html(`${str[0].toUpperCase()}`).show()
                }
                
            }
        })
    }

    //退出功能
    $('#logout').on('click',function(){
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})
$(function(){
    const layer=layui.layer
    const form=layui.form
    let indexAdd=null
    let indexEdit=null
    initCate()
    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                let {status,message}=res
                if(status!==0) return layer.msg(message,{icon:5})
                let htmlStr=template('tpl_cate',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //添加类别
    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area:['500px', '250px'],
            title:'添加文章分类',
            content:$('#dialog-add').html()
        })
    })
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                let{status,message}=res
                if(status!==0) return layer.msg('新增分类失败!')
                layer.msg('新增分类成功!')
                initCate()
                layer.close(indexAdd)
            }
        })
    })

    //编辑类别
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html()
          });  

        $.ajax({
            method:'get',
            url:'/my/article/cates/'+$(this).data('id'),
            success:function(res){
                let{status,message,data}=res
                if(status!==0) return layer.msg(message)
                form.val('form-edit',data)
            }
        })
    })

    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                let{status,message}=res
                if(status!==0) return layer.msg(message)
                initCate()
                layer.msg(message)
                layer.close(indexEdit)
            }
        })
    })

    //删除类别
    $('tbody').on('click','.btn-delete',function(){
        let id=$(this).attr('data-id')
        // console.log(id);
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
                $.ajax({
                    method:'get',
                    url:'/my/article/deletecate/'+ id,
                    success:function(res){
                        let{status,message}=res
                        if(status!==0) return layer.msg(message)
                        initCate()
                        layer.msg(message) 
                        layer.close(index);
    
                    }
                })
          });
    })
})
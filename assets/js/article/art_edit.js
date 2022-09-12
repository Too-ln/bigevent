$(function(){
 
    const form=layui.form
    const layer=layui.layer
    let cate_id=null
    //渲染文章类别
    getArtCate()
    function getArtCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                let {status,message}=res
                if(status!==0) return layer.msg(message)
                let htmlStr=template('tpl-pub',res)
                $('#cate_id').html(htmlStr)
                // $('[name=cate_id]').val(cate_id)
                $(`option[value=${cate_id}]`).attr('selected',true)
                form.render('select')
            }
        })
    }

    //渲染富文本
    initEditor()

    //照片编辑器
    const $image=$('#image')
    const options={
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click()
    })

    $('#coverFile').on('change',function(e){
        let fileList=e.target.files[0]

        if(fileList.length===0) return  layer.msg('请选择图片！')

        const newImgURL = URL.createObjectURL(fileList)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    initArtEdit()
    
    //渲染文章内容
    function initArtEdit(){
        const id=location.search.split('=')[1]
        $.ajax({
            method:'get',
            url:'/my/article/'+id,
            success:function(res){
                let{status,message,data}=res
                if(status!==0) return layer.msg(message)
                form.val('editForm',data)
                cate_id=data.cate_id
                let imgUrl='http://big-event-api-t.itheima.net'+data.cover_img
                $image.cropper('destroy').attr('src',imgUrl).cropper(options)
                form.render()
            }
        })
    }

    $('#form-edit').on('submit',function(e){
        e.preventDefault();
        const id=location.search.split('=')[1]
        const fd=new FormData($(this)[0])
        fd.append('Id',id)
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function(blob) { 
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            fd.append('cover_img',blob)
            editArticle(fd)
        }) 
    })

    function editArticle(fd){
        $.ajax({
            method:'post',
            url:'/my/article/edit',
            data:fd,
            contentType: false,
            processData: false,
            success:function(res){
                let {status,message}=res
                if(status!==0) return layer.msg(message)
                layer.msg(message)
                window.parent.$('#art_list')[0].click()
            }
        })
    }
})
$(function(){
    const layer=layui.layer
    const form = layui.form
    //获取文章类别
    getArtCate()
    initEditor()
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
        const fileList=e.target.files[0]
        if(fileList.length===0) return layer.msg('请选择图片！')
        const newImgURL = URL.createObjectURL(fileList)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let state='已发布'

    $('#btnSave2').on('click',function(){
        state='草稿'
    })

    $('#form-pub').on('submit',function(e){
        e.preventDefault();
        let fd=new FormData($(this)[0])
        fd.append('state',state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { 
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                publishArticle(fd)
            })   
    })


    function publishArticle(fd){
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            contentType: false,
            processData: false,
            success:function(res){
                let {status,message} =res
                if(status!==0) return layer.msg(message)
                window.parent.$('#art_list')[0].click()
                layer.msg(message)
                // location.href='/article/art_list.html'
                
            }
        })
    }


    function getArtCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                let {status,message}=res
                if(status!==0) return layer.msg(message)
                let htmlStr=template('tpl-pub',res)
                $('#cate_id').html(htmlStr)
                form.render('select')
            }
        })
    }
})
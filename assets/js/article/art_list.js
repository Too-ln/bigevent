$(function(){
    const layer=layui.layer
    const form = layui.form
    const laypage = layui.laypage;
    const q={
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    
    template.defaults.imports.dataFormat=function(date){
        const dt = new Date(date)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n){
        return n<10?'0'+n:n
    }

    initArtCate()
    initArtList()
    function initArtCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                let {status,message}=res
                if(status!==0) return layer.msg(message)
                let htmlStr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }


    function initArtList(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                let {status,message,total,data}=res
                if(status!==0) return layer.msg(message)
                let htmlStr=template('tpl-list',res)
                $('tbody').html(htmlStr)


                $('#pageBox').empty()
               if(data.length!==0){
                renderPage(total)
               }
                
            }
        })
    }


    $('#form-search').on('submit',function(e){
        e.preventDefault()
        // 获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        initArtList()
    })

    $('tbody').on('click','.btn-delete',function(){

        const len=$('.btn-delete').length
        const id=$(this).data('id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'get',
                url:'/my/article/delete/'+id,
                success:function(res){
                    let {status,message}=res
                    if(status!==0) return layer.msg(message)
                    layer.msg(message)
                    if(len===1){
                        q.pagenum =q.pagenum===1?1:--q.pagenum
                    }
                    initArtList()
                }
            })
            layer.close(index);
          });
        
    })


    $('tbody').on('click','.btn-edit',function(){
        const id=$(this).data('id')
        location.href=`./art_edit.html?id=${id}`
        
    })



    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total, //数据总数，从服务端得到
            limit:q.pagesize,
            curr: q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2, 3, 5, 10],
            jump:function(obj, first){
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                //首次不执行
                if(!first){
                    initArtList()
                  //do something
                }
            }
        })
    }
})
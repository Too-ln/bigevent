// $.ajaxPrefilter(function(option){
//     option.url='http://api-breakingnews-web.itheima.net'+option.url
//     if(option.url.indexOf('/my/')!==-1){
//         option.headers={Authorization:localStorage.getItem('token') || ''}
//     }

//     option.complete=function(res){
//         let {status,message}=res.responseJSON
//   
//         if(status===1  &&  message ==='身份认证失败！'){
//             localStorage.removeItem('token')
//             location.href='./login.html'
//         }
//     }
// })

$.ajaxPrefilter(function(options){
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})

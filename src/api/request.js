/****   request.js   ****/
// 导入axios
import axios from 'axios'
// 使用element-ui Message做消息提醒
import { Message,Loading} from 'element-ui';
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.BASE_API,
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
    (config) => {
        // console.log(config)
        // 在请求发送之前做一些处理
        if (!(config.headers['Content-Type'])) {
            loading = Loading.service({
                lock: true,
                text: "加载中...",
                spinner: "el-icon-loading",
                background: "rgba(255,255,255,0.7)",
                customClass: "request-loading",
            });
            if (config.method == 'post') {
                config.headers['Content-Type'] =
                'application/x-www-form-urlencoded;charset=UTF-8'
                for (var key in config.data) {
                    if (config.data[key] === '') {
                        delete config.data[key]
                    }
                }
                config.data = qs.stringify(config.data)
            } else {
                config.headers['Content-Type'] =
                'application/x-www-form-urlencoded;charset=UTF-8'
                // config.params
            }
        }

  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
   config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
   config.headers = {
     'Content-Type':'application/x-www-form-urlencoded' //配置请求头
   }
   //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
   const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
   if(token){
      config.params = {'token':token} //如果要求携带在参数中
      config.headers.token= token; //如果要求携带在请求头中
    }
  return config
}, error => {
  Promise.reject(error)
}
})

let loading = "";
// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  loading.close();
  return response
}, error => {
   /***** 接收到异常响应的处理开始 *****/
 loading.close();
   // 发送失败
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败'
  }

  Message.error(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})
//4.导出
export default service



// //结合element的axios封装
// import axios from 'axios'
// import {
//     Message,
//     Loading
// } from "element-ui";
// import qs from 'qs'
// //判断是否是生产环境
// var isPro = process.env.NODE_ENV === "production" //process.env.NODE_ENV用于区分是生产环境还是开发环境
// //配置不同的baseURL
// let baseURL = isPro ? "/weixin-api" : "/api"
// const service = axios.create({
//     baseURL: baseURL,
//     timeout: 30000 // 请求超时时间
// })
// let loading = "";
// // 请求拦截器
// service.interceptors.request.use(
//     (config) => {
//         // console.log(config)
//         // 在请求发送之前做一些处理
//         if (!(config.headers['Content-Type'])) {
//             loading = Loading.service({
//                 lock: true,
//                 text: "加载中...",
//                 spinner: "el-icon-loading",
//                 background: "rgba(255,255,255,0.7)",
//                 customClass: "request-loading",
//             });
//             if (config.method == 'post') {
//                 config.headers['Content-Type'] =
//                     'application/x-www-form-urlencoded;charset=UTF-8'
//                 for (var key in config.data) {
//                     if (config.data[key] === '') {
//                         delete config.data[key]
//                     }
//                 }
//                 config.data = qs.stringify(config.data)
//             } else {
//                 config.headers['Content-Type'] =
//                     'application/x-www-form-urlencoded;charset=UTF-8'
//                 // config.params
//             }
//         }
//         const token = "token"
//         // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//         if (token) {
//             config.headers['Authorization'] = token
//         }
//         return config
//     },
//     (error) => {
//         loading.close();

//         // 发送失败
//         console.log('发送失败', error)
//         return Promise.reject(error)
//     }
// )

// // 响应拦截器
// service.interceptors.response.use(
//     (response) => {
//         loading.close();
//         const dataAxios = response.data
//         // 这个状态码是和后端约定的
//         return dataAxios
//     },
//     (error) => {
//         Message({
//             message: '系统错误,请稍后重试！',
//             type: 'error',
//             duration: 3 * 1000
//         })
//         return Promise.reject(error)
//     }
// )

// export default service





// /* 1.引入文件 */
// import axios from 'axios'        //引入 axios库
// import qs from 'qs'              //引入 node中自带的qs模块（数据格式转换）
 
// /* 2.全局默认配置 */
// let baseURL
// // 判断开发环境（一般用于本地代理）
// if (process.env.NODE_ENV === 'development') { // 开发环境
//     baseURL = '/api'    // 你设置的本地代理请求（跨域代理），下文会详细介绍怎么进行跨域代理
// } else {                                      // 编译环境
//     if (process.env.type === 'test') {        // 测试环境
//         baseURL = 'http://sw.apitest.com'
//     } else {                                  // 正式环境
//         baseURL = 'http://sw.api.com'
//     }
// }



// // 配置axios的属性
// axios.defaults.timeout = 6000;    // 请求超时时间1分钟                  
// axios.defaults.baseURL =baseURL; // 你的接口地址 
// axios.defaults.responseType="json";
// axios.defaults.withCredentials=false;  //是否允许带cookie这些

 
// /*你也可以创建一个实例，然后在实例中配置相关属性，此方法和上面的方法一样，写法不同，怎么用随个人
// *喜好，我比较喜欢用这种方法，如下：
// */
// const Axios = axios.create({
// 	baseURL:baseURL , 		      // 后台服务地址
// 	timeout: 60000, 		      // 请求超时时间1分钟
// 	responseType: "json",
// 	withCredentials: false    // 是否允许带cookie这些
// });
 
// /* 3.设置拦截器 */  
// /*如果不是用创建实例的方式配置，那么下面的Axios都要换成axios,也就是文件开头你用import引入axios
// 时定义的变量*/
// Axios .interceptors.request.use((config) => {
//     //发送请求前进行拦截
//     //  可在此处配置请求头信息
// 	config.headers["appkey"] ="...";
// 	config.headers["token"] ="...";
//  	if (config.method == "post") {
//   /*数据转换: axios post方式默认是json格式提交数据，如果使用application/x-www-form-urlencoded数据格式提交，要用qs.stringify()进行转换,个人建议不在拦截器中全局配置，因为不够灵活，还有一点是，如果
// 设置了重新请求的配置，那么重新请求时，请求体中的config里面的传参就会被再次进行qs.stringify()转
// 换，会使得参数丢失，造成请求失败。*/
//  		config.data = qs.stringify(config.data)
//  	}
// 	return config;
//   },(error) =>{
//     //console.log("错误的传参", 'fail');
//     return Promise.reject(error)
//   })
// Axios .interceptors.response.use((res) =>{
//    //请求响应后拦截
//    if(res.status == 200){                       // 对响应数据做些事
//        //alert("提交成功")
//        return Promise.resolve(res)
//     }
//     return res;
//  }, (error) => {
    
//    //alert("网络异常!") 404等问题可以在这里处理
//    return Promise.reject(error)
//  })
// export default Axios

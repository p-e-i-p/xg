import axios from "axios";
import { ElMessage,ElLoading, ElNotification} from "element-plus";
import useUserStore from "@/store/modules/user"

let request = axios.create({
  // baseURL:"/mock",
  baseURL:import.meta.env.VITE_APP_BASE_API,
  timeout:5000
})
const loading={
  loadingInstance:null,
  open(){
    if(this.loadingInstance==null){
      this.loadingInstance=ElLoading.service({
        text:'加载中...',
        background:'rbga(0,0,0,0.5)',
        target:'.main'
      })
    }
  },
  close(){
    if(this.loadingInstance!=null){
      this.loadingInstance.close();

    }
    this.loadingInstance=null
  }
}
const getMenus = ()=>{
  let userStore = useUserStore();
  const roleId = userStore.user?.role_id;
  const userMenus = userStore.user?.role?.menus;
  if(userStore.user.username === "admin"){
    return 
  }
  request({
    url:"/menus",
    method:"post",
    data:{
      roleId
    }
  }).then(response=>{
    const resp = response;
    if(resp.status === 0){
      const menus = resp.data.menus
      if(userMenus?.length === menus.length){
        userMenus?.forEach(item=>{
          if(menus.indexOf(item) === -1){
            userStore.removeUser()
            ElMessage({
              message:"当前登陆的用户权限被修改，请重新登陆",
              type:"warning"
            })
            window.location.href="/login"
          }
        })
      }else{
        userStore.removeUser()
        ElMessage({
          message:"当前登陆的用户权限被修改，请重新登陆",
          type:"warning"
        })
        window.location.href="/login"
      }
    }
    return 
  })
}
// 请求拦截
request.interceptors.request.use(config => {
  if(config.url!= "/menus" && config.url!="/login"){
    getMenus()
  }
  return config
})
// 响应拦截
request.interceptors.response.use((response)=>{
 const resp=response.data
 if(resp.status!=0){
  ElNotification({
    title:'警告',
    message:resp.msg,
    type:'warning'
  })
 }
 loading.close()
 return response.data
},(error)=>{
  loading.close()
  let msg = "";
  let status = error.response.status;
  switch(status){
    case 401:
      msg = "token过期";
      break;
    case 403:
      msg="无效访问";
      break;
    case 404:
      msg="请求地址错误"
      break;
    case 500:
      msg="服务器出现问题";
      break;
    default:
      msg="无网络"
  }
  ElMessage({
    type:'error',
    message:msg
  })
  return Promise.reject(error);
});
export default request;
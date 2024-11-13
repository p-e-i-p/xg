import {defineStore} from "pinia";
import { 

    reqschoolAdd,
    reqschoolAll,
    reqschoolList,  
    reqSchoolById,
    reqschoolUpdate,
    reqschoolDelete
} from "@/api/school";
import {
 
  schoolInfoData,
  schoolListResponseData,
  schoolListFormData,
  schoolAllResponseData,
  schoolResponseData
} from "@/api/school/type";

import {SchoolState} from "./types/type";
let useSchoolStore = defineStore("school",{
  state:():SchoolState=>{
    return {
      schools:[]
    }
  },
  actions:{
    async getschoolAll(){
      let result:schoolAllResponseData = await reqschoolAll();
      if(result.status === 0){
        this.schools = (result.data as schoolInfoData[])
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getSchoolList(data:schoolListFormData){
      let result:schoolListResponseData = await reqschoolList(data);
      if(result.status === 0){
        this.schools = (result.data?.data as schoolInfoData[])
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async addschool(data:schoolInfoData){
      let result:schoolResponseData = await reqschoolAdd(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getschoolByid(_id:string){
      let result:schoolResponseData = await reqSchoolById(_id);
      if(result.status === 0){
        return result.data;
      }else{
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateschool(data:schoolInfoData){
      let result:schoolResponseData = await reqschoolUpdate(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteschool(schoolId:string){
      let result:schoolResponseData = await reqschoolDelete(schoolId)
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    }
  },
  getters:{

  }
})
export default useSchoolStore;
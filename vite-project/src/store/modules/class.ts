import {defineStore} from "pinia";
import { 

    reqclassAdd,
    reqclassAll,
    reqclassList,  
    reqclassById,
    reqclassUpdate,
    reqclassDelete
} from "@/api/class";
import {
 
  classInfoData,
  classListResponseData,
  classListFormData,
  classAllResponseData,
  classResponseData
} from "@/api/class/type";

import {ClassState} from "./types/type";
let useClassStore = defineStore("Class",{
  state:():ClassState=>{
    return {
      classes:[]
    }
  },
  actions:{
    async getClassAll(){
      let result:classAllResponseData = await reqclassAll();
      if(result.status === 0){
        this.classes = (result.data as classInfoData[])
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getClassList(data:classListFormData){
      let result:classListResponseData = await reqclassList(data);
      if(result.status === 0){
        this.classes = (result.data?.data as classInfoData[])
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async addClass(data:classInfoData){
      let result:classResponseData = await reqclassAdd(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getClassByid(_id:string){
      let result:classResponseData = await reqclassById(_id);
      if(result.status === 0){
        return result.data;
      }else{
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateClass(data:classInfoData){
      let result:classResponseData = await reqclassUpdate(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteClass(classId:string){
      let result:classResponseData = await reqclassDelete(classId)
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
export default useClassStore;
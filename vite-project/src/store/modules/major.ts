import {defineStore} from "pinia";
import { 

    reqmajorAdd,
    reqmajorAll,
    reqmajorList,  
    reqmajorById,
    reqmajorUpdate,
    reqmajorDelete
} from "@/api/major";
import {
 
  majorInfoData,
  majorListResponseData,
  majorListFormData,
  majorAllResponseData,
  majorResponseData
} from "@/api/major/type";

import {MajorState} from "./types/type";
let usemajorStore = defineStore("major",{
  state:():MajorState=>{
    return {
      majors:[]
    }
  },
  actions:{
    async getmajorAll(){
      let result:majorAllResponseData = await reqmajorAll();
      if(result.status === 0){
        this.majors = (result.data as majorInfoData[])
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getmajorList(data:majorListFormData){
      let result:majorListResponseData = await reqmajorList(data);
      if(result.status === 0){
        this.majors = (result.data?.data as majorInfoData[])
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async addmajor(data:majorInfoData){
      let result:majorResponseData = await reqmajorAdd(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getmajorByid(_id:string){
      let result:majorResponseData = await reqmajorById(_id);
      if(result.status === 0){
        return result.data;
      }else{
        return Promise.reject(new Error(result.msg));
      }
    },
    async updatemajor(data:majorInfoData){
      let result:majorResponseData = await reqmajorUpdate(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async deletemajor(majorId:string){
      let result:majorResponseData = await reqmajorDelete(majorId)
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
export default usemajorStore;
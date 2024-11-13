import {defineStore} from "pinia";
import { 

    reqstudentAdd,
    reqstudentAll,
    reqstudentList,  
    reqstudentById,
    reqstudentUpdate,
    reqstudentDelete
} from "@/api/student";
import {
 
  studentInfoData,
  studentListResponseData,
  studentListFormData,
  studentAllResponseData,
  studentResponseData
} from "@/api/student/type";

import {StudentState} from "./types/type";
let useStudentStore = defineStore("student",{
  state:():StudentState=>{
    return {
      students:[]
    }
  },
  actions:{
    async getstudentAll(){
      let result:studentAllResponseData = await reqstudentAll();
      if(result.status === 0){
        this.students = (result.data as studentInfoData[])
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getstudentList(data:studentListFormData){
      let result:studentListResponseData = await reqstudentList(data);
      if(result.status === 0){
        this.students = (result.data?.data as studentInfoData[])
        return result.data
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async addstudent(data:studentInfoData){
      let result:studentResponseData = await reqstudentAdd(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async getstudentByid(_id:string){
      let result:studentResponseData = await reqstudentById(_id);
      if(result.status === 0){
        return result.data;
      }else{
        return Promise.reject(new Error(result.msg));
      }
    },
    async updatestudent(data:studentInfoData){
      let result:studentResponseData = await reqstudentUpdate(data);
      if(result.status === 0){
        return "OK"
      }else{
        return Promise.reject(new Error(result.msg))
      }
    },
    async deletestudent(studentId:string){
      let result:studentResponseData = await reqstudentDelete(studentId)
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
export default useStudentStore;
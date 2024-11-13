//引入学校的总接口

import request from "@/utils/request";

import type { schoolAllResponseData,schoolInfoData,schoolListFormData,schoolListResponseData,schoolResponseData } from "./type";
//分配学校相关的请求地址
enum API{
  SCHOOLE_ALL_URL="/manage/school/all",
  SCHOOLE_LIST_URL="/manage/school/list",
  SCHOOLE_ADD_URL="/manage/school/add",
  SCHOOLE_GET_ID_URL="/manage/school/find",
  SCHOOLE_UPDATE_URL="/manage/school/update",
  SCHOOLE_DELETE_URL="/manage/school/delete",
}
//获取数据

export const reqschoolAll = ()=>
  request.get<any,schoolAllResponseData>(API.SCHOOLE_ALL_URL)

export const reqschoolList = (data:schoolListFormData)=>
  request.post<any,schoolListResponseData>(API.SCHOOLE_LIST_URL,data)

export const reqschoolAdd = 
  (data:schoolInfoData)=>request.post<any,schoolResponseData>(API.SCHOOLE_ADD_URL,data)

export const reqSchoolById = 
  (_id:string)=>request.get<any,schoolResponseData>(API.SCHOOLE_GET_ID_URL + `?_id=${_id}`)

export const reqschoolUpdate = 
  (data:schoolInfoData)=>request.post<any,schoolResponseData>(API.SCHOOLE_UPDATE_URL,data);

export const reqschoolDelete = 
  (schoolId:string)=>request.post<any,schoolResponseData>(API.SCHOOLE_DELETE_URL,{schoolId})
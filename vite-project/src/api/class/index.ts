//引入学校的总接口

import request from "@/utils/request";

import type { classAllResponseData,classInfoData,classListFormData,classListResponseData,classResponseData } from "./type";
//分配学校相关的请求地址
enum API{
  CLASS_ALL_URL="/manage/class/all",
  CLASS_LIST_URL="/manage/class/list",
  CLASS_ADD_URL="/manage/class/add",
  CLASS_GET_ID_URL="/manage/class/find",
  CLASS_UPDATE_URL="/manage/class/update",
  CLASS_DELETE_URL="/manage/class/delete",
}
//获取数据

export const reqclassAll = ()=>
  request.get<any,classAllResponseData>(API.CLASS_ALL_URL)

export const reqclassList = (data:classListFormData)=>
  request.post<any,classListResponseData>(API.CLASS_LIST_URL,data)

export const reqclassAdd = 
  (data:classInfoData)=>request.post<any,classResponseData>(API.CLASS_ADD_URL,data)

export const reqclassById = 
  (_id:string)=>request.get<any,classResponseData>(API.CLASS_GET_ID_URL + `?_id=${_id}`)

export const reqclassUpdate = 
  (data:classInfoData)=>request.post<any,classResponseData>(API.CLASS_UPDATE_URL,data);

export const reqclassDelete = 
  (classId:string)=>request.post<any,classResponseData>(API.CLASS_DELETE_URL,{classId})
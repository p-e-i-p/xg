//引入学校的总接口

import request from "@/utils/request";

import type { majorAllResponseData,majorInfoData,majorListFormData,majorListResponseData,majorResponseData } from "./type";
//分配学校相关的请求地址
enum API{
  MAJOR_ALL_URL="/manage/major/all",
  MAJOR_LIST_URL="/manage/major/list",
  MAJOR_ADD_URL="/manage/major/add",
  MAJOR_GET_ID_URL="/manage/major/find",
  MAJOR_UPDATE_URL="/manage/major/update",
  MAJOR_DELETE_URL="/manage/major/delete",
}
//获取数据

export const reqmajorAll = ()=>
  request.get<any,majorAllResponseData>(API.MAJOR_ALL_URL)

export const reqmajorList = (data:majorListFormData)=>
  request.post<any,majorListResponseData>(API.MAJOR_LIST_URL,data)

export const reqmajorAdd = 
  (data:majorInfoData)=>request.post<any,majorResponseData>(API.MAJOR_ADD_URL,data)

export const reqmajorById = 
  (_id:string)=>request.get<any,majorResponseData>(API.MAJOR_GET_ID_URL + `?_id=${_id}`)

export const reqmajorUpdate = 
  (data:majorInfoData)=>request.post<any,majorResponseData>(API.MAJOR_UPDATE_URL,data);

export const reqmajorDelete = 
  (majorId:string)=>request.post<any,majorResponseData>(API.MAJOR_DELETE_URL,{majorId})
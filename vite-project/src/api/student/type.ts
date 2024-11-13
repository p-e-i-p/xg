
export interface studentInfoData {
  _id: string | null,
  name: string,
  gender: string,
  school?: string,
  major?: string,
  grade?: string,
  education?: string,
  direction: string,
  id_number?: string,
  phone?: string,
  parent?: string
  parent_phone?: string,
  address?: string,
  qq?: string,
  class: string,
  admission_date?: string,
  teacher_id: string,
  manager_id: string,
  pictures?: string[],
  note?: string,
  __v: number
}
export interface searchMapData {
  name: string,
  direction: string,
  teacher_id: string,
  manager_id: string,
}
export interface studentResponseData {
  status: number,
  // data?:dataType,
  data?: studentInfoData,
  msg?: string
}

export interface studentListFormData {
  page: number,
  size: number,
  searchMap: searchMapData
}

export interface studentAllResponseData {
  status: number,
  data?: studentInfoData[],
  msg?: string
}
export interface studentListResponseData {
  status: number,
  data?: studentListData,
  msg?: string
}

export interface studentListData {
  data: studentInfoData[],

  total: number
}
interface monthData {
  _id: string
  count: number
}
// 查询某一年每月学员数量接口返回数据类型
export interface studentYearResponseData {
  status: string
  data: monthData[]
}

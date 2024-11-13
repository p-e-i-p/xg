export interface classInfoData{
  _id:string,
  classname:string,
  teacher_id:string,
  manager_id:string,
  __v:number,
 
}

export interface classListFormData{
  page:number,
  size:number,
  searchMap:searchMapData
}
export interface searchMapData{
  teacher_id:string,
  manager_id:string,
}


export interface classResponseData{
  status:number,
  data?:classInfoData,
  msg?:string
}

export interface classAllResponseData{
  status:number,
  data?:classInfoData[],
  msg?:string
}

export interface classListData {
  data:classInfoData[],
  total:number
}

export interface classListResponseData{
  status:number,
  data?:classListData,
  msg?:string
}





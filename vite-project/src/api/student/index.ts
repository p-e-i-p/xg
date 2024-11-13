import request from "@/utils/request";
import type {
  studentResponseData,
  studentAllResponseData,
  studentListResponseData,
  studentListFormData,
  studentInfoData,
  studentYearResponseData
} from "./type";

enum API {

  STUDENT_ALL_URL = "/manage/student/all",
  STUDENT_LIST_URL = "/manage/student/list",
  STUDENT_ADD_URL = "/manage/student/add",
  STUDENT_GET_ID_URL = "/manage/student/find",
  STUDENT_UPDATE_URL = "/manage/student/update",
  STUDENT_DELETE_URL = "/manage/student/delete",
  STUDENT_MOUNTH_DATA_URL = '/manage/student/date',
}


export const reqstudentAll = () =>
  request.get<any, studentAllResponseData>(API.STUDENT_ALL_URL)

export const reqstudentList = (data: studentListFormData) =>
  request.post<any, studentListResponseData>(API.STUDENT_LIST_URL, data)

export const reqstudentAdd =
  (data: studentInfoData) => request.post<any, studentResponseData>(API.STUDENT_ADD_URL, data)

export const reqstudentById =
  (_id: string) => request.get<any, studentResponseData>(API.STUDENT_GET_ID_URL + `?_id=${_id}`)

export const reqstudentUpdate =
  (data: studentInfoData) => request.post<any, studentResponseData>(API.STUDENT_UPDATE_URL, data);

export const reqstudentDelete =
  (studentId: string) => request.post<any, studentResponseData>(API.STUDENT_DELETE_URL, { studentId })
  // 获取某一年每月学员数量
export const reqStudentForYear = (year: number) =>
  request.post<any, studentYearResponseData>(API.STUDENT_MOUNTH_DATA_URL, {
    year,
  })

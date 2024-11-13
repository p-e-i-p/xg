<template>
  <div class="student-update">
    <el-button
      icon="el-icon-arrow-left"
      @click="$router.push('/student')"
      circle
    ></el-button>
    <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
    <el-form
      status-icon
      ref="studentFormRef"
      :model="updateStudent"
      label-width="100px"
      label-position="right"
      style="width: 100%; height: 100%"
      :rules="rules"
      class="update-form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateStudent.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select
          v-model="updateStudent.gender"
          class="filter-item"
          placeholder="请点击选择"
          width="600px"
        >
          <el-option
            v-for="option in genderOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所在学校" prop="school">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.school"
          :fetch-suggestions="querySearchSchool"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-autocomplete
          class="inline-input"
          v-model="updateStudent.major"
          :fetch-suggestions="querySearchMajor"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select
          v-model="updateStudent.grade"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in gradeOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-select
          v-model="updateStudent.education"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in educationOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学习方向" prop="direction">
        <el-select
          v-model="updateStudent.direction"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in directionOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" prop="id_number">
        <el-input v-model="updateStudent.id_number" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="updateStudent.phone" />
      </el-form-item>
      <el-form-item label="家长姓名" prop="parent">
        <el-input v-model="updateStudent.parent" />
      </el-form-item>
      <el-form-item label="家长联系电话" prop="parent_phone">
        <el-input v-model="updateStudent.parent_phone" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
        <el-input v-model="updateStudent.address" />
      </el-form-item>
      <el-form-item label="QQ号码" prop="qq">
        <el-input v-model="updateStudent.qq" />
      </el-form-item>
      <el-form-item label="所在班级" prop="class">
        <el-select
          v-model="updateStudent.class"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="入学时间" prop="admission_date">
        <el-date-picker
          v-model="updateStudent.admission_date"
          type="date"
          placeholder="请点击选择"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="授课教师" prop="teacher_id">
        <el-select
          v-model="updateStudent.teacher_id"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学管" prop="manager_id">
        <el-select
          v-model="updateStudent.manager_id"
          class="filter-item"
          placeholder="请点击选择"
        >
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="照片" prop="pictures">
        <el-upload
          :action="baseApi + '/manage/img/upload'"
          list-type="picture-card"
          :auto-upload="true"
          name="image"
          accept="image/*"
          :file-list="fileList"
          :on-change="handleChange"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="备注" prop="note">
        <Editor
          v-model="updateStudent.note"
          :api-key="tiny.apiKey"
          :init="tiny.init"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        class="button"
        type="primary"
        @click="
          updateStudent._id === null
            ? addData(studentFormRef)
            : updateData(studentFormRef)
        "
      >
        确 定
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
/* -----------关于图片上传-------------- */
const baseUrl = import.meta.env.VITE_APP_SERVICE_URL
const baseApi = import.meta.env.VITE_APP_BASE_API


import type { UploadFile, UploadProps, UploadUserFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
// 引入axios对象，用于删除图片
import request from '@/utils/request'
// 删除图片
const handleRemove = (file: UploadFile) => {
  request
    .post<any, any>('/manage/img/delete', { name: file.name })
    .then((response) => {
      if (response.status == 0) {
        fileList.value.splice(fileList.value.indexOf(file), 1)
      }
    })
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
// 记录已经上传的图片文件数组
const fileList = ref<UploadUserFile[]>([])
// 文件状态发生变化时候的钩子函数,添加文件、上传成功、上传失败的时候都会自动调用
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  if (uploadFile.status === "success") {
    const result = uploadFile.response;
    if (result.status === 0) {
      const { name, url } = result.data;
      uploadFile = uploadFiles[uploadFiles.length - 1];
      uploadFile.name = name;
      uploadFile.url = url;
    }
  }
  fileList.value = uploadFiles;
};
/* -----------关于图片上传结束-------------- */

import Editor from '@tinymce/tinymce-vue'
const tiny = reactive({
  apiKey: 'ew5ar9jjvxi22uelaftqfbpwidg9t1olqo4d9cb0xqwzhdiz', //https://github.com/tinymce/tinymce-vue/blob/main/src/demo/views/Iframe.vue
  init: {
    language: 'zh_CN', //语言类型
    placeholder: '在这里输入文字', //textarea中的提示信息
    min_width: 320,
    min_height: 220,
    height: 500, //注：引入autoresize插件时，此属性失效
    resize: 'both', //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    branding: false, //tiny技术支持信息是否显示
    statusbar: true,  //最下方的元素路径和字数统计那一栏是否显示
    // elementpath: false, //元素路径是否显示
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', //字体样式
    plugins:
      'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons', //插件配置 axupimgs indent2em
    toolbar: [
      'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ',
      'styleselect formatselect fontselect fontsizeselect |  table image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter',
    ], //工具栏配置，设为false则隐藏
    // menubar: "file edit my1", //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
    // images_upload_url: '/apib/api-upload/uploadimg',  //后端处理程序的url，建议直接自定义上传函数image_upload_handler，这个就可以不用了
    // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
    paste_data_images: true, //图片是否可粘贴
    //此处为图片上传处理函数
    images_upload_handler: (blobInfo, success, failure) => {
      failure = failure
      // 这里用base64的图片形式上传图片,
      let reader = new FileReader() //本地预览
      reader.readAsDataURL(blobInfo.blob())
      reader.onloadend = function () {
        const imgbase64 = reader.result
        success(imgbase64)
      }
    },
    file_picker_types: 'file image media', //file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
    // 文件上传处理函数
    file_picker_callback: function (callback, value, meta) {
      value = value
      let filetype 
      if (meta.filetype == 'image') {
        filetype = '.jpg, .jpeg, .png, .gif, .ico, .svg'
      } else if (meta.filetype == 'media') {
        filetype = '.mp3, .mp4, .avi, .mov'
      } else {
        filetype =
          '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg'
      }
      let inputElem = document.createElement('input') //创建文件选择
      inputElem.setAttribute('type', 'file')
      inputElem.setAttribute('accept', filetype)
      inputElem.click()
      inputElem.onchange = () => {
        let file = inputElem.files[0] //获取文件信息
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {

          let id = 'blobid' + new Date().getTime()

          let blobCache = tinymce.activeEditor.editorUpload.blobCache

          let base64 = reader.result.split(',')[1]
          let blobInfo = blobCache.create(id, file, base64)
          blobCache.add(blobInfo)

          callback(blobInfo.blobUri(), { title: file.name })
        }
      }
    },
  },
})
/* ----------------富文本相关内容结束------------------------- */
// 获取路由对象
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()

import useRoleStore from '@/store/modules/role'
let roleStore = useRoleStore()
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
import useClassStore from '@/store/modules/class'
let classStore = useClassStore()

import useSchoolStore from '@/store/modules/school'
let schoolStore = useSchoolStore()

import useMajorStore from '@/store/modules/major'
let majorStore = useMajorStore()

import useStudentStore from '@/store/modules/student'
let studentStore = useStudentStore()

import { roleInfoData } from '@/api/role/types'
import { userInfoData } from '@/api/user/type'
import { classInfoData } from '@/api/class/types'
import { schoolInfoData } from '@/api/school/types'
import { majorInfoData } from '@/api/major/types'
import { studentInfoData } from '@/api/student/types'
let roleOptions = ref<roleInfoData[] | undefined>([])
let userOptions = ref<userInfoData[] | undefined>([])
let teacher_role_id = ref<string | undefined>('')
let manager_role_id = ref<string | undefined>('')
let teacherOptions = ref<userInfoData[]>([])
let managerOptions = ref<userInfoData[]>([])
let classOptions = ref<classInfoData[]>([])
let schoolOptions = ref<schoolInfoData[]>([])
let majorOptions = ref<majorInfoData[]>([])
const studentFormRef = ref<FormInstance>()

interface FilterData {
  _id: string
  name: string
}

const genderOptions = ref<FilterData[]>([
  { _id: '0', name: '男' },
  { _id: '1', name: '女' },
])

const gradeOptions = ref<FilterData[]>([
  { _id: '1', name: '大一' },
  { _id: '2', name: '大二' },
  { _id: '3', name: '大三' },
  { _id: '4', name: '大四' },
  { _id: '5', name: '在读研究生' },
])

const educationOptions = ref<FilterData[]>([
  { _id: '1', name: '专科' },
  { _id: '2', name: '本科' },
  { _id: '3', name: '硕士' },
  { _id: '4', name: '社会' },
])

const directionOptions = ref<FilterData[]>([
  { _id: '1', name: 'web前端' },
  { _id: '2', name: 'Java' },
  { _id: '3', name: 'UI/UE' },
  { _id: '4', name: 'C/C++' },
  { _id: '5', name: '产品经理' },
])

// 自定义电话号码校验规则
const validatePhone = (rule: any, value: any, callback: any) => {
  rule = rule
  value = value.trim()
  const phoneRef =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (value === '') {
    callback(new Error('请输入电话号码'))
  } else if (!phoneRef.test(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}
const validateIdNumber = (rule: any, value: any, callback: any) => {
  rule = rule
  value = value.trim()
  const _IDRe18 =
    /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const _IDre15 =
    /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
  if (_IDRe18.test(value) || _IDre15.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的身份号码'))
  }
}
const getRoleList = () => {
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles
    roleOptions.value.forEach((item) => {
      // item:mongdb数据库中存储的每一个角色，将它们进行遍历。一个一个的拿出来比较
      if (item.name == '教师') {
        teacher_role_id.value = item._id
      } else if (item.name == '学管') {
        manager_role_id.value = item._id
      }
    })
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles
      roleOptions.value.forEach((item) => {
        // item:mongdb数据库中存储的每一个角色，将它们进行遍历。一个一个的拿出来比较
        if (item.name == '教师') {
          teacher_role_id.value = item._id
        } else if (item.name == '学管') {
          manager_role_id.value = item._id
        }
      })
    })
  }
}

const getUserList = () => {
  if (userStore.users?.length) {
    userOptions.value = userStore.users
    userOptions.value.forEach((item) => {
      // 判断如果当前被遍历到的用户的身份为教师，那么就需要将这个用户对象添加到教师数组中
      if (item.role_id == teacher_role_id.value) {
        teacherOptions.value.push(item)
      } else if (item.role_id == manager_role_id.value) {
        managerOptions.value.push(item)
      }
    })
  } else {
    userStore.getUserAll().then(() => {
      userOptions.value = userStore.users
      userOptions.value.forEach((item) => {
        // 判断如果当前被遍历到的用户的身份为教师，那么就需要将这个用户对象添加到教师数组中
        if (item.role_id == teacher_role_id.value) {
          teacherOptions.value.push(item)
        } else if (item.role_id == manager_role_id.value) {
          managerOptions.value.push(item)
        }
      })
    })
  }
}

const getClassList = () => {
  if (classStore.classes?.length) {
    classOptions.value = classStore.classes
  } else {
    classStore.getClassAll().then(() => {
      classOptions.value = classStore.classes as classInfoData[]
    })
  }
}

const getSchoolList = () => {
  if (schoolStore.schools?.length) {
    schoolOptions.value = schoolStore.schools
  } else {
    schoolStore.getschoolAll().then(() => {
      schoolOptions.value = schoolStore.schools as schoolInfoData[]
    })
  }
}

const getMajorList = () => {
  if (majorStore.majors?.length) {
    majorOptions.value = majorStore.majors
  } else {
    majorStore.getmajorAll().then(() => {
      majorOptions.value = majorStore.majors as majorInfoData[]
    })
  }
}

let updateStudent = ref<studentInfoData>({
  _id: null,
  name: '', //姓名
  gender: '', //性别
  school: '', //学校
  major: '', //专业
  grade: '', //年级
  education: '', //学历
  direction: '', //学习方向
  id_number: '', //身份号码
  phone: '', //电话号码
  parent: '', //家长姓名
  parent_phone: '', //家长联系电话
  address: '', //家庭住址
  qq: '', //QQ号码
  class: '', //所在班级
  admission_date: '', //入学时间
  teacher_id: '', //教师id
  manager_id: '', //学管id
  pictures: [], //照片数组
  note: '', //备注信息
})


const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  direction: [{ required: true, message: '请选择学习方向', trigger: 'blur' }],
  class: [{ required: true, message: '请选择所在班级', trigger: 'blur' }],
  admission_date: [
    { required: true, message: '请选择入学时间', trigger: 'blur' },
  ],
  teacher_id: [{ required: true, message: '请选择授课教师', trigger: 'blur' }],
  manager_id: [{ required: true, message: '请选择学管', trigger: 'blur' }],
  phone: [
    { required: true, validator: validatePhone, trigger: ['blur', 'change'] },
  ],
  id_number: [
    {
      required: true,
      validator: validateIdNumber,
      trigger: ['blur', 'change'],
    },
  ],
})

const querySearchSchool = (queryString: any, cb: any) => {
  schoolOptions.value.forEach((item) => {
    return (item.value = item.schoolname);
  });
  let results = queryString
    ? schoolOptions.value.filter(createFilter(queryString))
    : majorOptions.value;
  cb(results);
};
const querySearchMajor = (queryString: any, cb: any) => {
  majorOptions.value.forEach((item: any) => {
    return (item.value = item.majorname)
  })
  var results = queryString
    ? majorOptions.value.filter(createFilter(queryString))
    : majorOptions.value
  // 调用 callback 返回建议列表的数据
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: any) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

// 获取所有已上传图片名称数组
const getImgs = () => {
  return fileList.value.map((item) => item.name);
};
// 添加学员
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      updateStudent.value.pictures = getImgs();
      studentStore.addstudent((updateStudent.value as studentInfoData)).then(response=>{
        $router.replace("/student")
      })
    } else {
      return false
    }
  })
}
// 获取要编辑的学员信息
const getStudent = ()=>{
  const {_id} = $route.params;
  if(_id!="-1"){
    studentStore.getstudentByid(_id as string).then(response=>{
      updateStudent.value = response as studentInfoData
      const {pictures} = response as studentInfoData
      if(pictures && pictures.length!=0){
        fileList.value = pictures.map( item=>({
          name:item,
          url:baseApi + "/upload" + item
        }))
      }
    })
  }
}

// 编辑学员
const updateData = (formEl:FormInstance | undefined)=>{
  if(!formEl) return
  formEl.validate(async (valid)=>{
    if(valid){
      updateStudent.value.pictures = getImgs()
      studentStore.updatestudent(updateStudent.value).then((response)=>{
        $router.replace("/student")
      })
    }else{
      return false
    }
  })
}
onMounted(() => {
  getRoleList()
  getUserList()
  getClassList()
  getSchoolList()
  getMajorList()
  getStudent()
})
</script>

<style scoped>
.el-input {
  width: 400px;
}
.tinymce-boxz > textarea {
  display: none;
}

.tox-notifications-container .tox-notifications-warning {
  display: none !important;
}
.tox.tox-tinymce {
  max-width: 100%;
}

</style>

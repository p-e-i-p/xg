<template>
  <div class="tm">
    <!-- 条件查询表单 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px 0"
      ref="searchFormRef"
    >
      <el-form-item prop="name" style="width: 180px">
        <el-input v-model="searchMap.name" placeholder="根据姓名查询" />
      </el-form-item>
      <el-form-item prop="direction" style="width: 180px">
        <el-select v-model="searchMap.direction" placeholder="根据学习方向查询">
          <el-option
            v-for="option in directionOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="class" style="width: 180px">
        <el-select v-model="searchMap.class" placeholder="根据所在班级查询">
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.classname"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="teacher_id" style="width: 180px">
        <el-select
          v-model="searchMap.teacher_id"
          placeholder="根据授课教师查询"
        >
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="manager_id" style="width: 180px">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetForm(searchFormRef)">重置</el-button>
        <el-button type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table    :data="students" border style="width: 100%; height: 380px">
      <el-table-column type="expand">
        <template #default="props">
          <!-- 这里展示的是展开行中的内容 -->
          <el-form label-position="left" inline class="student-table-expand">
            <el-form-item label="学员姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ dataFilter(props.row.gender, genderOptions) }}</span>
            </el-form-item>
            <el-form-item label="所在学校">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="年级">
              <span>{{ dataFilter(props.row.grade, gradeOptions) }}</span>
            </el-form-item>
            <el-form-item label="学历">
              <span>
                {{ dataFilter(props.row.education, educationOptions) }}
              </span>
            </el-form-item>
            <el-form-item label="学习方向">
              <span>
                {{ dataFilter(props.row.direction, directionOptions) }}
              </span>
            </el-form-item>
            <el-form-item label="身份号码">
              <span>{{ props.row.id_number }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="家长姓名">
              <span>{{ props.row.parent }}</span>
            </el-form-item>
            <el-form-item label="家长联系电话">
              <span>{{ props.row.parent_phone }}</span>
            </el-form-item>
            <el-form-item label="家庭住址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="QQ号码">
              <span>{{ props.row.qq }}</span>
            </el-form-item>
            <el-form-item label="所在班级">
              <span>{{ dataFilter(props.row.class, classOptions) }}</span>
            </el-form-item>
            <el-form-item label="入学时间">
              <span>{{ props.row.admission_date }}</span>
            </el-form-item>
            <el-form-item label="授课教师">
              <span>
                {{ dataFilter(props.row.teacher_id, teacherOptions) }}
              </span>
            </el-form-item>
            <el-form-item label="学管">
              <span>
                {{ dataFilter(props.row.manager_id, managerOptions) }}
              </span>
            </el-form-item>
            <el-form-item label="照片">
              <el-image
                v-for="(item, index) in props.row.pictures"
                :key="index"
                style="width: 200px; height: 200px; margin-left: 5px"
                :src="baseUrl + '/upload/' + item"
                :preview-src-list="getSrcList(props.row.pictures)"
              />
            </el-form-item>
            <el-form-item label="备注信息">
              <span v-html="props.row.note"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="学员姓名" prop="name" />
      <el-table-column label="性别" prop="gender">
        <template #default="scope">
          <span>{{ dataFilter(scope.row.gender, genderOptions) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学习方向" prop="direction">
        <template #default="scope">
          <span>{{ dataFilter(scope.row.direction, directionOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="phone" />
      <el-table-column label="所在班级" prop="class">
        <template #default="scope">
          <span>{{ dataFilter(scope.row.class, classOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入学时间" prop="admission_date" />
      <el-table-column label="授课教师" prop="teacher_id">
        <template #default="scope">
          <span>{{ dataFilter(scope.row.teacher_id, teacherOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学管" prop="manager_id">
        <template #default="scope">
          <span>{{ dataFilter(scope.row.manager_id, managerOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { studentInfoData } from "@/api/student/types";
import { onMounted, reactive, ref } from "vue";
import useStudentStore from "@/store/modules/student";
const baseUrl = import.meta.env.VITE_APP_SERVICE_URL;
const studentStore = useStudentStore();
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
// 获取路由对象
import { useRouter } from "vue-router";
let $router = useRouter();
import useRoleStore from "@/store/modules/role";
import useUserStore from "@/store/modules/user";
import useClassStore from "@/store/modules/class";
import { roleInfoData } from "@/api/role/types";
import { userInfoData } from "@/api/user/type";
import { classInfoData } from "@/api/class/types";
import { FormInstance, ElMessage, ElMessageBox } from "element-plus";
let classStore = useClassStore();
let userStore = useUserStore();
let roleStore = useRoleStore();
let roleOptions = ref<roleInfoData[] | undefined>([]);
let userOptions = ref<userInfoData[] | undefined>([]);
let teacher_role_id = ref<string | undefined>("");
let manager_role_id = ref<string | undefined>("");
let teacherOptions = ref<userInfoData[]>([]);
let managerOptions = ref<userInfoData[]>([]);
let classOptions = ref<classInfoData[]>([]);
const students = ref<studentInfoData[] | undefined>([]);
  const getSrcList = (imgList: string[]) => {
  return imgList.map((item) => baseUrl + "/upload/" + item);
};

// 条件筛选对象
const searchMap = reactive({
  name: "",
  direction: "",
  teacher_id: "",
  manager_id: "",
  class: "",
});
interface FilterData {
  _id: string;
  name: string;
}
// 性别数据格式化列表
const genderOptions = ref<FilterData[]>([
  { _id: "0", name: "男" },
  { _id: "1", name: "女" },
]);
// 年级数据格式化列表
const gradeOptions = ref<FilterData[]>([
  { _id: "1", name: "大一" },
  { _id: "2", name: "大二" },
  { _id: "3", name: "大三" },
  { _id: "4", name: "大四" },
  { _id: "5", name: "在读研究生" },
]);
// 学历数据格式化列表
const educationOptions = ref<FilterData[]>([
  { _id: "1", name: "专科" },
  { _id: "2", name: "本科" },
  { _id: "3", name: "硕士" },
  { _id: "4", name: "社会" },
]);
// 学习方向数据格式化列表
const directionOptions = ref<FilterData[]>([
  { _id: "1", name: "web前端" },
  { _id: "2", name: "Java" },
  { _id: "3", name: "UI/UE" },
  { _id: "4", name: "C/C++" },
  { _id: "5", name: "产品经理" },
]);
// 获取角色列表
const getRoleList = () => {
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles;
    roleOptions.value.forEach((item) => {
      // item:mongdb数据库中存储的每一个角色，将它们进行遍历。一个一个的拿出来比较
      if (item.name == "教师") {
        teacher_role_id.value = item._id;
      } else if (item.name == "学管") {
        manager_role_id.value = item._id;
      }
    });
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles;
      roleOptions.value.forEach((item) => {
        // item:mongdb数据库中存储的每一个角色，将它们进行遍历。一个一个的拿出来比较
        if (item.name == "教师") {
          teacher_role_id.value = item._id;
        } else if (item.name == "学管") {
          manager_role_id.value = item._id;
        }
      });
    });
  }
};
// 获取用户列表
const getUserList = () => {
  if (userStore.users?.length) {
    userOptions.value = userStore.users;
    userOptions.value.forEach((item) => {
      // 判断如果当前被遍历到的用户的身份为教师，那么就需要将这个用户对象添加到教师数组中
      if (item.role_id == teacher_role_id.value) {
        teacherOptions.value.push(item);
      } else if (item.role_id == manager_role_id.value) {
        managerOptions.value.push(item);
      }
    });
  } else {
    userStore.getUserAll().then(() => {
      userOptions.value = userStore.users;
      userOptions.value.forEach((item) => {
        // 判断如果当前被遍历到的用户的身份为教师，那么就需要将这个用户对象添加到教师数组中
        if (item.role_id == teacher_role_id.value) {
          teacherOptions.value.push(item);
        } else if (item.role_id == manager_role_id.value) {
          managerOptions.value.push(item);
        }
      });
    });
  }
};
// 获取班级列表
const getClassList = () => {
  if (classStore.classes?.length) {
    classOptions.value = classStore.classes;
  } else {
    classStore.getClassAll().then(() => {
      classOptions.value = classStore.classes as classInfoData[];
    });
  }
};
// 获取学员数据列表
const getStudentList = () => {
  studentStore
    .getstudentList({
      page: currentPage.value,
      size: pageSize.value,
      searchMap,
    })
    .then((response) => {
      students.value = studentStore.students;
      console.log(students.value);

      total.value = response?.total as number;
    });
};
// 过滤要显示的数据
// 65152b20bb97964fa7f1e864
const dataFilter = (_id: string, options: any) => {
  const obj = options?.find((item) => item._id == _id);
  // 判断如果各个options数组中有与传入的_id匹配的元素，那么再进行判断如果当前元素对象有name属性，那么就返回name的值，否则返回classname值(主要处理班级数据)
  // if(obj){
  //     if(obj.name){
  //         return obj.name
  //     }else{
  //         return obj.classname
  //     }
  // }else{
  //     return null
  // }
  // 上面代码的简写方式（利用三元运算符）
  return obj ? (obj.name ? obj.name : obj.classname) : null;
};

// 格式化教师名称
// @ts-ignore
const formatTeacher = (
  row: any,
  colum: any,
  cellValue: string,
  index: number
) => {
  let teacher = teacherOptions?.value?.find((item) => item._id == cellValue);
  return teacher?.name;
};
// 格式化学管名称
// @ts-ignore
const formatManager = (
  row: any,
  colum: any,
  cellValue: string,
  index: number
) => {
  let manager = managerOptions?.value?.find((item) => item._id == cellValue);
  return manager?.name;
};



onMounted(() => {
  getRoleList();
  getUserList();
  getClassList();
  getStudentList();
});

const handleEdit = (_id) => {
  $router.push(`/updatestudent/${_id}`);
};
const handleDelete = (_id) => {
  ElMessageBox.confirm("确定要删除此条数据吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      studentStore.deleteStudent(_id).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getStudentList();
      });
    })
    .catch(() => {});
};
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getStudentList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getStudentList();
};

// 添加班级路由跳转
const handleAdd = () => {
  // -1 代表添加学员
  $router.push("/updatestudent/-1");
};
// 条件查询表单对象
const searchFormRef = ref<FormInstance>();
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 条件查询按钮回调
const searchData = () => {
  currentPage.value = 1;
  getStudentList();
};
</script>

<style scoped>
.student-table-expand {
  padding: 20px;
}

.student-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.student-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

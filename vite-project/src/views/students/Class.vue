<template>
  <div class="tm">
    <!-- 搜索表单 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px 0"
      ref="searchFormRef"
    >
      <el-form-item prop="teacher_id">
        <el-select v-model="searchMap.teacher_id" placeholder="根据教师查询">
          <el-option
            v-for="option in teacherOptions"
            :label="option.name"
            :value="option._id"
            :key="option._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="manager_id">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :label="option.name"
            :value="option._id"
            :key="option._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetForm(searchFormRef)">重置</el-button>
        <el-button type="primary" @click="handleAdd">添加班级</el-button>
      </el-form-item>
    </el-form>

    <!-- 班级表格 -->
    <el-table :data="classes" style="width: 100%; height: 380px">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="classname" label="班级名称" />
      <el-table-column
        prop="teacher_id"
        label="授课教师"
        :formatter="formatTeacher"
      />
      <el-table-column
        prop="manager_id"
        label="学管"
        :formatter="formatManager"
      />

      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEdit(scope.row._id)"
          >
            编辑
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
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
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 添加/编辑班级对话框 -->
    <el-dialog v-model="classFormVisible" title="添加/编辑班级" width="500px">
      <el-form
        :model="updateClass"
        label-width="100px"
        label-position="right"
        ref="classFormRef"
        :rules="rules"
        style="width: 400px"
      >
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="updateClass.classname" />
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select v-model="updateClass.teacher_id">
            <el-option
              v-for="option in teacherOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学管" prop="manager_id">
          <el-select v-model="updateClass.manager_id">
            <el-option
              v-for="option in managerOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              updateClass._id == null
                ? addData(classFormRef)
                : updateData(classFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="classFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { classInfoData } from "@/api/class/types";
import { onMounted, ref, reactive, nextTick } from "vue";
import useClassStore from "@/store/modules/class";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

// 引入角色小仓库
import useRoleStore from "@/store/modules/role";
let roleStore = useRoleStore();

// 引入用户小仓库
import useUserStore from "@/store/modules/user";
import { roleInfoData } from "@/api/role/types";
import { userInfoData } from "@/api/user/type";
let userStore = useUserStore();

// 角色列表
let roleOptions = ref<roleInfoData[] | undefined>([]);

// 角色列表
let userOptions = ref<userInfoData[] | undefined>([]);

// 角色为教师的id
let teacher_role_id = ref<string | undefined>("");

// 角色为学管的id
let manager_role_id = ref<string | undefined>("");

// 教师列表
let teacherOptions = ref<userInfoData[]>([]);

// 学管列表
let managerOptions = ref<userInfoData[]>([]);

/**
 * 获取角色列表
 */
const getRoleList = () => {
  // 如果角色小仓库中已有角色数据
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles;
    roleOptions.value.forEach((item) => {
      // 比较每个角色的名称，确定教师和学管的角色id
      if (item.name === "教师") {
        teacher_role_id.value = item._id;
      } else if (item.name === "学管") {
        manager_role_id.value = item._id;
      }
    });
  } else {
    // 否则从后端获取角色数据
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles;
      roleOptions.value.forEach((item) => {
        // 比较每个角色的名称，确定教师和学管的角色id
        if (item.name === "教师") {
          teacher_role_id.value = item._id;
        } else if (item.name === "学管") {
          manager_role_id.value = item._id;
        }
      });
    });
  }
};

/**
 * 获取用户列表
 */
const getUserList = () => {
  // 如果用户小仓库中已有用户数据
  if (userStore.users?.length) {
    userOptions.value = userStore.users;
    userOptions.value.forEach((item) => {
      // 根据角色id判断用户是教师还是学管，分别添加到对应的数组
      if (item.role_id === teacher_role_id.value) {
        teacherOptions.value.push(item);
      } else if (item.role_id === manager_role_id.value) {
        managerOptions.value.push(item);
      }
    });
  } else {
    // 否则从后端获取用户数据
    userStore.getUserAll().then(() => {
      userOptions.value = userStore.users;
      userOptions.value.forEach((item) => {
        // 根据角色id判断用户是教师还是学管，分别添加到对应的数组
        if (item.role_id === teacher_role_id.value) {
          teacherOptions.value.push(item);
        } else if (item.role_id === manager_role_id.value) {
          managerOptions.value.push(item);
        }
      });
    });
  }
};

/**
 * 格式化教师名称
 * @param row 行数据
 * @param colum 列数据
 * @param cellValue 单元格值
 * @param index 索引
 * @returns 格式化后的教师名称
 */
// @ts-ignore
const formatTeacher = (
  row: any,
  colum: any,
  cellValue: string,
  index: number
) => {
  let teacher = teacherOptions?.value?.find((item) => item._id === cellValue);
  return teacher?.name;
};

/**
 * 格式化学管名称
 * @param row 行数据
 * @param colum 列数据
 * @param cellValue 单元格值
 * @param index 索引
 * @returns 格式化后的学管名称
 */
// @ts-ignore
const formatManager = (
  row: any,
  colum: any,
  cellValue: string,
  index: number
) => {
  let manager = managerOptions?.value?.find((item) => item._id === cellValue);
  return manager?.name;
};

// 条件查询表单对象
const searchFormRef = ref<FormInstance>();

/**
 * 重置按钮回调
 * @param formEl 表单实例
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

/**
 * 条件查询按钮回调
 */
const searchData = () => {
  currentPage.value = 1;
  getClassList();
};

let classStore = useClassStore();

// 班级数据列表
const classes = ref<classInfoData[] | undefined>([]);

// 当前页码
const currentPage = ref(1);

// 每页显示多少条数据
const pageSize = ref(5);

// 数据总条数
const total = ref(0);

const classFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  classname: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
  teacher_id: [{ required: true, message: "请选择教师", trigger: "blur" }],
  manager_id: [{ required: true, message: "请选择学管", trigger: "blur" }],
});

// 弹窗是否展示
const classFormVisible = ref(false);

// 添加/编辑班级表单收集数据对象
const updateClass = ref<classInfoData>({
  _id: null,
  classname: "",
  teacher_id: "",
  manager_id: "",
});

// 条件查询数据收集对象
let searchMap = reactive({
  teacher_id: "",
  manager_id: "",
});

/**
 * 添加班级弹窗展示
 */
const handleAdd = () => {
  updateClass.value = {
    _id: null,
    classname: "",
    teacher_id: "",
    manager_id: "",
  };
  classFormVisible.value = true;
  nextTick(() => {
    classFormRef.value.resetFields();
  });
};

/**
 * 添加班级数据提交
 * @param formEl 表单实例
 */
const addData = (formEl: FormInstance | undefined) => {
  console.log(updateClass.value);

  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      classStore.addClass(updateClass.value as classInfoData).then(() => {
        classFormVisible.value = false;
        getClassList();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

/**
 * 更新班级数据提交
 * @param formEl 表单实例
 */
const updateData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      classStore.updateClass(updateClass.value as classInfoData).then(() => {
        classFormVisible.value = false;
        getClassList();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

/**
 * 编辑班级
 * @param _id 班级id
 */
const handleEdit = (_id) => {
  handleAdd();
  classStore.getClassByid(_id).then((response) => {
    updateClass.value = response;
  });
};

/**
 * 删除班级
 * @param _id 班级id
 */
const handleDelete = (_id) => {
  ElMessageBox.confirm("确定要删除此条数据吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      classStore.deleteClass(_id).then(() => {
        // 重新获取数据刷新列表
        getClassList();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    })
    .catch(() => {
      return false;
    });
};

/**
 * 获取班级列表
 */
const getClassList = () => {
  classStore
    .getClassList({ page: currentPage.value, size: pageSize.value, searchMap })
    .then((response) => {
      classes.value = classStore.classes;
      total.value = response?.total as number;
    });
};

/**
 * 每页显示条数改变时的处理
 * @param val 新的每页显示条数
 */
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getClassList();
};

/**
 * 当前页码改变时的处理
 * @param val 新的页码
 */
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getClassList();
};

onMounted(() => {
  getClassList();
  getRoleList();
  getUserList();
});
</script>

<style scoped>
.el-select {
  width: 200px;
}
</style>
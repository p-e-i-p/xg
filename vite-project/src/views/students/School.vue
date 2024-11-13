<template>
  <div class="tm">
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增学校</el-button>
    </div>
    <el-table :data="schools" style="width: 100%; height: 380px" border>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="schoolname" label="学校名称"></el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加学校对话框 -->
    <el-dialog v-model="schoolFormVisible" title="添加学校" width="500px">
      <el-form
        :model="school"
        ref="schoolFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="schoolname">
          <el-input v-model="school.schoolname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              school._id === null
                ? addData(schoolFormRef)
                : updateData(schoolFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="schoolFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref, reactive, nextTick } from "vue";
import type { schoolInfoData } from "@/api/school/type";
import useschoolStore from "@/store/modules/school";

let schoolStore = useschoolStore();

const schools = ref<schoolInfoData[] | undefined>([]);
let school = ref<schoolInfoData | undefined>({
  _id: null,
  schoolname: "",
});

const schoolFormVisible = ref(false);
const rules = reactive<FormRules>({
  schoolname: [
    { required: true, message: "please input school name", trigger: "blur" },
  ],
});
const schoolFormRef = ref<FormInstance>()
//打开弹框
const handlerAdd = () => {
  schoolFormVisible.value = true;
  nextTick(() => {
    schoolFormRef.value.resetFields();
  });
  school.value = {
    _id: null,
    schoolname: "",
  };
};

//增加
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      schoolStore.addschool(school.value as schoolInfoData).then((response) => {
        schoolFormVisible.value = false;
        getSchoolList();
      });
    } else {
      return false;
    }
  });
};
//打开编辑窗口
const handleEdit = (_id: string) => {
  handlerAdd();
  schoolStore.getschoolByid(_id).then((response) => {
    school.value = response;
  });
};
//编辑
const updateData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      schoolStore
        .updateschool(school.value as schoolInfoData)
        .then((response) => {
          schoolFormVisible.value = false;
          getSchoolList();
        });
    } else {
    }
  });
};
//删除
const handleDelete = (_id: string) => {
  ElMessageBox.confirm("确定删除词条数据吗？", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      schoolStore.deleteschool(_id).then((response) => {
        getSchoolList();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    })
    .catch(() => {});
};

// 分页
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const totalPage = ref(1);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getSchoolList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getSchoolList();
};

const getSchoolList = () => {
  schoolStore
    .getSchoolList({ page: currentPage.value, size: pageSize.value })
    .then((response) => {
      schools.value = schoolStore.schools;
      total.value = response?.total as number;
      totalPage.value = total.value / pageSize.value;
    });
};




onMounted(() => {
  getSchoolList();
});
</script>
<style>
</style>
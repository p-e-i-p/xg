<template>
  <div class="tm">
    <div style="margin: 20px 0" class="btn_box">
      <el-button type="primary" @click="handlerAdd">新增专业</el-button>
    </div>
    <el-table :data="majors" style="width: 100%; height: 380px" border>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="majorname" label="专业名称"></el-table-column>

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
    <el-dialog v-model="majorFormVisible" title="添加专业" width="500px">
      <el-form
        :model="major"
        ref="majorFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="majorname">
          <el-input v-model="major.majorname"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              major._id === null
                ? addData(majorFormRef)
                : updateData(majorFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="majorFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from "element-plus";
import { onMounted, ref, reactive, nextTick } from "vue";
import type { majorInfoData } from "@/api/major/type";
import usemajorStore from "@/store/modules/major";

let majorStore = usemajorStore();
const majorFormRef = ref<FormInstance>();
const majors = ref<majorInfoData[] | undefined>([]);
let major = ref<majorInfoData | undefined>({
  _id: null,
  majorname: "",
});

const majorFormVisible = ref(false);
const rules = reactive<FormRules>({
  majorname: [
    { required: true, message: "please input major name", trigger: "blur" },
  ],
});
//打开弹框
const handlerAdd = () => {
  majorFormVisible.value = true;
  majorFormVisible.value = true;
  nextTick(() => {
    majorFormRef.value.resetFields();
  });
  major.value = {
    _id: null,
    majorname: "",
  };
};

//增加
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      majorStore.addmajor(major.value as majorInfoData).then((response) => {
        majorFormVisible.value = false;
        getmajorList();
      });
    } else {
      return false;
    }
  });
};
//打开编辑窗口
const handleEdit = (_id: string) => {
  handlerAdd();
  majorStore.getmajorByid(_id).then((response) => {
    major.value = response;
  });
};
//编辑
const updateData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      majorStore
        .updatemajor(major.value as majorInfoData)
        .then((response) => {
          majorFormVisible.value = false;
          getmajorList();
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
      majorStore.deletemajor(_id).then((response) => {
        getmajorList();
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
  getmajorList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getmajorList();
};

const getmajorList = () => {
  majorStore
    .getmajorList({ page: currentPage.value, size: pageSize.value })
    .then((response) => {
      majors.value = majorStore.majors;
      total.value = response?.total as number;
      totalPage.value = total.value / pageSize.value;
    });
};

onMounted(() => {
  getmajorList();
});
</script>
<style>
</style>
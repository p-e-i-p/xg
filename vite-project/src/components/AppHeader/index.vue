<template>
  <div id="header">
    <a href="#/" style="">

      <span style="font-weight: bold;background-color: #4d4948;padding-left: 10px;padding-right: 10px; text-align: center;width: 207px;" class="company colorful-text">学员管理系统</span>
    </a>
    <!-- 头部右侧下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link colorful-text" style="background-color: #e96101;padding-left: 10px;padding-right: 10px;">
        {{ useStore.user.username}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="date  colorful-text">{{ currentTime }}</span>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" v-model="dialogFormVisible" width="500px">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="原始密码" prop="oldPass">
          <el-input type="password" v-model="userForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="userForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwd(userFormRef)">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from "@/utils/dataUtils";
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive, nextTick, handleError } from "vue";
import useUserStore from "@/store/modules/user";
import type { FormInstance, FormRules } from "element-plus";
import { reqCheckPw  , reqUpdataPwd } from "@/api/user";

let useStore = useUserStore();
const $router = useRouter();
//修改密码弹出是否显示
const dialogFormVisible = ref(false);
const userFormRef = ref<FormInstance>();
const userForm = reactive({
  oldPass: "",
  pass: "",
  checkPass: "",
});
let validataOldPass = (rule: any, value: any, callback: any) => {
  reqCheckPwd({ userId: useStore.user?._id as string, password: value }).then(
    (response) => {
      if (response.status === 0) {
        callback();
      } else {
        callback(new Error(response.msg));
      }
    }
  );
};
let validataPass = (rule: any, value: any, callback: any) => {
  if (value !== userForm.pass) {
    callback(new Error("两次密码输入不一样"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  oldPass: [
    {
      required: true,
      validator: validataOldPass,
      trigger: ["blur", "change"],
    },
  ],
  path: [
    {
      required: true,
      message: "重新输入密码",
      trigger: "blur",
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validataOldPass,
      trigger: "change",
    },
  ],
});

const handleCommand = (command: string) => {
  switch (command) {
    case "a":
      handlePwd();
      break;
    case "b":
      handleLogout();
      break;
    default:
      break;
  }
};
const handleLogout = () => {
  useStore.removeUser();
  if (!useStore.user) {
    $router.replace("/login");
  }
};
const updatePwd = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    reqUpdataPwd({
      userId: useStore?.user?._id as string,
      password: userForm.pass,
    }).then((response) => {
      if (response.status === 0) {
        handleLogout();
        dialogFormVisible.value = false;
      } else {
      }
    });
  });
};
const handlePwd = () => {
  dialogFormVisible.value = true;
  nextTick(() => {
    userFormRef.value.resetFields();
  });
};
let currentTime = ref<string>("");
const getTime = () => {
  setInterval(() => {
    currentTime.value = formatTime(Date.now());
  }, 1000);
};
onMounted(() => {
  getTime();
});
</script>

<style scoped>
.logo {
  vertical-align: middle;
  /* 上 右 下 左 */
  padding: 0 10px 0 40px;
  size: 50px;
}
.company {
  position: absolute;
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
  height: 50px;
  line-height: 50px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.date {
  float: right;
  color: #fff;
  margin-right: 50px;
}




</style>
<script lang='ts' setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import validator from "validator";
import { ElMessage } from "element-plus";
import { userRegist, userLogin } from "../../api/login";
import { useUserInfoStore } from "../../store/user-store";

// 自定义数据
// 路由
const $router = useRouter();
const $store = useUserInfoStore();

// 响应式数据
// 用户登录
const user = reactive({
  userID: "",
  userPassword: "",
});
// 用户注册
const newUser = reactive({
  userID: "",
  userPassword: "",
  userPasswordAgain: "",
});
// 表单切换
const mySwitch = ref(true);

// 自定义方法
// 切换表单
function changeForm() {
  mySwitch.value = !mySwitch.value;
}

// 登录
function login() {
  if (user.userID === "" || user.userPassword === "") {
    ElMessage({
      message: "账号和密码不能为空。",
      type: "error",
    });
    return;
  }
  const param = {
    userID: user.userID,
    userPassword: user.userPassword,
  };
  userLogin(param).then((res) => {
    // 用户名或密码错误
    if (res.data.status !== 200) {
      ElMessage({
        message: "用户名或密码错误",
        type: "error",
      });
      return;
    }
    // 登录成功
    localStorage.setItem("token" + res.data.userID, res.data.tokenStr);
    user.userID = "";
    user.userPassword = "";
    $store.userID = res.data.userID;
    $store.userName = res.data.userName;
    $store.userEmail = res.data.userEmail;
    ElMessage({
      message: "登录成功。",
      type: "success",
    });
    $router.replace({
      path: "/index",
      query: { "user-id": res.data.userID },
    });
  });
}

// 注册
function regist() {
  // 密码或id格式不规范
  if (
    !validator.isAlphanumeric(newUser.userID) ||
    !validator.isAlphanumeric(newUser.userPassword) ||
    !validator.isLength(newUser.userPassword, {
      min: 8,
      max: 16,
    }) ||
    !validator.isLength(newUser.userID, {
      min: 8,
      max: 16,
    })
  ) {
    ElMessage({
      message: "id或密码格式不符合平台规范",
      type: "error",
    });
    return;
  }
  // 两次密码输入不一致
  if (newUser.userPassword !== newUser.userPasswordAgain) {
    ElMessage({
      message: "两次密码输入不一致",
      type: "error",
    });
    return;
  }
  // 注册
  const param = {
    userID: newUser.userID,
    userPassword: newUser.userPassword,
  };
  userRegist(param).then((res) => {
    ElMessage({
      message: res.data.msg,
      type: res.data.status === 200 ? "success" : "warning",
    });
    if (res.data.status === 200) {
      user.userID = newUser.userID;
      newUser.userID = "";
      newUser.userPassword = "";
      newUser.userPasswordAgain = "";
      setTimeout(() => {
        mySwitch.value = true;
      }, 500);
    }
  });
}
</script>

<template>
  <div class="login">
    <!-- 登录表单 -->
    <div class="login__form" v-if="mySwitch">
      <el-input
        class="login__form__input"
        clearable
        placeholder="请输入用户id"
        v-model="user.userID"
      ></el-input>
      <el-input
        class="login__form__input"
        type="password"
        clearable
        placeholder="请输入用户密码"
        v-model="user.userPassword"
      ></el-input>
      <div>
        <el-button type="success" @click="login">登录</el-button>
      </div>
      <div class="notice" @click="changeForm">前往注册页面</div>
    </div>
    <!-- 注册表单 -->
    <div class="regist__form" v-else>
      <el-input
        class="regist__form__input"
        clearable
        placeholder="请输入用户id，由8-16位非特殊字符组成"
        v-model="newUser.userID"
      ></el-input>
      <el-input
        class="regist__form__input"
        type="password"
        clearable
        placeholder="请输入用户密码，由8-16位非特殊字符组成"
        v-model="newUser.userPassword"
      ></el-input>
      <el-input
        class="regist__form__input"
        type="password"
        clearable
        placeholder="请再次输入用户密码"
        v-model="newUser.userPasswordAgain"
      ></el-input>
      <div>
        <el-button type="primary" @click="regist">注册</el-button>
      </div>
      <div class="notice" @click="changeForm">前往登陆页面</div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/images/login.jpg");
  background-size: cover;
  background-position: center 0;
  &__form,
  .regist__form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    align-items: center;
    height: 400px;
    width: 700px;
    padding: 90px 0 40px 0;
    background-color: white;
    border-radius: 30px;
    &__input {
      width: 80%;
    }
    .notice {
      position: absolute;
      bottom: 50px;
      right: 50px;
      font-size: 14px;
      color: #409eff;
      border-bottom: 1px solid #409eff;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

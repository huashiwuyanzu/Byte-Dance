<script lang='ts' setup>
import { Search, HomeFilled } from "@element-plus/icons-vue";
import { ref, reactive, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { useUserInfoStore } from "../../store/user-store";
import { useMessageStore } from "../../store/message-store";
import { userAuth } from "../../api/login";
import { messageNumberGet } from "../../api/message";

// 生命周期
// setup生命周期
const $router = useRouter();
const $storeUserInfo = useUserInfoStore();
const $storeMessage = useMessageStore();
const ID = $router.currentRoute.value.query["user-id"];
const token = localStorage.getItem("token" + ID);
if (token === null) {
  // 未登录
  const text = "您尚未登录，请前往登录或者注册账号。";
  ElMessageBox.alert(text, "账号未登录", {
    confirmButtonText: "前往登录",
    callback: function () {
      // $router.push({
      //   path: "/login",
      // });
    },
    "show-close": false,
  });
} else {
  userAuth(ID).then((res) => {
    if (res.data.status === 401) {
      const text = "登陆过期，请重新登录。";
      ElMessageBox.alert(text, "登录过期", {
        confirmButtonText: "重新登陆",
        // callback: function () {
        //   $router.push({
        //     path: "/login",
        //   });
        // },
        "show-close": false,
      });
    } else {
      $storeUserInfo.userID = res.data.userID;
      $storeUserInfo.userName = res.data.userName;
      $storeUserInfo.userEmail = res.data.userEmail;
      // 更新token以延长有效期
      localStorage.setItem("token" + ID, res.data.newToken);
    }
  });
}
messageNumberGet(ID).then((res) => {
  $storeMessage.messageNumber = res.data.data;
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let timer = setInterval(() => {
  messageNumberGet(ID).then((res) => {
    $storeMessage.messageNumber = res.data.data;
  });
}, 12 * 1000);

// 销毁前
onBeforeUnmount(() => {
  timer = null;
});

// 自定义接口
// 路由链接
interface linkItem {
  index: string;
  title: string;
  to: string;
  icon: string;
}

// 自定义数据
// 路由链接
const linkArr: Array<linkItem> = [
  {
    index: "1",
    title: "主页",
    to: "/index/home?user-id=" + ID,
    icon: "Grid",
  },
  {
    index: "2",
    title: "我的项目",
    to: "/index/project?user-id=" + ID,
    icon: "ChromeFilled",
  },
  {
    index: "3",
    title: "我的团队",
    to: "/index/team?user-id=" + ID,
    icon: "User",
  },
  {
    index: "4",
    title: "我的消息",
    to: "/index/message?user-id=" + ID,
    icon: "Bell",
  },
  {
    index: "5",
    title: "个人信息",
    to: "/index/user?user-id=" + ID,
    icon: "List",
  },
];

// 响应式数据
const input1 = ref("");
const linkActive = ref("1");
const linkArrActive = reactive(linkArr);

// 方法
// routeLink的动态样式切换
// 参数： routeLink的唯一标识index
// 返回： 无
function changeLink(newValue) {
  linkActive.value = newValue;
}
// 跳转到个人信息页面
function toUserPage() {
  $router.push({
    path: "/index/user",
  });
}
// 注销
function logout() {
  $router.push({
    path: "/login",
  });
  localStorage.removeItem("token" + $storeUserInfo.userID);
}
</script>


<template>
  <el-container class="main">
    <!-- 头部 -->
    <el-header class="main__header">
      <el-row>
        <el-col
          :xs="8"
          :sm="6"
          :md="8"
          :lg="8"
          :xl="8"
          class="main__header__item"
        >
          <el-icon color="#409EFF" :size="30"><HomeFilled /></el-icon>
          <span class="main__header__item__title">接口管理平台</span>
        </el-col>
        <el-col
          :xs="8"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
          class="main__header__item"
        >
          <el-input
            placeholder="请输入项目id或团队id进行查找"
            :prefix-icon="Search"
            clearable
            v-model="input1"
          />
        </el-col>
        <el-col
          :xs="4"
          :sm="3"
          :md="2"
          :lg="2"
          :xl="2"
          class="main__header__item user-name"
        >
          <div class="user-name" @click="toUserPage">
            {{ $storeUserInfo.userName }}
          </div>
        </el-col>
        <el-col
          :xs="4"
          :sm="3"
          :md="1"
          :lg="1"
          :xl="1"
          class="main__header__item"
        >
          <router-link to="/login" replace @click="logout"> 注销 </router-link>
        </el-col>
      </el-row>
    </el-header>
    <!-- 主体内容 -->
    <el-container class="main__content">
      <!-- 侧边栏 -->
      <el-aside class="main__content__aside">
        <el-menu class="main__content__aside__menu" default-active="1">
          <el-menu-item
            v-for="item in linkArrActive"
            :key="item.index"
            :index="item.index"
          >
            <router-link
              :to="item.to"
              :class="
                linkActive == item.index ? 'link__active' : 'link__noactive'
              "
              @click="changeLink(item.index)"
            >
              <component :is="item.icon" class="icon"></component>
              <span>
                {{ item.title }}
                <span v-if="item.index === '4'">
                  ({{ $storeMessage.messageNumber }})</span
                >
              </span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主视图 -->
      <el-container>
        <router-view class="main__content__routerview"></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>




<style scoped lang='scss'>
.main {
  min-height: 100vh;
  &__header {
    height: 60px;
    border-bottom: 1px solid rgb(217, 217, 217);
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      font-size: 15px;
      .user-name {
        padding: 0 10px 0 10px;
        color: #409eff;
        &:hover {
          cursor: pointer;
        }
      }
      &__title {
        margin-left: 5px;
        font-size: 25px;
        font-weight: 500;
        color: #409eff;
      }
    }
  }

  @media screen and (max-width: 800px) {
    &__header {
      display: none;
    }
  }

  &__content {
    &__aside {
      width: 250px;
      &__menu {
        height: 100%;

        .link__active,
        .link__noactive {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #409eff;
        }
        .link__active {
          color: #409eff;
        }
        .link__noactive {
          color: gray;
        }
        .icon {
          height: 20px;
          width: 20px;
          margin-right: 10px;
        }
      }
    }
    @media screen and (max-width: 800px) {
      &__aside {
        display: none;
      }
    }

    &__routerview {
      width: 100%;
    }
  }
}
</style>

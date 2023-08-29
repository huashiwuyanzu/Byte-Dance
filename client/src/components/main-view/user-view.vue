<script lang='ts' setup>
import { ref, reactive } from "vue";
import { Male, Female } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { userInfoGet, userInfoUpdate, userPicUpdate } from "../../api/userinfo";
import { useUserInfoStore } from "../../store/user-store";

// setup生命周期
const $router = useRouter();
const $store = useUserInfoStore();
const ID = $router.currentRoute.value.query["user-id"];
// 获取个人信息
userInfoGet(ID).then((res) => {
  // 独立修改
  userInfo.userImg = res.data.picture;
  // 不可修改
  userInfo.userID = res.data.userid;
  // 可修改
  userInfo.userName = res.data.name;
  userInfo.userGender = res.data.gender;
  userInfo.userIntroduction = res.data["introduction-self"];
  userInfo.userTechnologyStack = res.data.technology;
  userInfo.userBlogIntroduction = res.data["introduction-blog"];
  userInfo.userCodeAge = parseInt(res.data.codeage);
  userInfo.userEmail = res.data.email;
  // 数据备份
  userInfoBackup = { ...userInfo };
});

// 自定义数据
// 数据备份
let userInfoBackup = {
  userImg: "/src/assets/images/test.jpg",
  userName: "啵咿嗷",
  userEmail: "200000000@qq.com",
  userGender: "male",
  userIntroduction:
    "雄酿教伍该 甲熟醉 年路居星臣 翅仗几兄莲 食猜里末监 纽亭盟龟敞需欣笨欧诗 水粪罪企箩 翻剃承商座 蜓升置奏予 蛮史猪悉示 栽红巡婚井病卵待姿玩 主捡娇救邪 析它绒铁缓 灵矩宵构捉 放一燃京晚 圣杨假趋动块锦道倘 界腰步遭任 宜进咬字扮 摘筐稼腐崭 律苍惧祸炊 区醋惩吗质绘匀铲知坝 呼匹产搅果",
  userTechnologyStack: "JS、CSS、HTML",
  userBlogIntroduction: "啵咿嗷的博客",
  userCodeAge: 2,
  userSex: "男",
};

// 响应式数据
const mySwitch = ref(false);
const userInfo = reactive(userInfoBackup);

// 方法
// 修改个人信息
function openSwitch() {
  mySwitch.value = true;
}
// 取消修改
function cancelClick() {
  userInfo.userName = userInfoBackup.userName;
  userInfo.userIntroduction = userInfoBackup.userIntroduction;
  userInfo.userTechnologyStack = userInfoBackup.userTechnologyStack;
  userInfo.userBlogIntroduction = userInfoBackup.userBlogIntroduction;
  userInfo.userCodeAge = userInfoBackup.userCodeAge;
  mySwitch.value = false;
}
// 提交修改
function confirmClick() {
  const newInfo = { ...userInfo };
  userInfoBackup = { ...userInfo };
  userInfoUpdate(newInfo, $store.userID).then((res) => {
    ElMessage({
      showClose: true,
      message: res.data.msg,
      type: res.data.status === 200 ? "success" : "error",
    });
    mySwitch.value = false;
  });
}
// 修改头像
function changePic() {
  const fileInput = document.getElementById("file-input");
  fileInput.click();
}
function submitPic(e) {
  if (e.target.files.length === 0) {
    return;
  }
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  userPicUpdate(formData, $store.userID).then(() => {
    const userImg = document.getElementById("user-img");
    const reader = new FileReader();
    reader.onload = function () {
      userImg.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    ElMessage({
      showClose: true,
      message: "头像更新成功。",
      type: "success",
    });
    mySwitch.value = false;
  });
}
</script>

<template>
  <div class="user">
    <!-- 用户信息 -->
    <div class="user__info">
      <div class="user__info__img">
        <img id="user-img" :src="userInfo.userImg" alt="用户头像" />
      </div>
      <input
        id="file-input"
        type="file"
        @change="submitPic"
        accept=".jpg"
        name="image"
        style="display: none"
      />
      <div class="user__info__detail">
        <div class="name">
          {{ userInfo.userName }}
          <el-icon v-if="userInfo.userGender === 'male'"><Male /></el-icon>
          <el-icon v-else><Female /></el-icon>
        </div>
        <div class="id"><span>用户id: </span>{{ userInfo.userID }}</div>
        <div class="email"><span>用户邮箱: </span>{{ userInfo.userEmail }}</div>
        <div class="introduction">
          <span>个人简介：</span>{{ userInfo.userIntroduction }}
        </div>
        <div><span>技术栈：</span>{{ userInfo.userTechnologyStack }}</div>
        <div><span>博客简介：</span>{{ userInfo.userBlogIntroduction }}</div>
        <div><span>码龄：</span>{{ userInfo.userCodeAge }}年</div>
      </div>
      <el-button class="edit" type="warning" @click="openSwitch">
        信息编辑</el-button
      >
    </div>
    <!-- 用户队伍,项目和收藏的接口 -->
    <div class="user__relate">
      <div class="user__relate__infobox">
        <!-- 项目 -->
        <h3 class="title">我参与的项目</h3>
        <div class="infobox">
          <span class="label">名称: </span>
          <h4 class="name">华南师范大学接口项目</h4>
          <div class="leader"><span class="label">队长</span>：啵咿嗷</div>
          <div class="mates">
            <span class="label">队员</span
            >：阿松大，请问，两岸，啊是的请问，阿松大三地，阿松大……
          </div>
          <div class="tomore">点击查看详情</div>
        </div>
        <div class="infobox">
          <span class="label">名称: </span>
          <h4 class="name">华南师范大学接口项目</h4>
          <div class="leader"><span class="label">队长</span>：啵咿嗷</div>
          <div class="mates">
            <span class="label">队员</span
            >：阿松大，请问，两岸，啊是的请问，阿松大三地，阿松大……
          </div>
          <div class="tomore">查看详情</div>
        </div>
        <div class="infobox">
          <span class="label">名称: </span>
          <h4 class="name">华南师范大学接口项目</h4>
          <div class="leader"><span class="label">队长</span>：啵咿嗷</div>
          <div class="mates">
            <span class="label">队员</span
            >：阿松大，请问，两岸，啊是的请问，阿松大三地，阿松大……
          </div>
          <div class="tomore">查看详情</div>
        </div>
      </div>

      <!-- 团队 -->
      <div class="user__relate__infobox">
        <h3 class="title">我加入的团队</h3>
        <div class="infobox">
          <span class="label">名称: </span>
          <h4 class="name">华南师范大学接口项目</h4>
          <div class="leader"><span class="label">队长: </span>啵咿嗷</div>
          <div class="mates">
            <span class="label">队员: </span
            >：阿松大，请问，两岸，啊是的请问，阿松大三地，阿松大……
          </div>
          <div class="tomore">点击查看详情</div>
        </div>
      </div>

      <!-- 收藏的接口 -->
      <div class="user__relate__infobox">
        <h3 class="title">收藏的接口</h3>
        <div class="infobox">
          <span class="label">名称: </span>
          <h4 class="name">接口a</h4>
          <div class="master">
            <span class="label">所属项目: </span>华南师范大学接口项目
          </div>
          <div class="changetime">
            <span class="label">上次修改: </span>：2022-02-02
          </div>
          <div class="tomore">点击查看详情</div>
        </div>
      </div>
    </div>
    <!-- 信息修改表单 -->
    <el-drawer
      v-model="mySwitch"
      direction="rtl"
      :show-close="false"
      :before-close="cancelClick"
    >
      <template #header>
        <h4>修改你的个人信息</h4>
      </template>
      <template #default>
        <div>
          <el-button type="primary" @click="changePic">更换头像</el-button>
          <div class="change--box">
            <span class="change--span">码龄：</span
            ><el-input-number
              v-model="userInfo.userCodeAge"
              :min="1"
              :max="99"
            />
          </div>
          <div class="change--box">
            <span class="change--span">性别：</span>
            <el-radio-group v-model="userInfo.userGender">
              <el-radio :label="'male'" size="large">♂</el-radio>
              <el-radio :label="'female'" size="large">♀</el-radio>
            </el-radio-group>
          </div>
          <el-input
            class="change--input"
            v-model="userInfo.userName"
            placeholder="更新用户名："
            clearable
            maxlength="7"
            show-word-limit
          />
          <el-input
            class="change--input"
            v-model="userInfo.userEmail"
            placeholder="更新用户邮箱："
            clearable
            maxlength="20"
            show-word-limit
          />
          <el-input
            class="change--input"
            v-model="userInfo.userTechnologyStack"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="更新技术栈"
            maxlength="80"
            show-word-limit
          />
          <el-input
            class="change--input"
            v-model="userInfo.userIntroduction"
            :autosize="{ minRows: 2, maxRows: 6 }"
            type="textarea"
            placeholder="更新个人简介"
            maxlength="150"
            show-word-limit
          />
          <el-input
            class="change--input"
            v-model="userInfo.userBlogIntroduction"
            :autosize="{ minRows: 2, maxRows: 6 }"
            type="textarea"
            placeholder="更新博客简介"
            maxlength="150"
            show-word-limit
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="cancelClick">取消</el-button>
          <el-button type="success" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>


<style scoped lang='scss'>
.user {
  min-height: 70vh;
  &__info {
    display: flex;
    position: relative;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: rgb(247, 249, 249);
    transition: background-color 1s;

    &:hover {
      background-color: #409eff;
      .user__info__detail {
        span {
          color: white;
        }
        color: white;
      }
    }

    &__img {
      height: 120px;
      width: 120px;
      border-radius: 60px;
    }

    &__detail {
      transition: color 1.2s;
      margin-left: 50px;
      div {
        margin-top: 10px;
        font-size: 16px;
        span {
          color: gray;
          font-weight: bold;
          transition: color 1s;
        }
      }
      .name {
        font-size: 30px;
        font-weight: bold;
      }
    }
    .edit {
      position: absolute;
      right: 100px;
    }
    @media screen and (max-width: 900px) {
      .edit {
        display: none;
      }
    }
  }
  &__relate {
    display: flex;
    justify-content: space-around;
    min-height: 65vh;
    margin-top: 20px;
    background-color: rgb(247, 249, 249);
    &__infobox {
      width: 30%;
      .title {
        padding: 10px 0 0 5px;
        font-size: 15px;
        color: black;
      }
      .infobox {
        position: relative;
        height: 130px;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        background-color: #ebf2f8;
        border-radius: 20px;
        transition: background-color 1.3s;
        &:hover {
          background-color: #409eff;
          color: white;
          cursor: pointer;
          span {
            color: white;
          }
          .tomore {
            color: white;
            display: block;
          }
        }
        .label {
          font-weight: bold;
          color: rgb(246, 173, 39);
        }
        .name {
          display: inline-block;
        }
        .leader,
        .mates,
        .master,
        .changetime {
          margin-top: 5px;
        }
        .tomore {
          position: absolute;
          bottom: 5px;
          right: 15px;
          display: none;
        }
      }
    }
  }
  @media screen and (min-width: 1400px) {
    &__info,
    &__relate {
      padding-left: 140px;
      padding-right: 140px;
    }
  }
  @media screen and (max-width: 1399px) {
    &__info,
    &__relate {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    &__info {
      min-height: 100vh;
    }
    &__relate {
      display: none;
    }
  }
  .change--input {
    margin-top: 20px;
  }
  .change--span {
    font-size: 15px;
    color: rgb(149, 149, 149);
  }
  .change--box {
    padding-left: 6px;
    margin-top: 20px;
  }
}
</style>

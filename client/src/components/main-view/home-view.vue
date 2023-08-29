<script lang='ts' setup>
import { ref, reactive } from "vue";
import validator from "validator";
import { ElMessage } from "element-plus";
import { teamCreate } from "../../api/team";
import { useUserInfoStore } from "../../store/user-store";
import { isRepeat } from "../../utils/arr";

// 自定义接口
// 功能数组
interface item {
  index: string;
  icon: string;
  title: string;
  introduction: string;
  to?: string;
}
// 待邀请的成员
interface newMmate {
  index: string;
  userID: string;
  teamRole: string;
  isLast: boolean;
}

// 自定义数据
const $store = useUserInfoStore();
// 功能数组
const itemArr: Array<item> = [
  {
    index: "1",
    icon: "Avatar",
    title: "创建您的团队",
    introduction: "创建您的团队，并邀请团队成员进行共同开发",
  },
  {
    index: "2",
    icon: "DocumentAdd",
    title: "创建您的项目",
    introduction: "创建您的项目，作为管理员进行操做",
  },
  {
    index: "3",
    icon: "Headset",
    title: "联系客服",
    introduction: "遇到困难欢迎联系客服，我们将尽快答复",
  },
];
const teamRoleArr = [
  {
    index: "1",
    name: "开发人员",
  },
  {
    index: "2",
    name: "测试人员",
  },
  {
    index: "3",
    name: "运维人员",
  },
];
// 待邀请的成员
const newMateArr: Array<newMmate> = [
  {
    index: "1",
    teamRole: "",
    userID: "",
    isLast: true,
  },
];

//  响应式数据
// 控制新建队伍和新建项目的变量
const dialogForNewTeam = ref(false);
const dialogForNewProject = ref(false);
// 新建队伍信息
const newTeamID = ref("");
const newTeamName = ref("");
// 新建项目信息
const newProjectID = ref("");
const newProjectName = ref("");
const newProjectIntroduction = ref("");
// 待邀请的成员
let newMateArrActive = reactive(newMateArr);
// 功能数组
const itemArrActive = reactive(itemArr);

// 自定义方法
// 创建团队或项目
function createNewItem(value) {
  if (value === "3") {
    ElMessage("此功能正在开发中，敬请期待");
  } else if (value === "1") {
    dialogForNewTeam.value = true;
  } else {
    dialogForNewProject.value = true;
  }
}
// 取消
function handleClose() {
  dialogForNewTeam.value = false;
  dialogForNewProject.value = false;
  newTeamID.value = "";
  newTeamName.value = "";
  newProjectID.value = "";
  newProjectName.value = "";
  newProjectIntroduction.value = "";
  removeMate();
}
function closeForm() {
  handleClose();
}
// 新增队友
function addNewMate() {
  let newMate = {
    index: (newMateArrActive.length + 1).toString(),
    teamRole: "",
    userID: "",
    isLast: true,
  };
  newMateArrActive[newMateArrActive.length - 1].isLast = false;
  newMateArrActive.push(newMate);
}
// 移除队友
function removeNewMate(index) {
  let target = 0;
  for (let i = 0; i < newMateArrActive.length; ++i) {
    if (newMateArrActive[i].index === index) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      target = i;
    }
  }
  newMateArrActive.splice(target, 1);
  for (let i = 0; i < newMateArrActive.length; ++i) {
    newMateArrActive[i].index = (i + 1).toString();
  }
  newMateArrActive[newMateArrActive.length - 1].isLast = true;
}
// 重置队伍
function removeMate() {
  newMateArrActive.splice(0, newMateArrActive.length);
  let firstMate: newMmate = {
    index: "1",
    teamRole: "",
    userID: "",
    isLast: true,
  };
  newMateArrActive.push(firstMate);
}
// 创建新队伍
function createNewTeam() {
  // 队伍id或者队伍名字不符合规范的情况
  if (newTeamID.value === "" || newTeamName.value === "") {
    ElMessage({
      showClose: true,
      message: "关键信息不能为空",
      type: "warning",
    });
    return;
  }
  if (
    !validator.isAlphanumeric(newTeamID.value) ||
    !validator.isLength(newTeamID.value, {
      min: 6,
      max: 12,
    })
  ) {
    ElMessage({
      showClose: true,
      message: "队伍ID应为6至12位非特殊字符组成。",
      type: "warning",
    });
    return;
  }
  // 用户id和职位不能留白,不能邀请自己，用户id不能重复
  let noEmptyID = true;
  let noSelfID = true;
  let noRepeat = true;
  newMateArrActive.forEach((item) => {
    if (item.userID === "" || item.teamRole === "") {
      noEmptyID = false;
    }
    if (item.userID === $store.userID) {
      noSelfID = false;
    }
    if (isRepeat("userID", newMateArrActive)) {
      noRepeat = false;
    }
  });
  if (!noEmptyID) {
    ElMessage({
      showClose: true,
      message: "请完整填写队员信息",
      type: "warning",
    });
    return;
  }
  if (!noSelfID) {
    ElMessage({
      showClose: true,
      message: "无法邀请自己加入团队",
      type: "warning",
    });
    return;
  }
  if (!noRepeat) {
    ElMessage({
      showClose: true,
      message: "用户id重复，请检查",
      type: "warning",
    });
    return;
  }
  // 注册新队伍
  const newTeam = {
    teamID: newTeamID.value,
    teamName: newTeamName.value,
    mateArr: newMateArrActive,
  };
  teamCreate(newTeam, $store.userID).then((res) => {
    // 注册失败
    if (res.data.status === 201) {
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: "error",
      });
      return;
    }
    // 注册成功
    newTeamID.value = "";
    newTeamName.value = "";
    dialogForNewTeam.value = false;
    console.log(res.data);
    removeMate();
    ElMessage({
      showClose: true,
      message: "团队新建成功",
      type: "success",
    });
  });
}
// 新建项目
function createNewProject() {
  if (newProjectID.value === "" || newProjectName.value === "") {
    ElMessage({
      showClose: true,
      message: "关键信息不能为空",
      type: "error",
    });
    return;
  }
  ElMessage({
    showClose: true,
    message: "项目新建成功",
    type: "success",
  });
  removeMate();
  dialogForNewProject.value = false;
}
</script>

<template>
  <div class="home">
    <el-row class="home__header" justify="space-around">
      <el-col
        class="item"
        v-for="item in itemArrActive"
        :key="item.index"
        :xs="22"
        :sm="11"
        :md="7"
        :lg="7"
        :xl="7"
        @click="createNewItem(item.index)"
      >
        <component :is="item.icon" class="item__icon"></component>
        <div class="item__title">{{ item.title }}</div>
        <div class="item__introduction">{{ item.introduction }}</div>
      </el-col>
      <el-col :xs="22" :sm="11" :md="7" :lg="7" :xl="7"></el-col>
    </el-row>
    <!-- 创建团队的表单 -->
    <el-dialog
      v-model="dialogForNewTeam"
      title="创建您的团队"
      :show-close="false"
      width="50%"
      :before-close="closeForm"
    >
      <form class="newteam-form">
        <el-input
          class="newteam-form__team-info"
          v-model="newTeamID"
          placeholder="请为队伍创建ID："
          clearable
        />
        <el-input
          class="newteam-form__team-info"
          v-model="newTeamName"
          placeholder="请为队伍创建名称："
          clearable
        />
        <div
          v-for="item in newMateArrActive"
          :key="item.index"
          class="newteam-form__newteammate-info"
        >
          <el-input
            class="newprojectmate-id"
            v-model="item.userID"
            placeholder="请输入要邀请的用户id："
            clearable
          />
          <el-select
            class="newprojectmate-role"
            v-model="item.teamRole"
            placeholder="团队角色"
          >
            <el-option
              v-for="i in teamRoleArr"
              :key="i.index"
              :label="i.name"
              :value="i.name"
            />
          </el-select>
          <el-button
            v-if="item.isLast"
            class="add-mate"
            type="primary"
            @click="addNewMate"
          >
            新增
          </el-button>
          <el-button v-else class="add-mate" @click="removeNewMate(item.index)">
            移除</el-button
          >
        </div>
        <div class="newteam-form__btn-box">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="createNewTeam" class="last-button" type="primary">
            创建
          </el-button>
        </div>
      </form>
    </el-dialog>

    <!-- 创建新项目的表单 -->
    <el-dialog
      v-model="dialogForNewProject"
      title="创建您的项目"
      :show-close="false"
      width="50%"
      :before-close="closeForm"
    >
      <form class="newproject-form">
        <el-input
          class="newproject-form__project-info"
          v-model="newProjectID"
          placeholder="请为项目创建ID："
          clearable
        />
        <el-input
          class="newproject-form__project-info"
          v-model="newProjectName"
          placeholder="请为项目创建名称："
          clearable
        />
        <el-input
          class="newproject-form__project-info"
          v-model="newProjectIntroduction"
          :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea"
          placeholder="编写项目简介："
          maxlength="150"
          show-word-limit
        />
        <div
          v-for="item in newMateArrActive"
          :key="item.index"
          class="newproject-form__newprojectmate-info"
        >
          <el-input
            class="newprojectmate-id"
            v-model="item.userID"
            placeholder="请输入要邀请的用户id："
            clearable
          />
          <el-select
            class="newprojectmate-role"
            v-model="item.teamRole"
            placeholder="团队角色"
          >
            <el-option
              v-for="i in teamRoleArr"
              :key="i.index"
              :label="i.name"
              :value="i.name"
            />
          </el-select>
          <el-button
            v-if="item.isLast"
            class="add-mate"
            type="primary"
            @click="addNewMate"
          >
            +
          </el-button>
          <div v-else class="add-mate"></div>
        </div>
        <div class="newproject-form__btn-box">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            @click="createNewProject"
            class="last-button"
            type="primary"
          >
            创建
          </el-button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>


<style scoped lang='scss'>
.home {
  &__header {
    padding: 30px;
    .item {
      height: 300px;
      margin-top: 20px;
      border-radius: 20px;
      background-color: #d6edff;
      transition: background-color 1s;

      &__icon {
        height: 40px;
        width: 40px;
        margin: 70px 0 0 40px;
        color: #409eff;
        transition: color 0.7s;
      }
      &__title {
        margin: 20px 0 0 40px;
        font-size: 18px;
        font-weight: bold;
        color: #1c8eff;
        transition: color 0.7s;
      }
      &__introduction {
        margin: 20px 40px 0 40px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(17, 17, 17);
        transition: color 0.7s;
      }

      &:hover {
        background-color: #409eff;
        cursor: pointer;
        .item__icon,
        .item__title,
        .item__introduction {
          color: white;
        }
      }
    }
  }
  .newteam-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__team-info {
      margin-top: 10px;
      width: 80%;
    }
    &__newteammate-info {
      display: flex;
      // border: 1px solid red;
      // justify-content: space-between;
      margin-top: 10px;
      width: 80%;
      .newteammate-id {
        width: 55%;
      }
      .newteammate-role {
        width: 25%;
      }
      .add-mate {
        width: 10%;
      }
    }
    &__btn-box {
      display: flex;
      justify-content: flex-end;
      width: 70%;
      margin-top: 30px;
      .last-button {
        margin-left: 10px;
      }
    }
  }
  .newproject-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__project-info {
      margin-top: 10px;
      width: 70%;
    }
    &__newprojectmate-info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      width: 70%;
      .newprojectmate-id {
        width: 55%;
      }
      .newprojectmate-role {
        width: 25%;
      }
      .add-mate {
        width: 10%;
      }
    }
    &__btn-box {
      display: flex;
      justify-content: flex-end;
      width: 70%;
      margin-top: 30px;
      .last-button {
        margin-left: 10px;
      }
    }
  }
}
</style>

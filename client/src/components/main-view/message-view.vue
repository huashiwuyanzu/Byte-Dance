<script lang='ts' setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  messageGet,
  messageDelete,
  messageAgree,
  messageRefuse,
} from "../../api/message";
import { getText, isNeeded, translate } from "../../utils/message";
import { ElMessage } from "element-plus";
import { deleteByOneKey } from "../../utils/arr";
import { useMessageStore } from "../../store/message-store";

// 自定义数据
const ID = useRouter().currentRoute.value.query["user-id"];
const $storeMessage = useMessageStore();
// 节流阀，防止重复刷新。
let flag = false;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const messageBox = reactive([]);

// 自定义方法
// 获取所有信息
function getMessage(ID) {
  messageGet(ID).then((res) => {
    for (let i = 0; i < res.data.data.length; ++i) {
      messageBox.push(res.data.data[i]);
    }
  });
}
// 刷新
function flesh(ID) {
  if (!flag) {
    messageBox.splice(0, messageBox.length);
    getMessage(ID);
    flag = true;
    ElMessage({
      showClose: true,
      message: "数据已更新。",
      type: "success",
    });
    setTimeout(() => {
      flag = false;
    }, 3000);
  } else {
    ElMessage({
      showClose: true,
      message: "请勿频繁操作。",
      type: "warning",
    });
  }
}
// 忽略信息
function ignore(messageID) {
  deleteByOneKey("index", messageID, messageBox);
  const param = {
    messageID,
  };
  messageDelete(ID, param);
  $storeMessage.messageNumber -= 1;
}
// 同意进入队伍邀请
function agree(item) {
  const param = {
    messageID: item.index,
    companyID: item.companyID,
    teamRole: translate(item.teamRole),
  };
  messageAgree(ID, param).then(() => {
    deleteByOneKey("index", item.index, messageBox);
    ElMessage({
      showClose: true,
      message: "成功加入此团队。",
      type: "success",
    });
  });
}

function refuse(item) {
  const param = {
    messageID: item.index,
    companyID: item.companyID,
  };
  messageRefuse(ID, param).then(()=>{
    deleteByOneKey("index", item.index, messageBox);
    ElMessage({
      showClose: true,
      message: "拒绝加入此团队。",
      type: "warning",
    });
  });
  console.log(param);
}

// 生命周期
// setup
getMessage(ID);

// function
</script>

<template>
  <div class="message">
    <div class="message-box" v-for="item in messageBox" :key="item.index">
      <div class="message-box__img">
        <img :src="item.senderPicture" alt="用户头像" />
      </div>
      <div class="message-box__detail">
        <div class="user-name">{{ item.senderName }}</div>
        <div class="content">
          {{ getText(item.category, item.company, item.teamRole) }}
        </div>
        <div class="date">
          {{ item.time }}
        </div>
        <div class="btn-box">
          <el-button
            v-if="isNeeded(item.category)"
            size="small"
            type="success"
            @click="agree(item)"
          >
            同意</el-button
          >
          <el-button
            v-if="isNeeded(item.category)"
            size="small"
            type="warning"
            @click="refuse(item)"
          >
            拒绝</el-button
          >
          <el-button size="small" type="primary" @click="ignore(item.index)">
            忽略</el-button
          >
        </div>
      </div>
    </div>
    <div class="flesh">
      <el-button @click="flesh(ID)">刷新</el-button>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.message {
  position: relative;
  min-height: 70vh;

  &-box {
    display: flex;
    margin-top: 10px;
    padding: 0 50px 0 50px;
    border-bottom: 1px solid rgb(208, 208, 208);
    &__img {
      height: 70px;
      width: 70px;
      margin-top: 10px;
      border-radius: 35px;
    }
    @media screen and (max-width: 1100px) {
      &__img {
        display: none;
      }
    }
    &__detail {
      position: relative;
      width: 800px;
      margin: 10px 0 10px 10px;
      .user-name {
        font-weight: bold;
      }
      .content {
        margin-top: 5px;
        font-size: 14px;
      }
      .date {
        margin-top: 5px;
        font-size: 14px;
        color: gray;
        .ignore {
          margin-left: 10px;
          font-size: 12px;
          &:hover {
            color: #409eff;
            border-bottom: 1px solid #409eff;
            cursor: pointer;
          }
        }
      }
      .btn-box {
        position: absolute;
        bottom: 0;
        right: 0;
      }
      @media screen and (max-width: 500px) {
        .btn-box {
          display: none;
        }
      }
    }
  }
  .flesh {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }
}
@media screen and (min-width: 1300px) {
  .message {
    padding: 0 200px 0 200px;
  }
}
</style>

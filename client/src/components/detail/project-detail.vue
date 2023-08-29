<script lang='ts' setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

// 自定义接口
interface Mate {
  name: string;
  email: string;
  jobL: string;
}

// 自定义数据
const $router = useRouter();
// 项目成员
const mateArr: Array<Mate> = [
  {
    name: "小明",
    email: "1231244!@qq.com",
    job: "队长",
  },
  {
    name: "小明",
    email: "1231244!@qq.com",
    job: "队长",
  },
  {
    name: "小明",
    email: "1231244!@qq.com",
    job: "队长",
  },
  {
    name: "小明",
    email: "1231244!@qq.com",
    job: "队长",
  },
];
const interfaceArr = [
  {
    name: "用户登录",
    category: "GET",
    creater: "王小明",
    createTime: "2022-02-02",
    percentage: 100,
    pro_status: "success",
    text_status: "success",
    text: "开发完成",
  },
  {
    name: "用户注销",
    category: "DELETE",
    creater: "李华",
    createTime: "2022-04-02",
    percentage: 50,
    pro_status: "",
    text_status: "primary",
    text: "开发中",
  },
  {
    name: "用户注册",
    category: "PUT",
    creater: "王小明",
    createTime: "2021-02-02",
    percentage: 75,
    pro_status: "warning",
    text_status: "warning",
    text: "成员报错",
  },
  {
    name: "用户权鉴",
    category: "POST",
    creater: "诸葛亮",
    createTime: "2012-02-02",
    percentage: 70,
    pro_status: "exception",
    text_status: "danger",
    text: "已废弃",
  },
];

// 接口类型对应的颜色
const interfaceTable = {
  GET: "success",
  PUT: "primary",
  POST: "warning",
  DELETE: "danger",
};

// 职位
const jobs = ["开发人员", "测试人员", "运维人员"];
// 响应式数据
const mateArrReactive = reactive(mateArr);
const interfaceArrReactive = reactive(interfaceArr);
console.log(interfaceArrReactive);

// 自定义方法
function toInterfaceDetail() {
  $router.puth({
    path: "/index/interface-detail",
  });
}
</script>

<template>
  <div>
    <div class="name">
      <span class="label">项目名称： </span>
      <h3>华南释放大小阿斯顿尽量快点</h3>
    </div>
    <div class="time">
      <span class="label">创建日期： </span>
      <h3>2022-02-12</h3>
    </div>
    <div class="introduction">
      <span class="label">项目介绍： </span>
      <div class="text">
        细怯嘿殖唁 疲派缝友聘 紊客壤他倡 受贞苫惜岩 挤卢详手怪 悟刨啦介沃
        腥鹰连房葵 杈绰量妓侨 嚣鲤守静化 御系暂费盼 狞瞪租争灯 铭超沟极鲸
        置斜掺栗樟 条巴翰罚烁 凫虽薛践仙 肯拄呜乃磷 精哩商锈沙 璃逛般维融
        刚闷伦欲合 笨姚废谁暑 毁辉坞鞍签 民中斋符福 棵炕结健萄 办头态漏遇
        力畜盖正笙 坎械柱纯滚 诞入吱磨网 隘无阻讥鸭 尿拦瞧崎凝 恬蛙孵煌蹄
      </div>
    </div>
    <div class="mates">
      <span class="label">项目成员：</span>
      <el-table class="mates__form" :data="mateArrReactive">
        <el-table-column fixed prop="name" label="名称" width="150" />
        <el-table-column prop="job" label="职位" width="150" />
        <el-table-column prop="email" label="邮箱" width="300" />
        <el-table-column label="编辑" width="400">
          <!-- <el-button class="btn" type="warning" size="small">更改职位</el-button> -->
          <el-select
            v-model="value"
            placeholder="更改职位"
            size="small"
            style="width: 90px; margin-right: 10px"
          >
            <el-option
              v-for="item in jobs"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-button class="btn" type="danger" size="small">移出队伍</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="interfaces">
      <span class="label">项目接口： </span>
      <div class="interfaces__box" @click="toInterfaceDetail">
        <div
          class="interfaces__box__item"
          v-for="item in interfaceArrReactive"
          :key="item.name"
        >
          <div>
            <div class="interface-name">
              <span class="label">名称： </span>{{ item.name }}
              <el-text
                :type="interfaceTable[item.category]"
                style="font-weight: bold; margin-left: 3px"
              >
                {{ item.category }}</el-text
              >
            </div>
            <div class="creater">
              <span class="label">创建者： </span>{{ item.creater }}
            </div>
            <div class="createTime">
              <span class="label">创建日期： </span>{{ item.createTime }}
            </div>
            <div class="status">
              <span class="label">状态： </span>
              <el-text
                :type="item.text_status"
                style="font-weight: bold; margin-left: 3px"
              >
                {{ item.text }}</el-text
              >
            </div>
          </div>
          <el-progress
            type="circle"
            :percentage="item.percentage"
            width="80"
            :status="item.pro_status"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.name,
.time,
.introduction,
.mates,
.interfaces {
  margin: 10px 30px 0 30px;
  font-size: 16px;
  .label {
    color: #409eff;
  }
  h3 {
    display: inline-block;
    font-size: 16px;
  }
  .text {
    margin: 10px 30px 0 30px;
    font-size: 15px;
  }
  &__form {
    width: 1000px;
    margin-top: 10px;
  }
}

.interfaces {
  &__box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 10px 50px 10px;
    &__item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-height: 100px;
      width: 45%;
      margin-top: 10px;
      padding-bottom: 5px;
      background-color: rgb(247, 247, 247);
      border-radius: 10px;
      .interface-name,
      .creater,
      .createTime,
      .status {
        margin-top: 5px;
        color: gray;
        font-weight: 500;
        .label {
          color: gray;
        }
      }
      &:hover {
        cursor: pointer;
        background-color: rgb(240, 240, 240);
      }
    }
  }
}
.mates,
.interfaces {
  margin-top: 35px;
}
</style>
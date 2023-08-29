<script lang='ts' setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 自定义数据
const $router = useRouter();
const ID = $router.currentRoute.value.query["user-id"];

// 响应式数据
// 头部的选择器
const selection = ref("0");
// 项目简介和接口数量的详情介绍
const introductionActive = ref(false);
const numberActive = ref(false);

// 方法
// 打开项目简介
function openIntroduction() {
  introductionActive.value = !introductionActive.value;
}
// 查看接口数量
function openNumber() {
  numberActive.value = !numberActive.value;
}
// 跳转到项目详情页面
function toProjectDetailPage() {
  $router.push({
    path: "/index/project-detail",
    query: { "user-id": ID },
  });
}
</script>
<template>
  <div class="interface">
    <!-- 头部的选择器 -->
    <div class="interface__header">
      <el-radio-group v-model="selection">
        <el-radio label="0" size="large">全部</el-radio>
        <el-radio label="1" size="large">我创建的</el-radio>
        <el-radio label="2" size="large">我加入的</el-radio>
        <el-radio label="3" size="large">重点项目</el-radio>
      </el-radio-group>
    </div>
    <!-- 主体内容 -->
    <div class="interface__content">
      <div class="interface__content__box" @click="toProjectDetailPage">
        <div class="name">
          <span class="label">项目名称： </span>华南事发啊圣诞节了多少
        </div>
        <div class="time"><span class="label">创建日期： </span>2022-02-02</div>
        <div class="update">
          <span class="label">上次更新： </span>2022-02-02
        </div>
        <div class="leader">
          <span class="label">项目队长： </span>
          阿斯利康大家拉萨大家
          <span class="email">2311216746@qq.com</span>
        </div>
        <div class="mates">
          <span class="label">项目成员： </span>
          按时间来得及奥斯陆冬季拉萨大山里的吉拉斯觉得拉萨大山里的吉拉斯觉得拉萨奥斯陆冬季拉萨就
        </div>
        <div class="introduction">
          <span class="label" @click="openIntroduction">
            项目简介
            <el-icon v-if="!introductionActive"><CaretRight /></el-icon>
            <el-icon v-else><CaretTop /></el-icon>
          </span>
          <div class="detail" v-if="introductionActive">
            asjdklasjldjlas奥斯陆冬季拉萨觉得拉萨打扫垃圾的拉升阶段拉萨大萨拉丁就拉萨大家爱睡懒觉的拉升阶段垃圾收到了就爱上了的奥斯陆冬季拉萨觉得拉萨觉得奥斯陆冬季拉萨杜拉斯的拉升阶段拉萨角度来讲萨拉丁就爱上了打赏
          </div>
        </div>
        <div class="number">
          <span class="label" @click="openNumber">
            接口数量：10
            <el-icon v-if="!numberActive"><CaretRight /></el-icon>
            <el-icon v-else><CaretTop /></el-icon>
          </span>
          <div class="detail" v-if="numberActive">
            <div style="color: green">已完成：4</div>
            <div style="color: orange">待完善：1</div>
            <div style="color: red">已废弃：5</div>
          </div>
        </div>
        <div class="btn-box">
          <el-button type="primary" size="small">设为重点</el-button>
          <el-button type="primary" size="small">权限设置</el-button>
          <el-button type="warning" size="small">退出项目</el-button>
          <el-button type="danger" size="small">删除项目</el-button>
        </div>
      </div>
    </div>
    <!-- 分页管理器 -->
    <div class="interface__footer">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :page-size="10"
        :total="100"
      />
    </div>
  </div>
</template>


<style scoped lang='scss'>
.interface {
  position: relative;
  padding-bottom: 40px;
  &__header {
    margin-bottom: 10px;
    padding-left: 20px;
    border-bottom: 1px solid rgb(227, 227, 227);
  }
  &__content {
    &__box {
      padding: 5px 10px 10px 10px;
      border-bottom: 1px solid rgb(227, 227, 227);
      .name,
      .time,
      .update,
      .leader,
      .mates,
      .introduction,
      .number {
        margin-top: 10px;
        font-size: 13px;
        font-weight: bold;
        span {
          font-weight: 500;
          color: gray;
        }
      }
      .introduction,
      .number {
        &:hover {
          .label {
            color: #409eff;
            cursor: pointer;
          }
        }
        .detail {
          margin-top: 10px;
          font-weight: 500;
        }
      }
      .leader {
        .email {
          margin-left: 10px;
          font-weight: bold;
          color: orange;
        }
      }
      .btn-box {
        margin-top: 10px;
      }

      &:hover {
        background-color: #f4faff;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
  @media screen and (min-width: 1400px) {
    .interface__content {
      padding-left: 140px;
      padding-right: 140px;
    }
  }
  @media screen and (max-width: 1399px) {
    .interface__content {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  &__footer {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>

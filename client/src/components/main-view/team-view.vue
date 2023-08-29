<script lang='ts' setup>
import { ref } from "vue";

interface mate {
  name: string;
  job: string;
  email: string;
}
// 自定义数据
const mateArr: Array<mate> = [
  {
    name: "小明",
    job: "测试人员",
    email: "231121312@qq.com",
  },
  {
    name: "小明",
    job: "测试人员",
    email: "231121312@qq.com",
  },
  {
    name: "小明",
    job: "测试人员",
    email: "231121312@qq.com",
  },
];

// 响应式数据
// 头部的选择器
const selection = ref("0");
</script>

<template>
  <div class="team">
    <div class="team__header">
      <el-radio-group v-model="selection">
        <el-radio label="0" size="large">全部</el-radio>
        <el-radio label="1" size="large">我创建的</el-radio>
        <el-radio label="2" size="large">我加入的</el-radio>
        <el-radio label="3" size="large">重点团队</el-radio>
      </el-radio-group>
    </div>
    <div class="team__content">
      <div class="team__content__box">
        <div class="name">
          <span class="label">队伍名称： </span>华南事发啊圣诞节了多少
        </div>
        <div class="time"><span class="label">创建日期： </span>2022-02-02</div>
        <div class="leader">
          <span class="label">队长： </span>
          阿斯利康大家拉萨大家
          <span class="email">2311216746@qq.com</span>
        </div>
        <div class="mates">
          <span>队员：</span>
          <el-table :data="mateArr" border class="myexcel">
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="job" label="职位" width="180" />
            <el-table-column prop="email" label="邮箱" />
          </el-table>
        </div>
        <div class="btn-box">
          <el-button type="primary" size="small">设为重点</el-button>
          <el-button type="warning" size="small">退出队伍</el-button>
          <el-button type="danger" size="small">删除队伍</el-button>
        </div>
      </div>
    </div>
    <div class="team__footer">
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
.team {
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
    }
    .name,
    .time,
    .leader,
    .mates {
      margin-top: 10px;
      font-size: 13px;
      font-weight: bold;
      span {
        font-weight: 500;
        color: gray;
      }
    }
    .leader {
      .email {
        margin-left: 10px;
        font-weight: bold;
        color: orange;
      }
    }
    .mates {
      .myexcel {
        width: 80%;
        margin-top: 10px;
        font-size: 13px;
      }
    }
    .btn-box {
      margin-top: 20px;
    }
  }
  @media screen and (min-width: 1400px) {
    .team__content {
      padding-left: 140px;
      padding-right: 140px;
    }
  }
  @media screen and (max-width: 1399px) {
    .team__content {
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

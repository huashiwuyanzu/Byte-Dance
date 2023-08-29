<script lang='ts' setup>
// import { TEST2 } from "./api/test";
// import { useMessageStore } from "./store/message-store";
// const test = useMessageStore();
import { ElMessageBox } from "element-plus";

function test1() {
  // TEST2("202121310ss23").then(() => {
  //   console.log(test.messageNumber);
  //   test.messageNumber += 2;
  // });
  ElMessageBox.alert("This is a message", "Title");
}
</script>

<template>
  <button @click="test1">testtoken</button>
  <router-view></router-view>
</template>


<style scoped lang='scss'>
</style>

import axios from 'axios';

// 接口列表
const apiList = {
  TEST1: '/test1',
  TEST2: '/userinfo/get',
};



// 用户登录的接口
function TEST1(param: number) {
  return axios({
    method: "get",
    url: import.meta.env.VITE_BASEURL + apiList.TEST1,
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
}

function TEST2(param: number) {
  return axios({
    method: "get",
    url: import.meta.env.VITE_BASEURL + apiList.TEST2,
    data: param,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
}

export { TEST1, TEST2 };

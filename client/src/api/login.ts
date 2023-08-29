import axios from 'axios';

// 接口列表
const apiList = {
  REGIST: '/regist',
  LOGIN: '/login',
  AUTH: '/auth',
};

// 接口
// 用户信息
interface userInfo {
  userID: string,
  userPassword: string
}

// 用户注册的接口
function userRegist(param: userInfo) {
  return axios({
    method: "post",
    url: import.meta.env.VITE_BASEURL + apiList.REGIST,
    data: param
  });
}

// 用户登录的接口
function userLogin(param: userInfo) {
  return axios({
    method: "post",
    url: import.meta.env.VITE_BASEURL + apiList.LOGIN,
    data: param
  });
}

// 自动登录
function userAuth(userID){
  return axios({
    method: "get",
    url: import.meta.env.VITE_BASEURL + apiList.AUTH,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
  });
}

export { userRegist, userLogin, userAuth };

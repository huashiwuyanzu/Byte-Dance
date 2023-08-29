import axios from 'axios';

// 接口列表
const apiList = {
  GET: "/userinfo/get",
  UPDATE: "/userinfo/change",
  UPDATEPIC: "/userinfo/change-pic"
};

// 获取用户信息的接口
function userInfoGet(userID) {
  return axios({
    method: 'get',
    url: import.meta.env.VITE_BASEURL + apiList.GET,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    }
  });
}

// 修改用户信息的接口
function userInfoUpdate(param, userID) {
  return axios({
    method: 'post',
    url: import.meta.env.VITE_BASEURL + apiList.UPDATE,
    data: param,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    }
  });
}

// 更新用户头像的接口
function userPicUpdate(param, userID) {
  return axios({
    method: 'post',
    url: import.meta.env.VITE_BASEURL + apiList.UPDATEPIC,
    data: param,
    headers: {
      Authorization: localStorage.getItem('token' + userID),
      "Content-Type": "multipart/form-data",
    }
  });
}

export { userInfoGet, userInfoUpdate, userPicUpdate };

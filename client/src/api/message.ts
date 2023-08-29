import axios from 'axios';

// 接口列表
const apiList = {
  GET: '/message/get',
  NUMBERGET: '/message/number/get',
  DELETE: '/message/delete',
  AGREE: '/message/agree',
  REFUSE: '/message/refuse',
};

// 获取所有消息的接口
function messageGet(userID: string) {
  return axios({
    method: 'get',
    url: import.meta.env.VITE_BASEURL + apiList.GET,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
  });
}

// 获取消息数量的接口
function messageNumberGet(userID: string) {
  return axios({
    method: 'get',
    url: import.meta.env.VITE_BASEURL + apiList.NUMBERGET,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
  });
}

// 忽略消息的接口
function messageDelete(userID: string, param: any) {
  return axios({
    method: 'delete',
    url: import.meta.env.VITE_BASEURL + apiList.DELETE,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
    data: param
  });
}

// 同意邀请的接口
function messageAgree(userID: string, param: any) {
  return axios({
    method: 'post',
    url: import.meta.env.VITE_BASEURL + apiList.AGREE,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
    data: param
  });
}

// 拒绝邀请的接口
function messageRefuse(userID: string, param: any) {
  return axios({
    method: 'post',
    url: import.meta.env.VITE_BASEURL + apiList.REFUSE,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
    data: param
  });
}

export {
  messageGet,
  messageNumberGet,
  messageDelete,
  messageAgree,
  messageRefuse
};

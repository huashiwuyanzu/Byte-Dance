import axios from 'axios';

// 接口列表
const apiList = {
  CREATE:'/team/create',
};

// 新建队伍的接口
function teamCreate(param, userID) {
  return axios({
    method: 'post',
    url: import.meta.env.VITE_BASEURL + apiList.CREATE,
    headers: {
      Authorization: localStorage.getItem('token' + userID)
    },
    data:param
  });
}


export { teamCreate };

import { defineStore } from 'pinia';
export const useUserInfoStore = defineStore('counter', {
  state: () => {
    return {
      userID: "",
      userName: "",
      userEmail: "",
    };
  },
});

import { defineStore } from 'pinia';
export const useMessageStore = defineStore('msg', {
  state: () => {
    return {
      messageNumber: 0,
    };
  },
});

// 根据某个属性的值判断对象数组是否有重复
/* eslint-disable @typescript-eslint/no-unused-vars */
function isRepeat(key: string, arr: any): boolean {
  const includeArr = [];
  let flag = false;
  for (let i = 0; i < arr.length; ++i) {
    if (includeArr.includes(arr[i][key])) {
      flag = true;
    } else {
      includeArr.push(arr[i][key]);
    }
  }
  return flag;
}

// 根据某个属性的值来删除数组元素
/* eslint-disable @typescript-eslint/no-unused-vars */
function deleteByOneKey(key: string, value: string, arr: any): void {
  let index = 0;
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i][key] === value) {
      index = i;
    }
  }
  arr.splice(index, 1);
}


export { isRepeat, deleteByOneKey };

# 前端开发手册
##1概述
###1.1规约类型
<font style="color: #ff5566">【强制】</font> 必须遵循；   
<font style="color: #ffcc00">【推荐】</font> 推荐遵循；

##2编程规约
###2.1命名规约
1. <font style="color: #ff5566">【强制】</font>代码中的命名均不能以**特殊符号**
2. <font style="color: #ff5566">【强制】</font>所有编程相关的命名**严禁使用拼音与英文混合而成或者直使用拼音**
3. <font style="color: #ff5566">【强制】</font>**类名和接口**使用**大驼峰风格**
   
    ```typescript
        class UserController {
            
        }
   
    ```
4. <font style="color: #ff5566">【强制】</font>**方法名、参数名、成员变量、局部变量**统一使用**小驼峰风格**
   
    ```typescript
        let userName = 'lihua'
   
    ```
5. <font style="color: #ff5566">【强制】</font>**不可变常量**命名**全部大写**，单词间用**下划线**隔开
   
    ```typescript
        const USER_NAME = 'lihua';
   
    ```
6. <font style="color: #ff5566">【强制】</font>声明数组时**显示**定义数组类型

    ```typescript
        let userList: Array<string|object>;
    ```

7. <font style="color: #ff5566">【强制】</font>**ts文件和js文件**命名统一使用小写，单词间用-连接
8. <font style="color: #ff5566">【强制】</font>构造**Promise**时，成功回调为reslove，失败回调为reject
    
    ```typescript
        new Project((resolve, reject) => {
            ...
        })
    ```

9. <font style="color: #ff5566">【强制】</font>定义方法时应**显式定义返回值类型**和**传入参数类型**
    
    ```typescript
        const getUserInfo = function(userId:string): String{
            ...
        }
    ```

10. <font style="color: #ff5566">【强制】</font>避免不规范的缩写
11. <font style="color: #ffcc00">【推荐】</font>自定义编程元素命名时，尽量使用完整的单词组合
12. <font style="color: #ffcc00">【推荐】</font>自定义编程元素命名时，表示类型的名词放在词尾以提高辨识度

###2.2格式规约
1. <font style="color: #ff5566">【强制】</font>如果大括号内为空，直接写成{}即可
2. <font style="color: #ff5566">【强制】</font>如果大括号之间为非空代码块，则：
    （1）**左大括号前不换行**，左大括号后换行
    （2）右大括号前换行，右大括号后如果还有else等代码则不换行，表示终止的右大括号后必须换行
   
    ```typescript
        new Promise((resolve, reject) => {
            if(...) {
                resolve(...)
            } else {
                ...
            }
        })
    ```
    
3. <font style="color: #ff5566">【强制】</font>三目运算符左右都需要一个空格
4. <font style="color: #ff5566">【强制】</font>注释的双斜线和注释内容之间有且只有一个空格
5. <font style="color: #ff5566">【强制】</font>方法参数在定义和传入时，多个参数逗号后必须加空格，参数和类型声明之间**用空格隔开**

    ```typescript
        const getData = (first: string, second: number) {}
    ```
6. <font style="color: #ff5566">【强制】</font>代码语句后面都加**分号**
7. <font style="color: #ffcc00">【推荐】</font>使用**模板字符串**
8. <font style="color: #ffcc00">【推荐】</font>每一个Promise回调都要同时显式声明**成功回调和失败回调**
9. <font style="color: #ffcc00">【推荐】</font>定义匿名方法时，尽量使用**箭头函数**

###2.3控制语句
1. <font style="color: #ffcc00">【推荐】</font>使用vue3的**set up**语法糖，降低代码量
2. <font style="color: #ffcc00">【推荐】</font>表达异常的分支时，少用if-else方式，可以写成：

    ```typescript
        if(condition) {
            ...
            return obj
        }
        // 接着写else的业务逻辑代码
    ```

###2.4 **注释规约**
1. <font style="color: #ff5566">【强制】</font>每一个方法、类、接口前都必须有**块级注释**
2. <font style="color: #ff5566">【强制】</font>方法内部**单行注释**，在**被注释**语句上方另起一行进行注释
3. <font style="color: #ff5566">【强制】</font>注释中除了特定的英文专有名词，全部用**中文**

###2.5 **组织架构**
1. <font style="color: #ff5566">【强制】</font>路由模块文件放于router目录，全局状态管理（如vuex）放于store目录，其他一般模块文件放于utils目录中对应的分类目录中
2. <font style="color: #ff5566">【强制】</font>**非直接响应页面**操作的方法不写在vue文件中，而是抽象出来卸载ts文件或者js文件中作为模块使用
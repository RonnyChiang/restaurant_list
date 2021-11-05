# 就。餐。聽 

此專案使用了Node.js 及 Express架構，可提供使用者找到自己喜愛的餐廳。

## 功能列表

1. 查看所有餐廳
2. 搜尋--透過餐廳名稱及餐廳類別
3. 點擊可檢視餐廳詳細資訊
4. 詳細資訊中的位置符號可以連結至googlemap
5. 新增喜愛的餐廳
6. 修改餐廳資訊
7. 移除餐廳

### 安裝資料庫

請先確認安裝有安裝mongoDB(4.2.17)

1.至官網下載4.2.17版本https://www.mongodb.com/download-center/community

2.將資料夾移動至/Users/[你的使用者名稱]/改名為"mongodb"，並於同階層新增"mongodb-data"資料夾

3.執行mongoDB
```
cd ~/mongodb/bin/       // 切換到 mongodb 目錄
```
```
./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```
若能於系統訊息中查詢到"waiting for connections on port 27017"，即表示資料庫成功連接。

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/RonnyChiang/restaurant_list.git
```

2.初始

```
cd Restaurant_list  //切至專案資料夾
```

```
npm install  //安裝套件
```

```
npm install nodemon -g              // -g 安裝在全域
```

3.開啟程式

```
npm run start
```

當終端機(terminal)出現以下文字，代表伺服器已啟動
```
Express is running on http://localhost:3000
```
若要暫停使用
```
ctrl + c
```

# 專案開發人員
[Ronny Chiang](https://github.com/RonnyChiang)

## Screen Photo

not yet

## 版本更新

2021.11.06 - 增加排序功能

## 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [node.js 14.16.0](https://nodejs.org/en/) - 開發環境
- [Express 4.17.1](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-handlebars 5.3.4](https://www.npmjs.com/package/express) - 樣版引擎
- [mongoose 6.0.12](https://www.npmjs.com/package/express) - Object Document Mapper
- [mongoDB 4.2.17](https://www.mongodb.com/download-center/community) - 非關聯式資料庫
- [Robo 3T Only](https://robomongo.org/download/) - 資料庫圖形介面軟體


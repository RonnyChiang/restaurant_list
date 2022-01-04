# 就。餐。聽 

此專案使用了Node.js 及 Express架構，可提供使用者找到自己喜愛的餐廳。

## 功能列表

1. 查看所有餐廳
2. 搜尋--透過餐廳名稱及餐廳類別
3. 點擊可檢視餐廳詳細資訊
4. 詳細資訊中的位置符號可以連結至google map
5. 新增喜愛的餐廳
6. 修改餐廳資訊
7. 移除餐廳

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

```
npm run seed             // 安裝預設使用者及種子資料（如有需要）
```
預設使用者帳號為 user1@example.com及user2@example.com，密碼皆為12345678

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

<img width="1352" alt="截圖 2021-12-17 下午5 26 05" src="https://user-images.githubusercontent.com/43169057/146521979-9f5f3885-4fc0-46a4-8b77-2f08b349e05d.png">

## 版本更新 

2021.11.06 - 增加排序功能

2021.12.17 - 增加帳號登入機制，並建立預設測試帳user1@example.com及user2@example.com包含相關種子資料．


# sparrow

## 开发环境运行

```bash
npm install
npm run dev
# js 打包主要后台使用
npm run dev-js
```

## 访问

[http://127.0.0.1:7001](http://127.0.0.1:7001)

## URL

### 前台

```bash
单条博文 -> /2019/02/xx.html
归档 -> /2019/02
Tag -> /tag/yyy
页面 -> /page/abc.html
```

### 后台

```
首页（列表页） -> /pagesadmin
新建或编辑页面 -> /pagesadmin/posts/abc-def
设置页面 -> /pagesadmin/settings
```


## API

### POST

```
// 获取POST列表
GET /api/posts
响应状态码：200

// 获取单个POST
GET /api/posts/id
响应状态码：200

// 创建POST
POST /api/posts
响应状态码：201

// 更新POST
PUT /api/posts/id
响应状态码：204
响应体：空
```

### SiteConfig

```
// GET 获取列表
GET /api/site_config
响应状态码：200

// POST 更新
PUT /api/site_config
响应状态码：204
响应体：空
```
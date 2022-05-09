# covid_maga
基于koa.js和Vue.js的前全栈的校园疫情管理系统。前端技术栈Vue3+Typescript+Vite2+Tailwindcss，后端技术栈koa.js，数据库采用MySQL

## How To Run It?

> Environment

Fistly, you need to make true that **the version of Node.js&&npm** installed in your current operation system which is using currently higher than or equal **v17.8.0&&6.14.9**.
You could check for it by:
```bash
node -v && npm -v
```
**By the way, you can install latest Nodejs at the moment to resolve bugs that caused by vesion.**


> Operation
### install package
```bash
cd server/ && npm install
cd web/ && npm install
```

### run project
```bash
cd server/ && npm run dev
cd web/ && npm run dev
```
And then, you could copy URL: `localhost:3000` to the bar which in browser navigation.

### build project
```bash
cd web/ && npm run build
```
You will get `dist` folder in current directory. And so, you could copy to web-server and mount it.



### caculate lines of code

open bash and do this:

```bash
find . "(" -name "*.html" -or -name "*.js" -or -name "*.css" -or -name "*.vue" -or -name "*.ts" ")" -print | xargs wc -l
```




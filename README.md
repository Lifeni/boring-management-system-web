# 一个教务管理系统的前端

![GitHub](https://img.shields.io/github/license/Lifeni/boring-management-system-web)

来自软件架构课程设计，用 [SvelteKit](https://kit.svelte.dev/) + [Sveltestrap](https://sveltestrap.js.org/?path=/story/components--get-started) (Bootstrap 5) + [Grid.js](https://gridjs.io/) 实现。

## 更多信息

有关这个项目的更多信息（包括截图和实现），可以去后端仓库 [boring-management-system](https://github.com/Lifeni/boring-management-system) 查看。

首页背景图片 Photo by <a href="https://unsplash.com/@ujitomo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">TOMOKO UJI</a> on <a href="https://unsplash.com/s/photos/sakura?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> 。

## 开发

前端需要使用 Node 环境进行开发，推荐使用 Node 14 及以上版本和 pnpm 作为包管理工具。

```shell
# 安装依赖
pnpm install
```

前端无法单独运行，需要配合后端 [boring-management-system](https://github.com/Lifeni/boring-management-system) 运行。

```shell
# 启动开发环境，默认端口为 6010
npm run dev
```

```shell
# 编译生产版本，以及预览
npm run build
npm run preview
```

推荐使用 Caddy 进行反向代理，避免跨域问题，详情见 [后端仓库的 README](https://github.com/Lifeni/boring-management-system#%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98%E4%B8%8E%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86) 。



## 开源协议

MIT License

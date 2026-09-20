# YANG — AI Application Engineering Portfolio

小杨的独立个人作品集。面向 AI 应用开发，展示业务场景、工程决策与可验证项目入口。

## 内容与交互

- 4 个精选案例：云贷、AI 内容工程、多语言财务解析、机器学习实验。
- 18 个项目与研究条目，按领域筛选，支持案例详情与项目锚点。
- Canvas 动态点阵、流程动画与滚动显现；支持暂停与系统减少动态效果。
- 桌面与移动布局、键盘操作、焦点管理、邮箱联系。
- 架构图为说明性示意，不冒充真实产品截图或运行指标。

## 开发

```sh
npm ci
npm run dev
npm run build
```

项目基于 React、TypeScript、Vinext、Tailwind 和 Base UI / shadcn 构建。静态导出在 dist/client/。

## 维护内容

项目资料集中在 app/projects.ts；页面在 app/page.tsx；主题与响应式样式在 app/globals.css。
新增条目应明确状态、实现边界及可公开证据。私有源码、客户资料与凭据不进入本站。

## GitHub Pages

GitHub Actions 在 main 更新时构建与发布。GITHUB_PAGES=true 时使用 /ai-project-studio 前缀。
这是独立仓库，与 personal-project-wiki 分开维护。

## 说明

项目介绍依据已有项目文档与公开代码整理，测试文件数量不代表最新测试通过数。
本仓库展示软件工程案例，不提供融资承诺或投资建议。



## GitHub Pages 发布
当前站点从 `gh-pages` 分支发布。更新源码后，使用 Node 22，执行 `npm run build` 和 `node scripts/prepare-github.mjs`，将 `out/github-pages` 内容发布至该分支。`docs/pages-workflow.example.yml` 为自动部署模板；具备 workflow 权限时可移入 `.github/workflows/pages.yml` 并将 Pages 切换至 GitHub Actions。


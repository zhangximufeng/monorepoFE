# 一个`Hooks-Admin`+`Monorepo`搭建的后台管理模板「admin template」

## 支持`vite`生成动态路由

## 代码简介，致力打造成一个标准的模版，可直接用于生产环境开发

# `Monorepo` 管理项目

## 为什么使用

随着研发代码的增多, 工程日益复杂，代码复用和版本管理显得格外的繁琐，版本升级没有日志，相互依赖的包需要手动管理版本，以往的组件库独立开发的方式并没有很好的区分组件和组件之间的关系，往往只需要一种类型的组件，例如图表，但还是不得不安装一整个组件库，并没有很好的对组件进行区分，如哪些是图表组件，哪些是功能组件，哪些是业务组件等，造成组件库越来越大，编译打包效率降低，每次一个小改动就不得不直接发布一整个包预览效果，且无法支持本地调试等以下相关痛点

- 组件耦合严重，组件代码量大
- 业务开发分工不明确，业务开发人员要关心非业务的代码
- 编译慢，效率低
- 无法对应用做增量编译&增量部署
- 相关包基础依赖可能会重复打包，如： `lodash`,`moment`...
- 管理、调试、追踪 `bug` 困难
- 不同项目之间 `node`、`node-sass`、`webpack` 等基础依赖版本不统一，切换增加心智负担
- 不同项目可能存在技术栈不统一，如：状态管理，`less`,`sass`
- 分支管理混乱
- 多包多项目之间依赖关系复杂
- 第三方依赖库版本可能不一致
- 占用总空间大
- 不利于团队协作
- 无法针对主应用统一跑测试用例,发布时很难避免一些基本的错误发生
- 需要频繁切换项目
- 搭建独立的文档系统和其他子应用时，相关依赖又要单独管理，又有上述的症状
  针对上述问题我们引入了 `Monorepo` 的概念，把以往的单一组件库拆分为职责更细化的包，架构更清晰，解耦，子应用隔离
- [精读《Monorepo 的优势》](https://zhuanlan.zhihu.com/p/65533186)
- [现代化前端应用为什么越来越离不开 Monorepo](https://juejin.cn/post/6944877410827370504)
- [参考](https://turbo.build/repo/docs/core-concepts/monorepos)

## 子应用

- 单独部署
- 单独开发
- 相当于微前端
- 开发中...

## 相关技术栈

- `react`，`react18`，`vite`，`vite3`，`antd`，`antd5.x`，`ts`，`typescript`，`redux`，`react-redux`，`@reduxjs/toolkit`
- [Monorepo](https://turbo.build/repo/docs)
- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Antd5](https://ant.design)
- [Redux](https://react-redux.js.org)
- [Redux-toolkit](https://redux-toolkit.js.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## 环境

- nodejs >= 16
- npm
- pnpm

### pnpm 相关命令 [pnpm](https://www.pnpm.cn/cli/add)

- pnpm add sax 保存到 dependencies 配置项下
- pnpm add -D sax 保存到 devDependencies 配置项下
- pnpm add -O sax 保存到 optionalDependencies 配置项下
- pnpm add -g sax 安装软件包到全局环境中
- pnpm add sax@next 安装标记为 next 的版本
- pnpm add sax@3.0.0 安装指定版本 3.0.0

### 推荐使用 webstrom vscode 开发

### 代码目录结构

- 使用库生成 `treer`
- 生成 `tree -e ./result.txt -i '/node_modules|.git/'`

### 包划分

- [components](components) 存放功能性组件，更偏向系统功能，比如`Layout`公共布局组件
- [eslint-config-custom](eslint-config-custom) `eslint`统一管理，所有`package`统一引入
- [hooks](hooks) 自定义`react hooks`，比如`KeepAlive`
- [store](store) 全局状态管理器，封装了`redux`，`store`树，提供`useSelector`，`useDispatch`
- [utils](utils) 工具库，常用的工具函数

### 开始

1. 创建项目
   ```bash
   git clone https://github.com/limuen/monorepoFE.git
   ```
2. 访问项目目录
   ```bash
   cd monorepoFE
   ```
3. git 初始化项目
   ```bash
   git init
   ```
4. 安装依赖包
   ```bash
   pnpm install
   ```
5. 启动项目
   ```bash
   pnpm run dev
   ```

### 发布

- 生产环境打包
  ```bash
  pnpm build
  ```
- 测试环境打包
  ```bash
  pnpm build:sit
  ```

### 校验代码 格式化代码

- 提交代码自动执行

```bash
pnpm run lint && pnpm run format
```

### 提交格式

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 仅仅修改了文档，比如 README, CHANGELOG 等等
- `test`: 增加/修改测试用例，包括单元测试、集成测试等
- `style`: 修改了空行、缩进格式、引用包排序等等（不改变代码逻辑）
- `perf`: 优化相关内容，比如提升性能、体验、算法等
- `refactor`: 代码重构，「没有新功能或者 bug 修复」
- `chore`: 改变构建流程、或者增加依赖库、工具等
- `revert`: 回滚到上一个版本
- `merge`: 代码合并

## License

This project is licensed under the MIT License. .

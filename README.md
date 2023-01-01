## 项目前置准备工作

### 工具侧

- React v18.2.0
- Node v16.15.1
- Typescript v4.7.4
- React-router v5
- Ant Design v4.22.4

### 安装 React+Ts

```js
 npx create-react-app iblog-admin --template typescript
```

#### 暴露config配置文件

使用命令：`npm run eject`

报错：`Parsing error: [BABEL] `解决方案：

参考链接：https://github.com/facebook/create-react-app/issues/12070

在`eslintConfig`下新增：

```json
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "parserOptions": {
      "babelOptions": {
        "presets": [
          [
            "babel-preset-react-app",
            false
          ]
        ]
      }
    }
  },
```

#### 配置tsconfig文件

各个参数解释：https://segmentfault.com/a/1190000021749847

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "jsx": "react",
    "esModuleInterop": true,
    "sourceMap": true,
    "baseUrl": "./",
    "strict": true,
    "paths": {
      "@/*": ["src/*"],
    },
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/mock/**/*",
    "src/**/*",
    "config/**/*",
    "typings.d.ts"
  ]
}
```


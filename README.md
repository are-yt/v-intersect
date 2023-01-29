# 注册

```js
// npm i vue-v-intersect --save
import { createApp } from 'vue'
import App from './App'
// 引入指令
// 如果在ts项目中，需要在根目录的*.d.ts文件里声明：declare module 'vue-v-intersect'
import { vIntersection } from 'vue-v-intersect'
const app = createApp(App)
app
	.directive('intersect', vIntersection)
	.mount("#app")
```

# 使用图片懒加载

```vue
<template>
  <div id="app">
    <img
       v-intersect.lazy
       datasrc="http:///p9.qhimg.com/t01a31f699a151a9c12.jpg"
       src="http:///p2.qhimg.com/t019ca75cd449be50c1.jpg"
     />
  </div>
</template>

<script setup lang="ts"></script>

<style>
#app {
  padding-top: 150vh;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  display: block;
  margin: auto;
}
</style>
```

src为真实图片加载前的代替图片，通常是一张体积较小的图片，也可以不设置代替图片，但需要考虑真实图片是否能一瞬间被加载和展示出来，否则用户在加载并展示出真实图片之前会看到一个图片加载失败的标志，这有些许不友好。datasrc为要展示的真实图片，当这个图片元素进入可视范围内时src会被替换为真正要展示的图片地址，即datasrc。通过这种方式可以避免用户使用应用时流量的无谓消耗和减小服务器的压力。

> 客户端缓存策略会缓存相同地址的资源，意味着即使在很多地方使用到图片懒加载，只要代替图片(src)使用的是同一张，这张图片只会被加载一次，后续客户端会利用缓存直接展示。

# 使用动态样式

```vue
<template>
  <div id="app">
    <div v-intersect.class="'animate'" class="box"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
#app {
  padding-top: 150vh;
}
.box {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  background: #90d7ec;
  margin: 200px auto;
}
.animate {
  animation: into 1s;
}
@keyframes into {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
```

# 一起使用

```vue
<template>
	<div id="app">
    <img
       v-intersect.lazy.class="'animate'"
       datasrc="http:///p9.qhimg.com/t01a31f699a151a9c12.jpg"
       src="http:///p2.qhimg.com/t019ca75cd449be50c1.jpg"
     />
  </div>
</template>
```


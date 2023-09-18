<template>
  <div class="flow-chart">
    <!--   1 -->
    <div class="flow-wrap">
      <div class="flow-title">
        <div class="number">一</div>
        <div class="txt">扫码登录</div>
      </div>
      <ul class="flow-group">
        <li class="flow-item">
          <span>打开程序登录后扫码借伞</span>
        </li>
      </ul>
    </div>
    <!--   2 -->
    <div class="flow-wrap">
      <div class="flow-title">
        <div class="number">二</div>
        <div class="txt">完成借伞</div>
      </div>
      <ul class="flow-group">
        <li class="flow-item">
          <span>扫码完成伞自动弹出</span>
        </li>
      </ul>
    </div>
    <!--   3 -->
    <div class="flow-wrap">
      <div class="flow-title">
        <div class="number">三</div>
        <div class="txt">按时还伞</div>
      </div>
      <ul class="flow-group">
        <li class="flow-item">
          <span>借伞后48小时内归还雨伞</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
boby,
html {
  font-family: 'Microsoft JhengHei', serif;
}
.flow-chart {
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.flow-chart .flow-wrap {
  width: 20%;
}
.flow-chart .flow-title {
  text-align: center;
}
.flow-chart .flow-title .number {
  background-color: #ff0066;
  color: #fff;
  margin: 10px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 50px;
  position: relative;
  padding-left: 2rem;
}
.flow-chart .flow-wrap:nth-child(2) .flow-title .number {
  background-color: #ed7d31;
}
.flow-chart .flow-wrap:nth-child(3) .flow-title .number {
  background-color: #ffc000;
}
.flow-chart .flow-wrap:nth-child(4) .flow-title .number {
  background-color: #00b050;
}
.flow-chart .flow-wrap:nth-child(5) .flow-title .number {
  background-color: #0070c0;
}
.flow-chart .flow-title .number:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 0 25px 30px;
  border-color: transparent transparent transparent #fff;
}
.flow-chart .flow-title .number:after {
  content: '';
  position: absolute;
  top: 0;
  right: -30px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 0 25px 30px;
  border-color: transparent transparent transparent #ff0066;
  z-index: 1;
}
.flow-chart .flow-wrap:nth-child(2) .flow-title .number:after {
  border-color: transparent transparent transparent #ed7d31;
}
.flow-chart .flow-wrap:nth-child(3) .flow-title .number:after {
  border-color: transparent transparent transparent #ffc000;
}
.flow-chart .flow-wrap:nth-child(4) .flow-title .number:after {
  border-color: transparent transparent transparent #00b050;
}
.flow-chart .flow-wrap:nth-child(5) .flow-title .number:after {
  border-color: transparent transparent transparent #0070c0;
}
.flow-chart .flow-title .txt {
  color: #ff0066;
  font-weight: bold;
  font-size: 1.2rem;
}
.flow-chart .flow-wrap:nth-child(2) .flow-title .txt {
  color: #ed7d31;
}
.flow-chart .flow-wrap:nth-child(3) .flow-title .txt {
  color: #ffc000;
}
.flow-chart .flow-wrap:nth-child(4) .flow-title .txt {
  color: #00b050;
}
.flow-chart .flow-wrap:nth-child(5) .flow-title .txt {
  color: #0070c0;
}
.flow-chart .flow-group {
  list-style-type: none;
  padding-left: 0;
}
.flow-chart li.flow-item {
  border: 1px solid #ff0066;
  border-radius: 1rem;
  margin: 0.5rem;
  padding: 1rem 0.5rem;
  text-align: center;
  position: relative;
}
.flow-chart .flow-wrap:nth-child(2) li.flow-item {
  border: 1px solid #ed7d31;
}
.flow-chart .flow-wrap:nth-child(3) li.flow-item {
  border: 1px solid #ffc000;
}
.flow-chart .flow-wrap:nth-child(4) li.flow-item {
  border: 1px solid #00b050;
}
.flow-chart .flow-wrap:nth-child(5) li.flow-item {
  border: 1px solid #0070c0;
}
.flow-chart li.flow-item + li {
  background-color: #ffcccc;
}
.flow-chart .flow-wrap:nth-child(2) li.flow-item + li {
  background-color: #fbe5d6;
}
.flow-chart .flow-wrap:nth-child(3) li.flow-item + li {
  background-color: #fff2cc;
}
.flow-chart .flow-wrap:nth-child(4) li.flow-item + li {
  background-color: #e2f0d9;
}
.flow-chart .flow-wrap:nth-child(5) li.flow-item + li {
  background-color: #deebf7;
}
.flow-chart li.flow-item + li:before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 7.5px 0 7.5px;
  border-color: #333333 transparent transparent transparent;
}
.flow-chart .flow-item p {
  font-weight: bold;
  margin: 0;
  color: #ffd700;
}
.flow-chart .flow-item span {
  font-size: 0.8rem;
  color: #ffd700;
}
.flow-chart .flow-item a {
  font-size: 0.8rem;
  display: inline;
  word-break: break-all;
}
.flow-chart .flow-wrap .flow-item.disable {
  background-color: #ddd !important;
  color: #666;
}
</style>

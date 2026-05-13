---
title: S1数据下载
date: 2026-05-13
tags: [Insar, S1]
category: 学习心得
summary: S1数据下载
series: S1处理
order: 1
---

下面讲述如何使用ASF下载S1数据

## 网址
ASF网址为：<https://search.asf.alaska.edu/#/?dataset=SENTINEL-1%20BURSTS&maxResults=250>
<br>提前注册好账号(下载一般不用翻墙)

## 数据的筛选
![筛选界面](/dgal-blog/images/S1/1-filter.png)

在Dataset中可选择S1数据，Area可上传shp范围，在Filters中选择IW,极化，升降轨，卫星，Path和Frame

## 下载

![加入购物车](/dgal-blog/images/S1/2-cart.png)

筛选好后在左下角添加进购物车，点击右上角download

![下载模式](/dgal-blog/images/S1/3-download-mode.png)
分为三种下载模式：
<br>1.Download All 在谷歌浏览器中直接下载(我没成功过)
<br>2.Download Python Script 下载对应的py文件，在py中输入用户名和密码下载
<br>3.Copy URLs 复制链接到IDM中下载，需要对IDM进行提前设置

**IDM设置**
在IDM下载-选项中选择站点管理，新建
![IDM设置](/dgal-blog/images/S1/4-idm.png)
输入对应的网站、用户名和密码
---
title: offset_fitm
category: 精配准
summary: 使用 SVD 方法拟合距离向和方位向偏移多项式，剔除误差点后建立精配准映射关系。
---

**offset_fitm**

Range and azimuth offset polynomial estimation using SVD.

使用 SVD 方法拟合距离向和方位向偏移多项式，剔除误差点后建立精配准映射关系。

## 帮助文档

```
*** Range and azimuth offset polynomial estimation using SVD ***
*** Copyright 2020, Gamma Remote Sensing, v4.0 2-Sep-2020 clw/uw/cm ***

usage: offset_fitm <offs> <ccp> <DIFF_par> [coffs] [coffsets] [thres] [npoly] [interact_mode]

input parameters:
  offs          (input) range and azimuth offset estimates (fcomplex)
  ccp           (input) cross-correlation of each patch (float)
  DIFF_par      (input) DIFF/GEO parameter file for the scene
  coffs         (output) culled range and azimuth offset estimates (fcomplex, enter - for none)
  coffsets      (output) culled offset estimates and cross-correlation values (text format, enter - for none)
  thres         cross-correlation threshold (enter - for default from DIFF_par)
  npoly         number of model polynomial parameters (enter - for default, 1, 3, 4, 6, default: 4)
  interact_mode interactive culling of input data:
                  0: off (default)
                  1: on
```

## 参数翻译

| 参数            | 说明                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `offs`          | 输入：距离向和方位向偏移估计（fcomplex）                             |
| `ccp`           | 输入：各匹配窗口的互相关系数（float）                                |
| `DIFF_par`      | 输入：场景的 DIFF/GEO 参数文件                                       |
| `coffs`         | 输出：剔除误差后的偏移估计（fcomplex，`-` 表示不输出）               |
| `coffsets`      | 输出：剔除误差后的偏移估计和相关系数文本（`-` 表示不输出）           |
| `thres`         | 互相关阈值（默认从 DIFF_par 读取）                                   |
| `npoly`         | 多项式模型参数个数：1/3/4/6（默认 4）                                |
| `interact_mode` | 交互式误差剔除：0=关闭（默认），1=开启                               |

---
title: multi_look
category: 预处理
summary: 对 SLC 复数影像进行多视处理，生成多视强度图（MLI），提高信噪比并使像素间距接近一致。
---

**multi_look**

Multi-looking of complex data (SLC) and generation of multi-look intensity (MLI).

对 SLC 复数影像进行多视处理，生成多视强度图（MLI），提高信噪比并使距离向与方位向的像素间距接近一致。

## 帮助文档

```
*** Multi-looking of complex data (SLC) and generation of multi-look intensity (MLI) ***
*** Copyright 2022, Gamma Remote Sensing, v3.8 cm/cw ***

usage: multi_look <SLC> <SLC_par> <MLI> <MLI_par> <rlks> <azlks> [loff] [nlines] [scale]

input parameters:
  SLC       (input) single-look complex data file
  SLC_par   (input) SLC parameter file
  MLI       (output) multi-look intensity data file
  MLI_par   (output) MLI parameter file
  rlks      number of range looks
  azlks     number of azimuth looks
  loff      offset to first line (enter - for default: 0)
  nlines    number of SLC lines to process (enter - for default: 0 = all)
  scale     output scaling factor (enter - for default: 1.0)
```

## 参数翻译

| 参数       | 说明                                              |
| ---------- | ------------------------------------------------- |
| `SLC`      | 输入：单视复数数据文件                            |
| `SLC_par`  | 输入：SLC 参数文件                                |
| `MLI`      | 输出：多视强度数据文件                            |
| `MLI_par`  | 输出：MLI 参数文件                                |
| `rlks`     | 距离向视数                                        |
| `azlks`    | 方位向视数                                        |
| `loff`     | 起始行偏移（默认 0）                              |
| `nlines`   | 要处理的 SLC 行数（默认 0 = 全部）                |
| `scale`    | 输出缩放因子（默认 1.0）                          |

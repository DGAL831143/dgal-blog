---
title: init_offsetm
category: 精配准
summary: Initial offset estimation for multi-look intensity images.
---

**init_offsetm**

Initial offset estimation for multi-look intensity images.

多视强度图初始偏移量估计，通过互相关确定参考影像与待配准影像之间的大致偏移量。

## 帮助文档

```
*** Initial offset estimation for multi-look intensity images ***
*** Copyright 2021, Gamma Remote Sensing, v4.2 18-Feb-2021 clw/uw/cm ***

usage: init_offsetm <MLI-1> <MLI-2> <DIFF_par> [rlks] [azlks] [rpos] [azpos] [offr] [offaz] [thres] [patch] [cflag]

input parameters:
  MLI-1     (input) intensity image 1 (float) (reference)
  MLI-2     (input) intensity image 2 (float)
  DIFF_par  DIFF/GEO parameter file
  rlks      number of range looks (enter - for default: 1)
  azlks     number of azimuth looks (enter - for default: 1)
  rpos      center of region for comparison in range (enter - for default: image center)
  azpos     center of region for comparison in azimuth (enter - for default: image center)
  offr      initial range offset (enter - for default from DIFF_par)
  offaz     initial azimuth offset (enter - for default from DIFF_par)
  thres     correlation SNR threshold (enter -  for default:  0.150)
  patch     correlation patch size (enter - for default: 512)
  cflag     copy offsets to the range and azimuth offset polynomials in DIFF_par (enter - for default)
              0: do not copy
              1: copy constant range and azimuth offsets (default)
```

## 参数翻译

| 参数       | 说明                                                                |
| ---------- | ------------------------------------------------------------------- |
| `MLI-1`    | 输入：参考强度影像 1（float）                                       |
| `MLI-2`    | 输入：待配准强度影像 2（float）                                     |
| `DIFF_par` | DIFF/GEO 参数文件                                                   |
| `rlks`     | 距离向视数（默认 1）                                                |
| `azlks`    | 方位向视数（默认 1）                                                |
| `rpos`     | 距离向匹配区域中心（默认：影像中心）                                |
| `azpos`    | 方位向匹配区域中心（默认：影像中心）                                |
| `offr`     | 距离向初始偏移（默认从 DIFF_par 读取）                              |
| `offaz`    | 方位向初始偏移（默认从 DIFF_par 读取）                              |
| `thres`    | 互相关 SNR 阈值（默认 0.150）                                       |
| `patch`    | 互相关匹配窗口大小（默认 512）                                      |
| `cflag`    | 是否将偏移量写入 DIFF_par：0=不写，1=写入常值偏移（默认）           |

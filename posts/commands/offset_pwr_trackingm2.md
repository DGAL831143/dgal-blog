---
title: offset_pwr_trackingm2
category: 精配准
summary: 基于强度互相关的多视影像偏移量追踪，使用输入偏移量图确定每个窗口的初始偏移。
---

**offset_pwr_trackingm2**

Offset tracking between MLI images using intensity cross-correlation with the initial offset for each patch determined from an input offset map.

基于强度互相关的多视影像偏移量追踪，区别于 `offset_pwrm`，本指令从输入的偏移量图中读取每个窗口的初始偏移，适用于大形变或长基线情况。

## 帮助文档

```
*** Offset tracking between MLI images using intensity cross-correlation with the initial offset for each patch determined from an input offset map ***
*** Copyright 2022, Gamma Remote Sensing, v1.8 clw/cm 2-Feb-2022 ***

usage: offset_pwr_trackingm2 <MLI-1> <MLI-2> <DIFF_par> <offs> <ccp> [DIFF_par2] [offs2] [rwin] [azwin] [offsets] [n_ovr] [thres] [rstep] [azstep] [rstart] [rstop] [azstart] [azstop] [bw_frac] [pflag] [pltflg] [ccs] [std_mean]

input parameters: 
  MLI-1      (input) real valued intensity image 1 (reference)
  MLI-2      (input) real valued intensity image 2
  DIFF_par   (input) DIFF/GEO parameter file
  offs       (output) offset estimates in range and azimuth (fcomplex)
  ccp        (output) cross-correlation of each patch (0.0->1.0) (float)
  DIFF_par2  (input) DIFF/GEO parameter file of the offset map to determine initial offsets (enter - for none)
  offs2      (input) input range and azimuth offset map to determine initial offsets (enter - for none)
  rwin       range patch size (range pixels, enter - for default from offset parameter file)
  azwin      azimuth patch size (azimuth lines, enter - for default from offset parameter file)
  offsets    (output) range and azimuth offsets and cross-correlation data in text format, enter - for no output
  n_ovr      MLI oversampling factor (integer 2**N (1,2,4), enter - for default: 1)
  thres      cross-correlation threshold (0.0->1.0) (enter - for default from offset parameter file)
  rstep      step in range pixels (enter - for default: rwin/2)
  azstep     step in azimuth pixels (enter - for default: azwin/2)
  rstart     offset to starting range pixel (enter - for default: 0)
  rstop      offset to ending range pixel (enter - for default: nr-1)
  azstart    offset to starting azimuth line (enter - for default: 0)
  azstop     offset to ending azimuth line  (enter - for default: nlines-1)
  bw_frac    bandwidth fraction of low-pass filter on intensity data (0.0->1.0) (enter - for default: 0.8)
  pflag      print flag (enter - for default)
               0: print offset summary (default)
               1: print all offset data
  pltflg     plotting flag (enter - for default)
               0: none (default)
               1: screen output
               2: screen output and PNG format plots
               3: output plots in PDF format
  ccs        (output) cross-correlation standard deviation of each patch (float)
  std_mean   patch minimum standard deviation/mean ratio (enter - for default: 0.01)
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `MLI-1` | 输入：参考多视强度图 |
| `MLI-2` | 输入：待配准多视强度图 |
| `DIFF_par` | 输入：DIFF/GEO 参数文件 |
| `offs` | 输出：距离向和方位向偏移量估计（fcomplex） |
| `ccp` | 输出：各窗口的互相关系数（0.0→1.0，float） |
| `DIFF_par2` | 输入：偏移量图的 DIFF/GEO 参数文件，用于确定初始偏移（输入 `-` 表示无） |
| `offs2` | 输入：距离向和方位向偏移量图，用于确定各窗口初始偏移（输入 `-` 表示无） |
| `rwin` | 距离向窗口大小（距离向像元数，默认从 DIFF_par 读取） |
| `azwin` | 方位向窗口大小（方位向行数，默认从 DIFF_par 读取） |
| `offsets` | 输出：文本格式的偏移量和互相关系数（输入 `-` 表示不输出） |
| `n_ovr` | MLI 过采样因子（2 的幂次：`1`/`2`/`4`，默认：`1`） |
| `thres` | 互相关系数阈值（0.0→1.0，默认从 DIFF_par 读取） |
| `rstep` | 距离向步长（像元，默认：`rwin/2`） |
| `azstep` | 方位向步长（像元，默认：`azwin/2`） |
| `rstart` | 起始距离向像元偏移（默认：`0`） |
| `rstop` | 结束距离向像元偏移（默认：`nr-1`） |
| `azstart` | 起始方位向行偏移（默认：`0`） |
| `azstop` | 结束方位向行偏移（默认：`nlines-1`） |
| `bw_frac` | 强度数据低通滤波带宽比例（0.0→1.0，默认：`0.8`） |
| `pflag` | 打印标志：`0` = 打印偏移摘要（默认），`1` = 打印全部偏移数据 |
| `pltflg` | 绘图标志：`0` = 不绘图（默认），`1` = 屏幕显示，`2` = 屏幕显示 + PNG，`3` = PDF 格式 |
| `ccs` | 输出：各窗口互相关系数标准差（float） |
| `std_mean` | 窗口最小标准差/均值比（默认：`0.01`） |

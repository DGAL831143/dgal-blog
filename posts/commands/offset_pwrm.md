---
title: offset_pwrm
category: 精配准
summary: 基于强度互相关的多视影像偏移量精估计，计算距离向和方位向的亚像元级偏移。
---

**offset_pwrm**

Offset estimation between MLI images using intensity cross-correlation.

基于强度互相关的多视影像偏移量精估计，在多个窗口位置上计算距离向和方位向的亚像元级偏移。

## 帮助文档

```
*** Offset estimation between MLI images using intensity cross-correlation ***
*** Copyright 2021, Gamma Remote Sensing, v5.6 clw/cm 19-Feb-2021 ***

usage: offset_pwrm <MLI-1> <MLI-2> <DIFF_par> <offs> <ccp> [rwin] [azwin] [offsets] [n_ovr] [nr] [naz] [thres] [lanczos] [bw_frac] [pflag] [pltflg] [ccs] [std_mean]

input parameters:
  MLI-1     (input) real valued intensity image 1 (reference)
  MLI-2     (input) real valued intensity image 2
  DIFF_par  (input) DIFF/GEO parameter file
  offs      (output) offset estimates in range and azimuth (fcomplex)
  ccp       (output) cross-correlation of each patch (0.0->1.0) (float)
  rwin      range patch size (range pixels, enter - for default from offset parameter file)
  azwin     azimuth patch size (azimuth lines, enter - for default from offset parameter file)
  offsets   (output) range and azimuth offsets and cross-correlation data in text format, enter - for no output
  n_ovr     MLI oversampling factor (integer 2**N (1,2,4), enter - for default: 1)
  nr        number of offset estimates in range direction (enter - for default from offset parameter file)
  naz       number of offset estimates in azimuth direction (enter - for default from offset parameter file)
  thres     cross-correlation threshold (0.0->1.0) (enter - for default from offset parameter file)
  lanczos   Lanczos interpolator order 5 -> 9 (enter - for default: 5)
  bw_frac   bandwidth fraction of low-pass filter on intensity data (0.0->1.0) (enter - for default: 0.8)
  pflag     print flag (enter - for default)
              0: print offset summary (default)
              1: print all offset data
  pltflg    plotting flag (enter - for default)
              0: none (default)
              1: screen output
              2: screen output and PNG format plots
              3: output plots in PDF format
  ccs       (output) cross-correlation standard deviation of each patch (float)
  std_mean  patch minimum standard deviation/mean ratio (enter - for default: 0.01)
```

## 参数翻译

| 参数       | 说明                                                                 |
| ---------- | -------------------------------------------------------------------- |
| `MLI-1`    | 输入：参考强度影像 1                                                 |
| `MLI-2`    | 输入：待配准强度影像 2                                               |
| `DIFF_par` | 输入：DIFF/GEO 参数文件                                              |
| `offs`     | 输出：距离向和方位向偏移估计（fcomplex）                             |
| `ccp`      | 输出：各匹配窗口的互相关系数（0.0~1.0）（float）                     |
| `rwin`     | 距离向匹配窗口大小（默认从 DIFF_par 读取）                           |
| `azwin`    | 方位向匹配窗口大小（默认从 DIFF_par 读取）                           |
| `offsets`  | 输出：文本格式的偏移量和相关系数（`-` 表示不输出）                   |
| `n_ovr`    | MLI 过采样因子（2 的幂次：1/2/4，默认 1）                            |
| `nr`       | 距离向偏移估计点数量（默认从 DIFF_par 读取）                         |
| `naz`      | 方位向偏移估计点数量（默认从 DIFF_par 读取）                         |
| `thres`    | 互相关阈值（0.0~1.0，默认从 DIFF_par 读取）                          |
| `lanczos`  | Lanczos 插值器阶数 5~9（默认 5）                                     |
| `bw_frac`  | 强度数据低通滤波带宽比（0.0~1.0，默认 0.8）                          |
| `pflag`    | 打印方式：0=打印摘要（默认），1=打印全部数据                         |
| `pltflg`   | 绘图方式：0=不绘图（默认），1=屏幕，2=屏幕+PNG，3=PDF                |
| `ccs`      | 输出：各匹配窗口的互相关标准差（float）                              |
| `std_mean` | 窗口最小标准差/均值比（默认 0.01）                                   |

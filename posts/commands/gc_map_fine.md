---
title: gc_map_fine
category: 地理编码
summary: 利用 DIFF_par 偏移多项式精化粗查找表，生成用于精确地理编码的精细查找表。
---

**gc_map_fine**

Geocoding lookup table refinement using DIFF_par offset polynomials.

利用 DIFF_par 中的偏移多项式对粗查找表进行精化，生成用于最终精确转换的精细查找表。

## 帮助文档

```
*** Geocoding lookup table refinement using DIFF_par offset polynomials ***
*** Copyright 2011, Gamma Remote Sensing, v2.1 8-Apr-2011 clw/uw ***

usage: gc_map_fine <gc_in> <width> <DIFF_par> <gc_out> [ref_flg]

input parameters:
  gc_in     (input) geocoding lookup table
  width     width of geocoding lookup table (samples)
  DIFF_par  DIFF/GEO parameter file containing offset polynomial coefficients
  gc_out    (output) refined geocoding lookup table
  ref_flg   reference image flag (offsets are measured relative to the reference image):
              0: actual SAR image
              1: simulated SAR image (default)
```

## 参数翻译

| 参数       | 说明                                                                |
| ---------- | ------------------------------------------------------------------- |
| `gc_in`    | 输入：粗查找表                                                      |
| `width`    | 查找表宽度（采样数）                                                |
| `DIFF_par` | DIFF/GEO 参数文件，包含偏移多项式系数                               |
| `gc_out`   | 输出：精化后的查找表                                                |
| `ref_flg`  | 参考影像标识：0=实际 SAR 影像，1=模拟 SAR 影像（默认）              |

---
title: create_diff_par
category: 精配准
summary: Create DIFF/GEO parameter file for geocoding and differential interferometry.
---

**create_diff_par**

Create DIFF/GEO parameter file for geocoding and differential interferometry.

创建 DIFF/GEO 参数文件，用于地理编码和差分干涉测量。

## 帮助文档

```
*** Create DIFF/GEO parameter file for geocoding and differential interferometry ***
*** Copyright 2020, Gamma Remote Sensing, v3.5 2-Sep-2020 clw/uw/cm ***

usage: create_diff_par <PAR-1> <PAR-2> <DIFF_par> [PAR_type] [iflg]

input parameters:
  PAR-1     (input) image parameter file 1 (see PAR_type option)
  PAR-2     (input) image parameter file 2 (or - if not provided)
  DIFF_par  (input/output) DIFF/GEO parameter file
  PAR_type  PAR-1 and PAR-2 parameter file type (enter - for default):
              0: OFF_par     ISP offset and interferogram parameters  (default)
              1: SLC/MLI_par ISP SLC/MLI parameters
              2: DEM_par     DIFF/GEO DEM parameters
  iflg      interactive mode flag (enter -  for default)
              0: non-interactive
              1: interactive (default)
```

## 参数翻译

| 参数       | 说明                                                                |
| ---------- | ------------------------------------------------------------------- |
| `PAR-1`    | 输入：影像参数文件 1                                                |
| `PAR-2`    | 输入：影像参数文件 2（若无则输入 `-`）                              |
| `DIFF_par` | 输入/输出：DIFF/GEO 参数文件                                        |
| `PAR_type` | 参数文件类型：0=OFF_par（默认），1=SLC/MLI_par，2=DEM_par           |
| `iflg`     | 交互模式：0=非交互，1=交互（默认）                                  |

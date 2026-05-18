---
title: base_calc
category: 干涉对生成
summary: 计算 SAR 数据的垂直基线和时间基线，生成基线统计图和基线文件，同时生成干涉对表 (itab)，支持单参考和全连接两种模式。
---

**base_calc**

Generate baseline plot and output file with perpendicular baselines and delta_T values. Generate interferogram table (itab) file specifying SLCs for each interferogram.

计算 SAR 数据的垂直基线和时间基线，生成基线统计图和基线文件，同时生成指定每个干涉对 SLC 的干涉对表 (itab) 文件。

## 帮助文档

```
*** /usr/local/GAMMA_SOFTWARE-20221129/DIFF/scripts/base_calc
*** Copyright 2022, Gamma Remote Sensing, v4.2 7-Oct-2022 clw/uw/cm ***
*** Generate baseline plot and output file with perpendicular baselines and delta_T values ***
*** Generate interferogram table (itab) file specifying SLCs for each interferogram ***

usage: /usr/local/GAMMA_SOFTWARE-20221129/DIFF/scripts/base_calc <SLC_tab> <SLC_par> <bperp_file> <itab> <itab_type> [plt_flg] [bperp_min] [bperp_max] [delta_T_min] [delta_T_max] [delta_n_max]

    SLC_tab      (input) two column list of SLC filenames and SLC parameter filenames (including paths) (text)
                   1. SLC filename  (includes path)
                   2. SLC parameter filename (includes path)
    SLC_par      (input) reference SLC parameter filename (include path)
    bperp_file   (output) list of dates, bperp and delta_T for interferogram pairs in the itab (text)
    itab         (output) interferogram table with 4 column format:
                   1. row number in SLC_tab of the reference SLC
                   2. row number in SLC_tab of SLC-2 of the interferogram
                   3. line number in the itab
                   4. flag used to indicate if this interferogram is used in IPTA processing (0:not used  1:used)
    itab_type    itab type (enter - for default):
                   0: single reference (default)
                   1: all pairs
    pltflg       bperp plotting flag (enter - for default):
                   0: none (default)
                   1: output plot in PNG format
                   2: screen output
    bperp_min    minimum magnitude of bperp (m) (default = all, enter - for default)
    bperp_max    maximum magnitude of bperp (m) (default = all, enter - for default)
    delta_T_min  minimum number of days between passes (default = 0, enter - for default)
    delta_T_max  maximum number of days between passes
    delta_n_max  maximum scene number difference between passes
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `SLC_tab` | 输入：两列格式的 SLC 文件列表（文本），第 1 列：SLC 文件名（含路径），第 2 列：SLC 参数文件名（含路径） |
| `SLC_par` | 输入：参考 SLC 的参数文件名（含路径） |
| `bperp_file` | 输出：干涉对的日期、垂直基线 (bperp) 和时间基线 (delta_T) 列表文件（文本） |
| `itab` | 输出：4 列格式的干涉对表文件。第 1 列：参考 SLC 在 SLC_tab 中的行号，第 2 列：辅 SLC 在 SLC_tab 中的行号，第 3 列：干涉对在 itab 中的行号，第 4 列：IPTA 处理使用标志（`0` = 不使用，`1` = 使用） |
| `itab_type` | 干涉对生成类型：`0` = 单参考模式（默认），`1` = 全连接模式 |
| `pltflg` | 基线绘图标志：`0` = 不生成图（默认），`1` = 输出 PNG 格式基线图，`2` = 屏幕显示基线图 |
| `bperp_min` | 最小垂直基线绝对值（米，默认：全部） |
| `bperp_max` | 最大垂直基线绝对值（米，默认：全部） |
| `delta_T_min` | 最小时间基线（天，默认：`0`） |
| `delta_T_max` | 最大时间基线（天） |
| `delta_n_max` | 最大景号差（两个 SLC 在 SLC_tab 中的行号差最大值） |

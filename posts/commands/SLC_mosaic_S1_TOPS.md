---
title: SLC_mosaic_S1_TOPS
category: Sentinel-1 数据预处理
summary: 对 ScanSAR SLC burst 数据进行拼接，生成 SLC mosaic 影像（已更名为 SLC_mosaic_ScanSAR）。
---

**SLC_mosaic_S1_TOPS**（已更名为 **SLC_mosaic_ScanSAR**，命令行选项不变）

Calculate SLC mosaic of ScanSAR SLC burst data (Sentinel-1, TerraSAR-X, RCM...).

对 ScanSAR SLC burst 数据进行拼接，生成 SLC mosaic 影像，支持 Sentinel-1、TerraSAR-X、RCM 等数据。

## 帮助文档

```
******************************************************************************************
*** NOTE: SLC_mosaic_S1_TOPS has been replaced by SLC_mosaic_ScanSAR. The command line ***
*** options are unchanged, please consider renaming the program in your scripts.       ***
******************************************************************************************

*** Calculate SLC mosaic of ScanSAR SLC burst data (Sentinel-1, TerraSAR-X, RCM...) ***
*** Copyright 2022, Gamma Remote Sensing v4.7 10-Feb-2022 clw/awi/cm ***

usage: SLC_mosaic_ScanSAR <SLC_tab> <SLC> <SLC_par> <rlks> <azlks> [bflg] [SLCR_tab]

input parameters:
  SLC_tab    (input) 3 column list of ScanSAR SLC, swaths are listed in order from near to far range
               SLC_tab line entries:   SLC   SLC_par   TOPS_par
  SLC        (output) SLC mosaic image
  SLC_par    (output) SLC mosaic image parameter file
  rlks       number of range looks used to determine burst window boundaries for the mosaic
  azlks      number of azimuth looks used to determine burst window boundaries for the mosaic
  bflg       burst window calculation flag:
               0: use existing burst window parameters if they exist, otherwise calculate burst window parameters (default)
               1: calculate burst window parameters from burst parameters and the number of range and azimuth looks
  SLCR_tab   (input) 3 column list of the reference scene, swaths are listed in order from near to far range, enter - for none
               SLCR_tab line entries:   SLC   SLC_par   TOPS_par
             NOTE: When generating a mosaic of a resampled SLC, the SLC_tab of the reference scene is required
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `SLC_tab` | 输入：三列列表文件，按从近距到远距的顺序列出各子带 SLC，每行格式：`SLC  SLC_par  TOPS_par` |
| `SLC` | 输出：SLC mosaic 影像文件 |
| `SLC_par` | 输出：SLC mosaic 影像参数文件 |
| `rlks` | 距离向视数，用于确定 mosaic 的 burst 窗口边界 |
| `azlks` | 方位向视数，用于确定 mosaic 的 burst 窗口边界 |
| `bflg` | burst 窗口计算标志：`0` = 使用已有 burst 窗口参数，若无则计算（默认），`1` = 根据 burst 参数和视数重新计算 |
| `SLCR_tab` | 输入：参考场景的三列列表文件，格式同 SLC_tab，输入 `-` 表示无参考。注意：对重采样后的 SLC 做 mosaic 时必须提供参考场景的 SLC_tab |

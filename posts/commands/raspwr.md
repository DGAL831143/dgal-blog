---
title: raspwr
category: 可视化
summary: 使用幂律缩放和指定色彩映射，将浮点或短整型数据渲染为栅格图像。
---

**raspwr**

Calculate a raster image from data (FLOAT or UNSIGNED SHORT) with power-law scaling using a specified colormap.

使用幂律缩放和指定色彩映射，将 FLOAT 或 UNSIGNED SHORT 数据渲染为 BMP/RAS/TIFF 栅格图像。

## 帮助文档

```
*** DISP Program raspwr ***
*** Copyright 2020, Gamma Remote Sensing, v1.6 16-Jun-2022 clw/cm ***
*** Calculate a raster image from data (FLOAT or UNSIGNED SHORT) with power-law scaling using a specified colormap ***

usage: raspwr <data> <width> [start] [nlines] [pixavx] [pixavy] [scale] [exp] [cmap] [rasf] [dtype] [sc_ave]

input parameters:
  data    (input) data (FLOAT, UNSIGNED SHORT)
  width   number of samples/row of data
  start   starting line of data (enter - for default: 1)
  nlines  number of lines to display (enter - or 0 for default: to end of file)
  pixavx  number of pixels to average across (enter - for default: 1)
  pixavy  number of pixels to average down   (enter - for default: 1)
  scale   power-law display scale factor (enter - for default: 1.0)
  exp     power-law display exponent (enter - for default: 0.35)
  cmap    colormap file (enter - for default: gray.cm)
          NOTE: colormaps are text files in $DISP_HOME/cmaps, examples: cc.cm, rmg.cm, hls.cm, gray.cm, turbo.cm, BuYlRd.cm
                colormap swatches: $DISP_HOME/cmaps/*.png, $DISP_HOME/cmaps/cmocean/*.png, $DISP_HOME/colorcet/*.png
  rasf    (output) image filename, extension determines the format, enter - for default: *.bmp
            *.bmp BMP format
            *.ras Sun raster format
            *.tif TIFF format
  dtype   input data type (enter - for default)
            0: FLOAT (default)
            1: UNSIGNED SHORT
  sc_ave  average intensity used to scale image
          (enter - for default: determined from the data file)
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `data` | 输入：数据文件（FLOAT 或 UNSIGNED SHORT） |
| `width` | 数据每行的采样数 |
| `start` | 起始行号（默认：`1`） |
| `nlines` | 显示的行数（输入 `-` 或 `0` 表示到文件末尾） |
| `pixavx` | 水平方向平均像素数（默认：`1`） |
| `pixavy` | 垂直方向平均像素数（默认：`1`） |
| `scale` | 幂律缩放系数（默认：`1.0`） |
| `exp` | 幂律缩放指数（默认：`0.35`） |
| `cmap` | 色彩映射文件（默认：`gray.cm`），位于 `$DISP_HOME/cmaps/`，可选：`cc.cm`、`rmg.cm`、`hls.cm`、`turbo.cm`、`BuYlRd.cm` 等 |
| `rasf` | 输出：图像文件名，扩展名决定格式：`.bmp` / `.ras` / `.tif`（默认：`.bmp`） |
| `dtype` | 输入数据类型：`0` = FLOAT（默认），`1` = UNSIGNED SHORT |
| `sc_ave` | 用于缩放的参考平均强度（默认：从数据文件自动计算） |

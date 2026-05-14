---
title: rasdt_pwr
category: 可视化
summary: 使用指定色彩映射和线性缩放渲染 FLOAT 数据，叠加幂律缩放的强度图生成 8 位或 24 位栅格图像。
---

**rasdt_pwr**

Calculate a raster image of data (FLOAT) with linear scaling using a specified colormap combined with power-law scaled intensity (8 or 24-bits/pixel).

将 FLOAT 数据（形变、高程、解缠相位、相干性等）用线性缩放和色彩映射渲染，叠加幂律缩放的强度图背景，生成 8 位或 24 位彩色栅格图像。

## 帮助文档

```
*** DISP Program rasdt_pwr ***
*** Copyright 2021, Gamma Remote Sensing, v2.3 6-Dec-2021 clw/cm ***
*** Calculate a raster image of data (FLOAT) with linear scaling using a specified colormap combined with power-law scaled intensity (8 or 24-bits/pixel) ***

usage: rasdt_pwr <data> <pwr> <width> [start] [nlines] [pixavx] [pixavy] [min] [max] [cflg] [cmap] [rasf] [scale] [exp] [bits]

input parameters:
  data    (input) data in FLOAT format (deformation, height, unwrapped phase, correlation...)
  pwr     (input) intensity image coregistered with data (enter - for none, FLOAT or raster image)
  width   number of samples/row of data and pwr
  start   starting line of data and pwr (enter - for default: 1)
  nlines  number of lines to display (enter - or 0 for default: to end of file)
  pixavx  number of pixels to average across (enter - for default: 1)
  pixavy  number of pixels to average down   (enter - for default: 1)
  min     minimum data value (enter - for default:  0.0000e+00)
  max     maximum data value (enter - for default:  1.0000e+00)
  cflg    cyclic data display flag:
            0: display min <= data < max (default)
            1: display (data - min) modulo (max - min)
            2: autoscale between min and max value found in data
  cmap    colormap file (enter - for default: hls.cm)
          NOTE: colormaps are text files in $DISP_HOME/cmaps, examples: cc.cm, rmg.cm, hls.cm, gray.cm, turbo.cm, BuYlRd.cm
                colormap swatches: $DISP_HOME/cmaps/*.png, $DISP_HOME/cmaps/cmocean/*.png, $DISP_HOME/colorcet/*.png
  rasf    (output) image filename, extension determines the format, enter - for default: *.bmp
            *.bmp BMP format
            *.ras Sun raster format
            *.tif TIFF format
  scale   intensity display scale factor (enter - for default: 1.0)
  exp     intensity display exponent (enter - for default: 0.35)
  bits    bits/pixel:
            8:  8-bit indexed color map (default)
            24: RGB 8-bits/color
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `data` | 输入：FLOAT 格式数据（形变、高程、解缠相位、相干性等） |
| `pwr` | 输入：与 data 配准的强度图（输入 `-` 表示无，FLOAT 或栅格图像） |
| `width` | data 和 pwr 每行采样数 |
| `start` | 起始行（默认：`1`） |
| `nlines` | 显示的行数（输入 `-` 或 `0` 表示到文件末尾） |
| `pixavx` | 水平方向平均像素数（默认：`1`） |
| `pixavy` | 垂直方向平均像素数（默认：`1`） |
| `min` | 数据最小值（默认：`0.0`） |
| `max` | 数据最大值（默认：`1.0`） |
| `cflg` | 数据显示模式：`0` = 显示 min ≤ data < max（默认），`1` = 循环显示 (data-min) mod (max-min)，`2` = 自动缩放到数据范围 |
| `cmap` | 色彩映射文件（默认：`hls.cm`），位于 `$DISP_HOME/cmaps/`，可选：`cc.cm`、`rmg.cm`、`turbo.cm` 等 |
| `rasf` | 输出：图像文件名，扩展名决定格式：`.bmp` / `.ras` / `.tif`（默认：`.bmp`） |
| `scale` | 强度显示缩放系数（默认：`1.0`） |
| `exp` | 强度显示指数（默认：`0.35`） |
| `bits` | 每像素位数：`8` = 8 位索引色彩（默认），`24` = RGB 每通道 8 位 |

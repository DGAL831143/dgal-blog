---
title: rasshd
category: 可视化
summary: 从 DEM 数据生成 8 位山体阴影浮雕栅格图像。
---

**rasshd**

Generate 8-bit raster graphics image of DEM data as shaded relief.

从 DEM 数据生成 8 位山体阴影浮雕栅格图像，支持多角度光照和边缘保护。

## 帮助文档

```
*** DISP Program rasshd ***
*** Copyright 2022, Gamma Remote Sensing, v2.9 18-Nov-2022 uw/clw/cm ***
*** Generate 8-bit raster graphics image of DEM data as shaded relief ***

usage: rasshd <DEM> <width> <col_post> [row_post] [start] [nlines] [pixavx] [pixavy] [theta0] [phi0] [rasf] [dtype] [zflg] [scale] [exp] [illum_mode] [sharpness] [edge] [shade]

input parameters:
  DEM         (input) digital elevation model (FLOAT or SHORT integer)
  width       samples per row of DEM
  col_post    posting between cols (in meters)
  row_post    posting between rows (in meters, enter - for default: col_post)
  start       starting line of DEM (enter - for default: 1)
  nlines      number of lines to display (enter - or 0 for default: to end of file)
  pixavx      number of pixels to average (and decimate) in horizontal direction (enter - for default: 1)
  pixavy      number of pixels to average (and decimate) in vertical direction (enter - for default: 1)
  theta0      illumination elevation angle in deg. (enter - for default: 45.0)
  phi0        illumination orientation angle in deg. (enter - default: 135.0)
              (0.: right, 90: top, 180: left, 270: bottom)
  rasf        (output) image filename, extension determines the format, enter - for default: *.bmp
                *.bmp BMP format
                *.ras SUN raster format
                *.tif TIFF format
  dtype       DEM data type (enter - for default):
                0: FLOAT (default)
                1: SHORT integer
  zflg        zero data handling (enter - for default):
                0: 0.0 interpreted at missing value (default)
                1: 0.0 interpreted as valid data
  scale       power-law display scale factor (enter - for default: 1.0)
  exp         power-law display exponent (enter - for default: 1.00)
  illum_mode  illumination mode (enter - for default)
                0: single angle (default)
                1: multiple angle
  sharpness   shaded relief sharpness (scale from 0 to 9, enter - for default: 1)
  edge        edge protection (reduce artifacts at the edges and near no-data values, enter - for default)
                0: no (default)
                1: yes
  shade       (output) shaded relief intensity image (FLOAT) (enter - for none)
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `DEM` | 输入：数字高程模型（FLOAT 或 SHORT integer） |
| `width` | DEM 每行采样数 |
| `col_post` | 列方向像元间距（米） |
| `row_post` | 行方向像元间距（米，默认与 col_post 相同） |
| `start` | DEM 起始行（默认：`1`） |
| `nlines` | 显示的行数（输入 `-` 或 `0` 表示到文件末尾） |
| `pixavx` | 水平方向平均（抽稀）像素数（默认：`1`） |
| `pixavy` | 垂直方向平均（抽稀）像素数（默认：`1`） |
| `theta0` | 光照仰角（度，默认：`45.0`） |
| `phi0` | 光照方位角（度，默认：`135.0`），`0` = 右，`90` = 上，`180` = 左，`270` = 下 |
| `rasf` | 输出：图像文件名，扩展名决定格式：`.bmp` / `.ras` / `.tif`（默认：`.bmp`） |
| `dtype` | DEM 数据类型：`0` = FLOAT（默认），`1` = SHORT integer |
| `zflg` | 零值处理：`0` = 0.0 视为缺失值（默认），`1` = 0.0 视为有效数据 |
| `scale` | 幂律显示缩放系数（默认：`1.0`） |
| `exp` | 幂律显示指数（默认：`1.00`） |
| `illum_mode` | 光照模式：`0` = 单一角度（默认），`1` = 多角度 |
| `sharpness` | 阴影锐度（0-9，默认：`1`） |
| `edge` | 边缘保护（减少边缘和无效值附近的伪影）：`0` = 否（默认），`1` = 是 |
| `shade` | 输出：阴影强度影像（FLOAT），输入 `-` 表示不输出 |

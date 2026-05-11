---
title: geocode
category: 地理编码
summary: 前向地理编码，使用查找表将雷达坐标系数据重采样到地理坐标系。
---

**geocode**

Forward geocoding transformation using a lookup table.

前向地理编码转换，使用查找表将雷达坐标系（斜距/方位向）数据重采样到地理坐标系（经纬度/地图投影）。

## 帮助文档

```
*** Forward geocoding transformation using a lookup table ***
*** Copyright 2019, Gamma Remote Sensing, v4.3 12-Mar-2019 uw/clw/of/cm ***

usage: geocode <lookup_table> <data_in> <width_in> <data_out> <width_out> [nlines_out] [interp_mode] [dtype] [lr_in] [lr_out] [n_ovr] [rad_max] [nintr]

input parameters:
  lookup_table (input) lookup table containing pairs of real-valued output data coordinates
  data_in      (input) data file (format as specified by format_flag parameter)
  width_in     width of input data file and gc_map lookup table
  data_out     (output) output data file
  width_out    width of output data file
  nlines_out   number of lines for the output data file (enter - or 0 for default: all lines)
  interp_mode  resampling interpolation mode (enter - for default)
                 0: 1/dist (default)
                 1: nearest neighbor
                 2: SQR(1/dist)
                 3: constant
                 4: Gauss weighting
  dtype        input/output data type (enter - for default)
                 0: FLOAT (default)
                 1: FCOMPLEX
                 2: Sun/BMP/TIFF 8 or 24-bit raster image
                 3: UNSIGNED CHAR
                 4: SHORT
                 5: SCOMPLEX
                 6: DOUBLE
  lr_in        input Sun/BMP/TIFF raster image flipped left/right (enter - for default: 1: not flipped (default), -1: flipped)
  lr_out       output Sun/BMP/TIFF raster image flipped left/right (enter - for default: 1: not flipped (default), -1: flipped)
  n_ovr        interpolation oversampling factor (enter - for default: 2)
  rad_max      maximum interpolation search radius (enter - for default 4*n_ovr: 8)
  nintr        number of points required for interpolation when not nearest neighbor (enter - for default: 4)
```

## 参数翻译

| 参数           | 说明                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `lookup_table` | 输入：查找表，包含输出坐标与输入坐标的映射对                         |
| `data_in`      | 输入：待转换的数据文件                                               |
| `width_in`     | 输入数据文件的宽度（同时也是查找表的宽度）                           |
| `data_out`     | 输出：转换后的数据文件                                               |
| `width_out`    | 输出数据文件的宽度                                                   |
| `nlines_out`   | 输出行数（默认 0 = 全部）                                            |
| `interp_mode`  | 重采样插值模式：0=反距离加权（默认），1=最近邻，2=反距离平方，3=常数，4=高斯加权 |
| `dtype`        | 输入/输出数据类型：0=FLOAT（默认），1=FCOMPLEX，2=光栅图像，3=UCHAR，4=SHORT，5=SCOMPLEX，6=DOUBLE |
| `lr_in`        | 输入光栅图像左右翻转：1=不翻转（默认），-1=翻转                      |
| `lr_out`       | 输出光栅图像左右翻转：1=不翻转（默认），-1=翻转                      |
| `n_ovr`        | 插值过采样因子（默认 2）                                             |
| `rad_max`      | 最大插值搜索半径（默认 4×n_ovr = 8）                                 |
| `nintr`        | 非最近邻插值时所需的最小点数（默认 4）                               |

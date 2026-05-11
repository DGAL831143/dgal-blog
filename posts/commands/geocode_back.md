---
title: geocode_back
category: 地理编码
summary: Geocoding of image data using a geocoding lookup table (backward).
---

**geocode_back**

Geocoding of image data using a geocoding lookup table.

向后地理编码，使用查找表将雷达坐标系下的影像数据转换到地理坐标系（与 `geocode` 方向相反：geocode 是雷达→地理，geocode_back 是地理→雷达）。

## 帮助文档

```
*** Geocoding of image data using a geocoding lookup table ***
*** Copyright 2019, Gamma Remote Sensing, v4.8 22-Oct-2019 clw/uw/of/cm ***

usage: geocode_back <data_in> <width_in> <lookup_table> <data_out> <width_out> [nlines_out] [interp_mode] [dtype] [lr_in] [lr_out] [order] [e_flag]

input parameters:
  data_in       (input) data file (format as specified by format_flag parameter)
  width_in      width of input data file
  lookup_table  (input) lookup table containing pairs of real-valued input data coordinates
  data_out      (output) output data file
  width_out     width of gc_map lookup table, output file has the same width
  nlines_out    number of lines of output data file (enter - or 0 for default: number of lines in gc_map)
  interp_mode   interpolation mode (enter - for default)
                  0: nearest-neighbor
                  1: bicubic spline (default)
                  2: bicubic-log spline, interpolates log(data)
                  3: bicubic-sqrt spline, interpolates sqrt(data)
                  4: B-spline interpolation (default B-spline degree: 5)
                  5: B-spline interpolation sqrt(x) (default B-spline degree: 5)
                  6: Lanczos interpolation (default Lanczos function order: 5)
                  7: Lanczos interpolation sqrt(x) (default Lanczos function order: 5)
                NOTE: log and sqrt interpolation modes should only be used with non-negative data!
  dtype         input/output data type (enter - for default)
                  0: FLOAT (default)
                  1: FCOMPLEX
                  2: SUN/BMP/TIFF 8 or 24-bit raster image
                  3: UNSIGNED CHAR
                  4: SHORT
                  5: DOUBLE
  lr_in         input  SUN/BMP/TIFF raster image flipped left/right (enter - for default: 1: not flipped (default), -1: flipped)
  lr_out        output SUN/BMP/TIFF raster image flipped left/right (enter - for default: 1: not flipped (default), -1: flipped)
  order         Lanczos function order or B-spline degree (2->9) (enter - default: 5)
  e_flag        extrapolation flag (enter - for default)
                  0: do not extrapolate (default)
                  1: extrapolate up to 0.5 pixels beyond input edges

  NOTE: see documentation for information on recommended interpolation modes for different data types
```

## 参数翻译

| 参数           | 说明                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `data_in`      | 输入：待转换的数据文件                                               |
| `width_in`     | 输入数据文件的宽度                                                   |
| `lookup_table` | 输入：查找表，包含输入坐标与输出坐标的映射对                         |
| `data_out`     | 输出：转换后的数据文件                                               |
| `width_out`    | gc_map 查找表宽度（输出文件同宽）                                    |
| `nlines_out`   | 输出行数（默认 0 = 查找表行数）                                      |
| `interp_mode`  | 插值模式：0=最近邻，1=双三次样条（默认），2=双三次-log，3=双三次-sqrt，4=B样条，5=B样条-sqrt，6=Lanczos，7=Lanczos-sqrt |
| `dtype`        | 输入/输出数据类型：0=FLOAT（默认），1=FCOMPLEX，2=光栅图像，3=UCHAR，4=SHORT，5=DOUBLE |
| `lr_in`        | 输入光栅图像左右翻转：1=不翻转（默认），-1=翻转                      |
| `lr_out`       | 输出光栅图像左右翻转：1=不翻转（默认），-1=翻转                      |
| `order`        | Lanczos 函数阶数或 B 样条阶数（2~9，默认 5）                         |
| `e_flag`       | 外推标识：0=不外推（默认），1=边缘外推 0.5 像素                      |

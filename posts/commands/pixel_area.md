---
title: pixel_area
category: 地理编码
summary: 计算斜距几何下基于地形的 sigma0 和 gamma0 归一化面积。
---

**pixel_area**

Calculate terrain-based sigma0 and gamma0 normalization area in slant-range geometry.

计算斜距几何下基于地形的 sigma0 和 gamma0 归一化面积，用于辐射校正。

## 帮助文档

```
*** Calculate terrain-based sigma0 and gammma0 normalization area in slant-range geometry ***
*** Copyright 2022, Gamma Remote Sensing, v3.1 6-Apr-2022 of/clw/uw/cm ***

usage: pixel_area <MLI_par> <DEM_par> <DEM> <lookup_table> <ls_map> <inc_map> <pix_sigma0> [pix_gamma0] [nstep] [area_fact] [sigma0_ratio] [gamma0_ratio] [sig2gam_ratio] [hgt]

input parameters:
  MLI_par       (input) ISP MLI or SLC image parameter file (slant-range geometry)
  DEM_par       (input) DEM/MAP parameter file
  DEM           (input) DEM data file (or constant height value)
  lookup_table  (input) geocoding lookup table (FCOMPLEX)
  ls_map        (input) layover and shadow map in map geometry
  inc_map       (input) local incidence angle map in map geometry (enter - for none)
                NOTE: required for calculation of pix_gamma0, gamma0_ratio, and sig2gam_ratio
  pix_sigma0    (output) sigma0 normalization area in RDC geometry (enter - for none)
  pix_gamma0    (output) gamma0 normalization area in RDC geometry (enter - for none)
  nstep         number of steps to divide each dimension of the map pixels (enter - for default: 16)
  area_fact     area factor that is multiplied with the rg/az pixel size to set a lower
                threshold for the minimal pixel area that is accepted (enter - for default: 1.00)
  sigma0_ratio  (output) ratio between ellipsoid and DEM-based sigma0 normalization areas (enter - for none)
  gamma0_ratio  (output) ratio between ellipsoid and DEM-based gamma0 normalization areas (enter - for none)
  sig2gam_ratio (output) ratio of ellipsoid sigma0 and DEM-based gamma0 normalization areas (enter - for none)
  hgt           (output) height map in RDC geometry (enter - for none)
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `MLI_par` | 输入：ISP MLI 或 SLC 影像参数文件（斜距几何） |
| `DEM_par` | 输入：DEM/MAP 参数文件 |
| `DEM` | 输入：DEM 数据文件（或常量高度值） |
| `lookup_table` | 输入：地理编码查找表（FCOMPLEX） |
| `ls_map` | 输入：地图几何下的叠掩阴影图 |
| `inc_map` | 输入：地图几何下的局部入射角图（输入 `-` 表示无），计算 pix_gamma0 / gamma0_ratio / sig2gam_ratio 时必须提供 |
| `pix_sigma0` | 输出：RDC 几何下的 sigma0 归一化面积（输入 `-` 表示不输出） |
| `pix_gamma0` | 输出：RDC 几何下的 gamma0 归一化面积（输入 `-` 表示不输出） |
| `nstep` | 每个地图像素维度的细分步数（默认：`16`） |
| `area_fact` | 面积因子，与距离/方位像元大小相乘，设定接受的最小像元面积阈值（默认：`1.00`） |
| `sigma0_ratio` | 输出：椭球面与 DEM 基准 sigma0 归一化面积之比（输入 `-` 表示不输出） |
| `gamma0_ratio` | 输出：椭球面与 DEM 基准 gamma0 归一化面积之比（输入 `-` 表示不输出） |
| `sig2gam_ratio` | 输出：椭球面 sigma0 与 DEM 基准 gamma0 归一化面积之比（输入 `-` 表示不输出） |
| `hgt` | 输出：RDC 几何下的高度图（输入 `-` 表示不输出） |

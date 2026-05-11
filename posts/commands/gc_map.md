---
title: gc_map
category: 地理编码
summary: Calculate terrain-geocoding lookup table and DEM derived data products.
---

**gc_map**

Calculate terrain-geocoding lookup table and DEM derived data products.

计算地形地理编码查找表及 DEM 衍生数据产品，生成粗查找表（lookup table）、模拟 SAR 强度图、局部入射角等。

## 帮助文档

```
*** /usr/local/GAMMA_SOFTWARE-20221129/DIFF/scripts/gc_map ***
*** Calculate terrain-geocoding lookup table and DEM derived data products ***
*** Copyright 2021, Gamma Remote Sensing, v1.2 25-Jan-2021 cm/clw/uw ***

usage: /usr/local/GAMMA_SOFTWARE-20221129/DIFF/scripts/gc_map <MLI_par> <OFF_par> <DEM_par> <DEM> <DEM_seg_par> <DEM_seg> <lookup_table> [lat_ovr] [lon_ovr] [sim_sar] [u] [v] [inc] [psi] [pix] [ls_map] [frame] [ls_mode] [r_ovr]

input parameters:
  MLI_par         (input) ISP MLI or SLC image parameter file (slant range geometry)
  OFF_par         (input) ISP offset/interferogram parameter file (enter - if geocoding SLC or MLI data)
  DEM_par         (input) DEM/MAP parameter file
  DEM             (input) DEM data file (or constant height value)
  DEM_seg_par     (input/output) DEM/MAP segment parameter file used for output products

  NOTE: If <DEM_seg_par> already exists, then the output DEM parameters will be read
        from this file, otherwise they are estimated from the image data.
        If <DEM_par> and <DEM_seg_par> are the same file, <DEM_seg> is ignored.

  DEM_seg         (output) DEM segment used for output products, interpolated if lat_ovr > 1.0 or lon_ovr > 1.0
  lookup_table    (output) geocoding lookup table (fcomplex)
  lat_ovr         latitude or northing output DEM oversampling factor (enter - for default: 1.0)
  lon_ovr         longitude or easting output DEM oversampling factor (enter - for default: 1.0)
  sim_sar         (output) simulated SAR backscatter image in DEM geometry (enter - for none)
  u               (output) zenith angle of surface normal vector n (angle between z and n, enter - for none)
  v               (output) orientation angle of n (between x and projection of n in xy plane, enter - for none)
  inc             (output) local incidence angle (between surface normal and look vector, enter - for none)
  psi             (output) projection angle (between surface normal and image plane normal, enter - for none)
  pix             (output) pixel area normalization factor  (enter - for none)
  ls_map          (output) layover and shadow map (in map projection, enter - for none)
  frame           number of DEM pixels to add around area covered by SAR image (enter - for default = 8)
  ls_mode         output lookup table values in regions of layover, shadow, or DEM gaps (enter - for default)
                    0: set to (0.,0.)
                    1: linear interpolation across these regions (not available in gc_map2)
                    2: actual value (default)
                    3: nn-thinned (not available in gc_map2)
  r_ovr           range over-sampling factor for nn-thinned layover/shadow mode (enter - for default: 2.0)

*************************************************************************************************
*** NOTE: This script accepts the syntax of the initial version of gc_map (now named gc_map1) ***
*** while calling gc_map2 for performing the calculations. gc_map2 produces more accurate     ***
*** layover and shadow maps, as well as incidence angle maps and its derived products such as ***
*** the simulated SAR image. We recommend directly calling gc_map2. When prefered, the        ***
*** initial version of gc_map can still be used by calling gc_map1.                           ***
*************************************************************************************************
```

## 参数翻译

| 参数            | 说明                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `MLI_par`       | 输入：ISP MLI 或 SLC 影像参数文件（斜距几何）                        |
| `OFF_par`       | 输入：ISP 偏移/干涉参数文件（若直接地理编码 SLC/MLI 则输入 `-`）     |
| `DEM_par`       | 输入：DEM/MAP 参数文件                                               |
| `DEM`           | 输入：DEM 数据文件（或常数值高度）                                   |
| `DEM_seg_par`   | 输入/输出：输出产品使用的 DEM/MAP 分段参数文件                       |
| `DEM_seg`       | 输出：输出产品使用的 DEM 分段，若 oversampling>1 则插值生成          |
| `lookup_table`  | 输出：地理编码查找表（fcomplex 格式）                                |
| `lat_ovr`       | 纬度/北向输出 DEM 过采样因子（默认 1.0）                             |
| `lon_ovr`       | 经度/东向输出 DEM 过采样因子（默认 1.0）                             |
| `sim_sar`       | 输出：DEM 几何下的模拟 SAR 后向散射图（可选）                        |
| `u`             | 输出：表面法向量天顶角（z 与 n 夹角，可选）                          |
| `v`             | 输出：法向量方位角（x 与 n 在 xy 面投影的夹角，可选）                |
| `inc`           | 输出：局部入射角（表面法向量与视线方向夹角，可选）                   |
| `psi`           | 输出：投影角（表面法向量与影像平面法向量夹角，可选）                 |
| `pix`           | 输出：像元面积归一化因子（可选）                                     |
| `ls_map`        | 输出：叠掩与阴影图（地图投影坐标，可选）                             |
| `frame`         | SAR 影像覆盖区外围额外添加的 DEM 像元数（默认 8）                    |
| `ls_mode`       | 叠掩/阴影/DEM 空洞区的查找表输出方式：0=置零，1=线性插值，2=实际值（默认），3=最邻近剔除 |
| `r_ovr`         | 最邻近剔除模式下的距离向过采样因子（默认 2.0）                       |

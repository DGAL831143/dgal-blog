---
title: dem_import
category: DEM 导入
summary: 将原始 DEM 文件转换为 GAMMA 二进制格式，支持大地水准面高到椭球高的转换。
---

**dem_import**

Convert original DEM file format into Gamma format, transform geoid heights into ellipsoid heights.

将原始 DEM 文件转换为 GAMMA 二进制格式，并可将大地水准面高转换为椭球高。

## 帮助文档

```
*** Convert original DEM file format into Gamma format, transform geoid heights into ellipsoid heights ***
*** Copyright 2022, Gamma Remote Sensing, v3.8 1-Sep-2022 cm/cw ***

usage: dem_import <input_DEM> <DEM> <DEM_par> [input_type] [priority] [geoid] [geoid_par] [geoid_type] [latN_shift] [lonE_shift] [zflg] [no_data] [GTF_direct]

input parameters:
  input_DEM   (input) input DEM in original file format
  DEM         (output) DEM in binary format (float, enter - for none)
  DEM_par     (input/output) DEM parameter file corresponding to output DEM

  NOTE: if the DEM_par file does not exist and input_type is 0, 1, or 2, dem_import will try to
        automatically extract the ellipsoid, datum, and map projection parameters.

  input_type  input DEM type: (enter - for default)
                0: GeoTIFF or any other GDAL supported raster format (default)
                1: xyz triplets
                2: ascii grid (ESRI)
                3: UZH RSL (a pair of *.dem and *.dem.hdr files)
                4: Gamma binary file (to convert geoid height to ellipsoid height)

  priority    priority flag: (enter - for default)
                0: DEM_par parameters have priority
                1: input DEM parameters have priority (default)

  geoid       (input) geoid or constant geoid height value (enter - for none)
  geoid_par   (input) geoid DEM_par file (enter - for none)
  geoid_type  geoid type: (enter - for default)
                0: global geoid in EQA coordinates (default)
                1: local geoid in the same coordinate system as the DEM

  latN_shift  latitude or Northing constant shift (degree / meter, enter - for default: 0.0)
  lonE_shift  longitude or Easting constant shift (degree / meter, enter - for default: 0.0)
  zflg        interpretation of no_data values: (enter - for default)
                0: kept as no_data (0.0) in output (default)
                1: converted to valid near-zero values
  no_data     no_data value in input file (enter - for default: from metadata or 0.0)
  GTF_direct  direction of GeoTIFF reading: (enter - for default)
                0: vertically
                1: horizontally (default)
```

## 参数翻译

| 参数         | 说明                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| `input_DEM`  | 输入：原始格式的 DEM 文件                                                                  |
| `DEM`        | 输出：Gamma 二进制格式 DEM（float 类型，输入 `-` 跳过）                                    |
| `DEM_par`    | 输入/输出：对应的 DEM 参数文件                                                             |
| `input_type` | 输入 DEM 类型：0=GeoTIFF（默认），1=xyz 三列，2=ASCII grid，3=UZH RSL 格式，4=Gamma 二进制 |
| `priority`   | 优先级：0=DEM_par 参数优先，1=输入 DEM 参数优先（默认）                                    |
| `geoid`      | 输入：大地水准面文件或常数值（可选）                                                       |
| `geoid_par`  | 输入：大地水准面参数文件（可选）                                                           |
| `geoid_type` | 大地水准面类型：0=EQA 坐标全局（默认），1=与 DEM 同坐标系的本地水准面                      |
| `latN_shift` | 纬度/北向偏移量（度/米，默认 0.0）                                                         |
| `lonE_shift` | 经度/东向偏移量（度/米，默认 0.0）                                                         |
| `zflg`       | 无效值处理：0=保留为 0.0（默认），1=转换为有效近零值                                       |
| `no_data`    | 输入文件中的无效值（默认从元数据读取或 0.0）                                               |
| `GTF_direct` | GeoTIFF 读取方向：0=垂直，1=水平（默认）                                                   |

## 用法示例

```bash
dem_import demo.dem.tif demo.dem demo.dem.par 0 1
```

含义：输入 GeoTIFF 格式的 `demo.dem.tif`，输出 Gamma 格式的 `demo.dem` 和 `demo.dem.par`，优先使用输入文件自身的投影参数。

> **注意**：大地水准面用于将 DEM 高度从海拔高转换为椭球高。GAMMA 自带 EGM96 和 EGM2008 全球水准面文件，位于 `$DIFF_HOME/scripts/` 目录下。

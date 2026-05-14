---
title: S1_import_SLC_from_zipfiles
category: Sentinel-1 数据预处理
summary: 从 Sentinel-1 TOPS SLC 压缩包中读取并拼接数据，生成 GAMMA 格式的 SLC 文件及配套参数文件。
---

**S1_import_SLC_from_zipfiles**

Script to read in and concatenate S1 TOPS SLC from zip files.

从 Sentinel-1 TOPS SLC 压缩包中读取并拼接数据，生成 GAMMA 格式的 SLC 文件及配套参数文件。

## 帮助文档

````
*** S1_import_SLC_from_zipfiles: Script to read in and concatenate S1 TOPS SLC from zip files ***
*** Copyright 2021 Gamma Remote Sensing, v2.1 22-Mar-2021 uw/cm ***

usage: S1_import_SLC_from_zipfiles <zipfile_list> [burst_number_table_ref] [pol] [dtype] [swath_flag] [OPOD_dir] [cleaning] [noise_mode]
       zipfile_list            (input) ASCII file containing S1 zip filename(s) of one data take (one per line, in correct sequence)
       burst_number_table_ref  (input) ASCII file containing first/last burst numbers selected
                               indicate - to use all bursts present in the indicated zipfiles
       pol                     polarization flag (default: -, other values are vv, vh, hh, hv)
                               indicate - to use all polarizations available in the indicated zipfiles
       dtype                   output data type: default = 0: FCOMPLEX, 1: SCOMPLEX
       swath_flag              flag to select sub-swaths to read (default = 0 (as listed in burst_number_table_ref, all if no
                               burst_number_table_ref provided), 1,2,3 (1 sub-swath only), 4 (1&2), 5 (2&3)
       OPOD_dir                directory with OPOD state vector files (default: .)
       cleaning                flag to indicate if intermediate files are deleted (default = 1: deleted, 0: not deleted)
       noise_mode              noise mode (default = 1: apply noise correction, 2: do not apply and write out noise file

resulting files: burst SLC files (per polarization, with SLC_tab, SLC, SLC_par, TOPS_par and optionally SLC.noise)
(concatenated, empty bursts added where necessary) at selected polarizations
````

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `zipfile_list` | 输入：ASCII 文本文件，每行一个 S1 zip 文件名，按时间顺序排列 |
| `burst_number_table_ref` | 输入：包含选定 burst 起止编号的 ASCII 文件，输入 `-` 则使用所有可用 burst |
| `pol` | 极化选择（默认：`-`，使用所有可用极化），可选值：`vv` / `vh` / `hh` / `hv` |
| `dtype` | 输出数据类型：`0` = FCOMPLEX（浮点复数，默认），`1` = SCOMPLEX（短整型复数） |
| `swath_flag` | 子带选择标志：`0` = 按 burst_number_table_ref 选择（默认），`1` = 仅 IW1，`2` = 仅 IW2，`3` = 仅 IW3，`4` = IW1+IW2，`5` = IW2+IW3 |
| `OPOD_dir` | OPOD 轨道状态向量文件所在目录（默认：当前目录 `.`） |
| `cleaning` | 中间文件清理标志：`1` = 删除中间文件（默认），`0` = 保留中间文件 |
| `noise_mode` | 噪声校正模式：`1` = 应用噪声校正（默认），`2` = 不校正并输出噪声文件 |

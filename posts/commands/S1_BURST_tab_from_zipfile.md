---
title: S1_BURST_tab_from_zipfile
category: Sentinel-1 数据预处理
summary: 生成 S1_BURST_tab 文件，支持 Sentinel-1 TOPS SLC 数据的 burst 选择与批量处理。
---

**S1_BURST_tab_from_zipfile**

Script used to generate S1_BURST_tab to support burst selection.

生成 S1_BURST_tab 文件，用于支持 Sentinel-1 TOPS SLC 数据的 burst 选择。

## 帮助文档

```
*** S1_BURST_tab_from_zipfile: Script used to generate S1_BURST_tab to support burst selection ***
*** Copyright 2021 Gamma Remote Sensing, v1.8 26-Jan-2021 uw/cm ***

******************************************************************************
*** NOTE: S1_BURST_tab_from_zipfile now calls S1_BURST_tab_from_zipfile.py ***
***       Using directly S1_BURST_tab_from_zipfile.py gives access to      ***
***       additional useful options and is therefore recommended.          ***
******************************************************************************

usage: S1_BURST_tab_from_zipfile <zipfile_list> <zipfile_ref> [burst_number_table_ref] [cleaning]
       zipfile_list           (input) ASCII file containing S1 zip filename(s) of one data take
                              indicate - to generate burst_number_table of reference TOPS SLC
       zipfile_ref            (input) S1 zip filename for the reference TOPS SLC
       burst_number_table_ref (input) ASCII file containing first/last burst numbers selected
                              indicate - to use all bursts as present in the reference TOPS SLC zipfile
       cleaning               flag to indicate if intermediate files are deleted (default=1: yes, 0: not deleted)

intermediate and output filenames are generated based on the zip file names.
```

## 参数翻译

| 参数 | 说明 |
| ---- | ---- |
| `zipfile_list` | 输入：ASCII 文本文件，包含单次数据获取的 S1 zip 文件名，输入 `-` 则仅生成参考 TOPS SLC 的 burst 编号表 |
| `zipfile_ref` | 输入：作为参考的 Sentinel-1 TOPS SLC zip 文件名 |
| `burst_number_table_ref` | 输入：包含选定 burst 起止编号的 ASCII 文件，输入 `-` 则使用参考 TOPS SLC zip 中的所有 burst |
| `cleaning` | 中间文件删除标志：`1` = 删除（默认），`0` = 不删除 |

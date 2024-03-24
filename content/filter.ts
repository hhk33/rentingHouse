import { filterItemType } from '@/types/search'

export const filter: filterItemType[] = [
  {
    title: "租金",
    titleEn: 'price',
    show: true,
    options: [
      { id: "pr01", label: "≤1000元" },
      { id: "pr02", label: "1000-1500元" },
      { id: "pr03", label: "1500-2000元" },
      { id: "pr04", label: "2000-3000元" },
      { id: "pr05", label: "3000-4500元" },
      { id: "pr06", label: "≥4500元" }
    ]
  },
  {
    title: "户型",
    titleEn: 'type',
    show: true,
    options: [
      { id: "1", label: "一居" },
      { id: "2", label: "二居" },
      { id: "3", label: "三居" },
      { id: "4", label: "四居+" }
    ]
  },
  {
    title: "朝向",
    titleEn: 'toward',
    show: true,
    options: [
      { id: "东", label: "东" },
      { id: "南", label: "南" },
      { id: "西", label: "西" },
      { id: "北", label: "北" },
      { id: "南/北", label: "南/北" },
    ]
  },
  {
    title: "面积",
    titleEn: 'area',
    show: true,
    options: [
      { id: "01", label: "≤40m²" },
      { id: "02", label: "40-60m²" },
      { id: "03", label: "60-80m²" },
      { id: "04", label: "80-100m²" },
      { id: "05", label: "100-120m²" },
      { id: "06", label: "≥120m²" },
    ]
  },
  {
    title: "特点",
    titleEn: 'feature',
    show: false,
    options: [
      { id: "01", label: "新上" },
      { id: "02", label: "精装修" },
      { id: "03", label: "认证公寓" },
      { id: "04", label: "VR看房" },
    ]
  },
  {
    title: "付款方式",
    titleEn: 'tenancy',
    show: false,
    options: [
      { id: "00", label: "月付" },
      { id: "01", label: "季付" },
      { id: "02", label: "年付" },
    ]
  },
  {
    title: "楼层",
    titleEn: 'floor',
    show: false,
    options: [
      { id: "00", label: "低楼层" },
      { id: "01", label: "中楼层" },
      { id: "02", label: "高楼层" },
    ]
  },
  {
    title: "电梯",
    titleEn: 'elevator',
    show: false,
    options: [
      { id: "01", label: "有电梯" },
      { id: "00", label: "无电梯" },
    ]
  }
]
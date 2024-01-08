import { filterItemType } from '@/types/search'

export const filter: filterItemType[] = [
  {
    title: "方式",
    titleEn: 'way',
    show: true,
    options: [
      { id: "wa01", label: "不限" },
      { id: "wa02", label: "整租" },
      { id: "wa03", label: "合租" }
    ]
  },
  {
    title: "租金",
    titleEn: 'price',
    show: true,
    options: [
      { id: "pr01", label: "≤1000元" },
      { id: "pr02", label: "1000-1500元" },
      { id: "pr03", label: "1500-2000元" },
      { id: "pr04", label: "2000-3000元" },
      { id: "pr05", label: "30000-4500元" },
      { id: "pr06", label: "4500元" }
    ]
  },
  {
    title: "户型",
    titleEn: 'type',
    show: true,
    options: [
      { id: "ty01", label: "一居" },
      { id: "ty02", label: "二居" },
      { id: "ty03", label: "三居" },
      { id: "ty04", label: "四居+" }
    ]
  },
  {
    title: "朝向",
    titleEn: 'toward',
    show: true,
    options: [
      { id: "to01", label: "东" },
      { id: "to02", label: "南" },
      { id: "to03", label: "西" },
      { id: "to04", label: "北" },
      { id: "to05", label: "南北" },
    ]
  },
  {
    title: "面积",
    titleEn: 'area',
    show: true,
    options: [
      { id: "ar01", label: "≤40m²" },
      { id: "ar02", label: "40-60m²" },
      { id: "ar03", label: "60-80m²" },
      { id: "ar04", label: "80-100m²" },
      { id: "ar05", label: "100-120m²" },
      { id: "ar06", label: "≥120m²" },
    ]
  },
  {
    title: "特点",
    titleEn: 'feature',
    show: false,
    options: [
      { id: "fe01", label: "近地铁" },
      { id: "fe02", label: "拎包入住" },
      { id: "fe03", label: "精装修" },
      { id: "fe04", label: "押一付一" },
      { id: "fe05", label: "随时看房" },
      { id: "fe06", label: "新上" },
      { id: "fe07", label: "VR看房" },
      { id: "fe08", label: "房东直租" },
    ]
  },
  {
    title: "租期",
    titleEn: 'tenancy',
    show: false,
    options: [
      { id: "te01", label: "月租" },
      { id: "te02", label: "年租" },
      { id: "te03", label: "一个月起租" },
    ]
  },
  {
    title: "楼层",
    titleEn: 'floor',
    show: false,
    options: [
      { id: "fl01", label: "低楼层" },
      { id: "fl02", label: "中楼层" },
      { id: "fl03", label: "高楼层" },
    ]
  },
  {
    title: "电梯",
    titleEn: 'elevator',
    show: false,
    options: [
      { id: "el01", label: "有电梯" },
      { id: "el02", label: "无电梯" },
    ]
  }
]
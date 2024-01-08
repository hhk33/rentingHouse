export interface PriceFormType {
  options: string[],
  range: {
    maxn: number | null,
    minn: number | null
  }
}

export interface moreFormType {
  toward: string[],
  area: string[],
  feature: string[],
  tenancy: string[],
  floor: string[],
  elevator: string[]
}

export interface filterItemType {
  title: string,
  titleEn: string,
  show: boolean,
  options: Array<{id: string, label: string}>
}
import { RankingValueType } from 'utils/table/calcRankingValues'

const generateTableX = (
  title: string,
  bestValues: RankingValueType[],
  worstValues: RankingValueType[]
) => {
  // 色の配列
  const bestColors = ['#1abc9c', '#16a085', '#27ae60', '#2ecc71', '#3498db']
  const worstColors = ['#e74c3c', '#c0392b', '#d35400', '#e67e22', '#f39c12']

  // 全データの最大値を取得
  const allValues = [...bestValues, ...worstValues]
  const maxValue = Math.max(...allValues.map((item) => item.value))

  // グラフバーを生成する関数
  const generateBars = (
    data: RankingValueType[],
    colors: string[],
    yOffset: number
  ) => {
    return data
      .map((item, index) => {
        const width = (item.value / maxValue) * 550 // グラフの最大幅を調整
        const y = yOffset + index * 70
        return `
        <rect x="220" y="${y}" width="${width}" height="50" fill="${colors[index]}"/>
        <text x="210" y="${y + 30}" text-anchor="end" class="label">${item.areaName}</text>
        <text x="${220 + width + 10}" y="${y + 30}" class="value">${item.value.toLocaleString()}</text>
        <text x="${220 + width + 10}" y="${y + 30}" dx="${item.value.toLocaleString().length * 9 + 5}" class="unit">${item.unit}</text>
      `
      })
      .join('')
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
      <style>
        text { font-family: Arial, sans-serif; }
        .title { font-size: 40px; font-weight: bold; fill: #2c3e50; }
        .subtitle { font-size: 30px; font-weight: bold; fill: #34495e; }
        .label { font-size: 18px; font-weight: bold; fill: #2c3e50; }
        .value { font-size: 16px; font-weight: bold; fill: #34495e; }
        .unit { font-size: 12px; fill: #7f8c8d; }
      </style>

      <rect width="100%" height="100%" fill="#ecf0f1"/>

      <!-- 外枠の追加 -->
      <rect x="0" y="0" width="1080" height="1080" fill="none" stroke="#0047AB" stroke-width="10"/>

      <text x="540" y="60" text-anchor="middle" class="title">${title}</text>
      <text x="540" y="120" text-anchor="middle" class="title">都道府県ランキング</text>

      <!-- ベスト5 グループ -->
      <rect x="90" y="170" width="900" height="420" fill="#ffffff" stroke="#bdc3c7" stroke-width="2"/>
      <text x="540" y="210" text-anchor="middle" class="subtitle">ベスト5</text>
      ${generateBars(bestValues, bestColors, 240)}

      <!-- ワースト5 グループ -->
      <rect x="90" y="610" width="900" height="420" fill="#ffffff" stroke="#bdc3c7" stroke-width="2"/>
      <text x="540" y="650" text-anchor="middle" class="subtitle">ワースト5</text>
      ${generateBars(worstValues, worstColors, 680)}
    </svg>
  `
}

export default generateTableX

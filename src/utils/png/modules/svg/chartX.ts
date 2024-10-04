import { RankingValueType } from 'utils/value/modules/calcRankingValues'

const generateChartX = (
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
  const generateBars = (data: RankingValueType[], colors: string[]) => {
    return data
      .map((item, index) => {
        const height = (item.value / maxValue) * 300
        const y = 340 - height // グラフの下端を340に設定
        const barRight = 90 * index + 70 // バーの右端のx座標
        return `
        <rect x="${90 * index}" y="${y}" width="70" height="${height}" fill="${colors[index]}"/>
        <text x="${90 * index + 35}" y="375" text-anchor="middle" class="label">${item.areaName}</text>
        <text x="${barRight}" y="${y - 30}" text-anchor="end" class="unit">${item.unit}</text>
        <text x="${barRight}" y="${y - 10}" text-anchor="end" class="value">${item.value.toLocaleString()}</text>
      `
      })
      .join('')
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <style>
        text { font-family: Arial, sans-serif; }
        .title { font-size: 36px; font-weight: bold; fill: #2c3e50; }
        .subtitle { font-size: 22px; font-weight: bold; fill: #34495e; }
        .label { font-size: 14px; font-weight: bold; fill: #2c3e50; }
        .value { font-size: 16px; font-weight: bold; fill: #34495e; }
        .unit { font-size: 10px; fill: #7f8c8d; }
      </style>

      <rect width="100%" height="100%" fill="#ecf0f1"/>

      <!-- 外枠の追加 -->
      <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#0047AB" stroke-width="10"/>

      <text x="600" y="80" text-anchor="middle" class="title">${title}</text>

      <!-- ベスト5 グループ -->
      <rect x="75" y="130" width="500" height="440" fill="#ffffff" stroke="#bdc3c7" stroke-width="2"/>
      <text x="325" y="160" text-anchor="middle" class="subtitle">ベスト5</text>
      <g transform="translate(95, 180)">
        ${generateBars(bestValues, bestColors)}
      </g>

      <!-- ワースト5 グループ -->
      <rect x="625" y="130" width="500" height="440" fill="#ffffff" stroke="#bdc3c7" stroke-width="2"/>
      <text x="875" y="160" text-anchor="middle" class="subtitle">ワースト5</text>
      <g transform="translate(645, 180)">
        ${generateBars(worstValues, worstColors)}
      </g>
    </svg>
  `
}

export default generateChartX

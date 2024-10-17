const generateTableX = () => {
  return `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
  <style>
    .title { font: bold 40px sans-serif; fill: #ffffff; }
    .subtitle { font: 22px sans-serif; fill: #ffffff; }
    .label { font: bold 18px sans-serif; fill: #ffffff; }
    .value { font: 18px sans-serif; text-anchor: end; fill: #ffffff; }
    .rank { font: bold 20px sans-serif; text-anchor: middle; fill: #ffffff; }
    .row:nth-child(even) { fill: #3a506b; }
    .row:nth-child(odd) { fill: #1c2541; }
  </style>

  <rect width="100%" height="100%" fill="#0b132b"/>

  <text x="540" y="50" class="title" text-anchor="middle">都道府県別製造品出荷額等/製造業従業者数ランキング</text>
  <text x="540" y="85" class="subtitle" text-anchor="middle">2021年度 全47都道府県 (単位: 万円/人)</text>

  <g transform="translate(20, 110)">
    <rect x="0" y="0" width="1040" height="1790" fill="#1c2541" stroke="#5bc0be"/>

    <text x="30" y="35" class="label">順位</text>
    <text x="90" y="35" class="label">都道府県</text>
    <text x="270" y="35" class="label">値</text>

    <text x="550" y="35" class="label">順位</text>
    <text x="610" y="35" class="label">都道府県</text>
    <text x="790" y="35" class="label">値</text>

    <line x1="0" y1="50" x2="1040" y2="50" stroke="#5bc0be" stroke-width="2"/>

    <!-- Left column -->
    <g transform="translate(0, 70)">
      <g class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">1</text><text x="90" y="20" class="label">大分県</text><text x="270" y="20" class="value">7308</text></g>
      <g transform="translate(0, 72)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">2</text><text x="90" y="20" class="label">山口県</text><text x="270" y="20" class="value">6979</text></g>
      <g transform="translate(0, 144)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">3</text><text x="90" y="20" class="label">千葉県</text><text x="270" y="20" class="value">6357</text></g>
      <g transform="translate(0, 216)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">4</text><text x="90" y="20" class="label">愛媛県</text><text x="270" y="20" class="value">6177</text></g>
      <g transform="translate(0, 288)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">5</text><text x="90" y="20" class="label">愛知県</text><text x="270" y="20" class="value">5930</text></g>
      <g transform="translate(0, 360)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">6</text><text x="90" y="20" class="label">岡山県</text><text x="270" y="20" class="value">5667</text></g>
      <g transform="translate(0, 432)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">7</text><text x="90" y="20" class="label">三重県</text><text x="270" y="20" class="value">5473</text></g>
      <g transform="translate(0, 504)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">8</text><text x="90" y="20" class="label">茨城県</text><text x="270" y="20" class="value">5179</text></g>
      <g transform="translate(0, 576)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">9</text><text x="90" y="20" class="label">神奈川県</text><text x="270" y="20" class="value">4988</text></g>
      <g transform="translate(0, 648)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">10</text><text x="90" y="20" class="label">滋賀県</text><text x="270" y="20" class="value">4953</text></g>
      <g transform="translate(0, 720)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">11</text><text x="90" y="20" class="label">広島県</text><text x="270" y="20" class="value">4786</text></g>
      <g transform="translate(0, 792)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">12</text><text x="90" y="20" class="label">兵庫県</text><text x="270" y="20" class="value">4744</text></g>
      <g transform="translate(0, 864)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">13</text><text x="90" y="20" class="label">和歌山県</text><text x="270" y="20" class="value">4718</text></g>
      <g transform="translate(0, 936)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">14</text><text x="90" y="20" class="label">徳島県</text><text x="270" y="20" class="value">4626</text></g>
      <g transform="translate(0, 1008)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">15</text><text x="90" y="20" class="label">宮城県</text><text x="270" y="20" class="value">4476</text></g>
      <g transform="translate(0, 1080)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">16</text><text x="90" y="20" class="label">大阪府</text><text x="270" y="20" class="value">4453</text></g>
      <g transform="translate(0, 1152)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">17</text><text x="90" y="20" class="label">栃木県</text><text x="270" y="20" class="value">4395</text></g>
      <g transform="translate(0, 1224)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">18</text><text x="90" y="20" class="label">静岡県</text><text x="270" y="20" class="value">4303</text></g>
      <g transform="translate(0, 1296)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">19</text><text x="90" y="20" class="label">福岡県</text><text x="270" y="20" class="value">4283</text></g>
      <g transform="translate(0, 1368)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">20</text><text x="90" y="20" class="label">京都府</text><text x="270" y="20" class="value">4231</text></g>
      <g transform="translate(0, 1440)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">21</text><text x="90" y="20" class="label">香川県</text><text x="270" y="20" class="value">4071</text></g>
      <g transform="translate(0, 1512)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">22</text><text x="90" y="20" class="label">群馬県</text><text x="270" y="20" class="value">3948</text></g>
      <g transform="translate(0, 1584)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">23</text><text x="90" y="20" class="label">山梨県</text><text x="270" y="20" class="value">3759</text></g>
      <g transform="translate(0, 1656)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">24</text><text x="90" y="20" class="label">埼玉県</text><text x="270" y="20" class="value">3756</text></g>
    </g>

    <!-- Right column -->
    <g transform="translate(520, 70)">
      <g class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">25</text><text x="90" y="20" class="label">北海道</text><text x="270" y="20" class="value">3753</text></g>
      <g transform="translate(0, 72)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">26</text><text x="90" y="20" class="label">熊本県</text><text x="270" y="20" class="value">3603</text></g>
      <g transform="translate(0, 144)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">27</text><text x="90" y="20" class="label">佐賀県</text><text x="270" y="20" class="value">3395</text></g>
      <g transform="translate(0, 216)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">28</text><text x="90" y="20" class="label">福井県</text><text x="270" y="20" class="value">3355</text></g>
      <g transform="translate(0, 288)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">29</text><text x="90" y="20" class="label">長野県</text><text x="270" y="20" class="value">3354</text></g>
      <g transform="translate(0, 360)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">30</text><text x="90" y="20" class="label">福島県</text><text x="270" y="20" class="value">3346</text></g>
      <g transform="translate(0, 432)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">31</text><text x="90" y="20" class="label">奈良県</text><text x="270" y="20" class="value">3270</text></g>
      <g transform="translate(0, 504)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">32</text><text x="90" y="20" class="label">岩手県</text><text x="270" y="20" class="value">3217</text></g>
      <g transform="translate(0, 576)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">33</text><text x="90" y="20" class="label">宮崎県</text><text x="270" y="20" class="value">3217</text></g>
      <g transform="translate(0, 648)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">34</text><text x="90" y="20" class="label">富山県</text><text x="270" y="20" class="value">3195</text></g>
      <g transform="translate(0, 720)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">35</text><text x="90" y="20" class="label">東京都</text><text x="270" y="20" class="value">3192</text></g>
      <g transform="translate(0, 792)" class="row"><rect x="0" y="-18" width="520" height="72" /><text x="30" y="20" class="rank">36</text><text x="90" y="20" class="label">
  `
}

export default generateTableX

# 1. 基本構造

まず、モジュールの全体構造を見てみましょう。

```typescript
import regionsData from 'utils/prefecture/regions.json'
import handleResasAPI from 'utils/resas'

// インターフェース定義
export interface ResasPrefectureType { ... }
export interface PrefectureType { ... }
export interface RegionPrefectureType { ... }

// メイン関数
const handlePrefecture = () => { ... }

// ヘルパー関数
const fetchItems = async (): Promise<PrefectureType[]> => { ... }
const findItem = async (prefCode: string): Promise<PrefectureType | undefined> => { ... }
const fetchRegions = async (): Promise<RegionPrefectureType[]> => { ... }

export default handlePrefecture
```

このモジュールは、都道府県データの取得、検索、地方ごとの整理などの機能を提供します。

# 2. インターフェースの定義

3つの主要なインターフェースを定義しています：

```typescript
export interface ResasPrefectureType {
  prefCode: number
  prefName: string
}

export interface PrefectureType {
  prefCode: string
  prefName: string
}

export interface RegionPrefectureType {
  name: string
  prefectures: PrefectureType[]
}
```

- `ResasPrefectureType`: RESAS APIから直接取得するデータの形式
- `PrefectureType`: アプリケーション内で使用する都道府県データの形式（都道府県コードを5桁の文字列として扱う）
- `RegionPrefectureType`: 地方と所属する都道府県のデータ形式

注目すべき点は、`ResasPrefectureType`の`prefCode`が`number`型であるのに対し、`PrefectureType`の`prefCode`は`string`型になっていることです。これは、e-Stat APIで使用される`areaCode`が文字列形式（例：'28000'）であるためです。

# 3. メイン関数：handlePrefecture

```typescript
const handlePrefecture = () => {
  return {
    fetchItems: async () => await fetchItems(),
    findItem: async (prefCode: string) => await findItem(prefCode),
    fetchRegions: async () => await fetchRegions(),
  }
}
```

この関数は、都道府県データを操作するための3つの非同期関数を提供するオブジェクトを返します。

# 4. データ取得と変換：fetchItems

```typescript
const fetchItems = async (): Promise<PrefectureType[]> => {
  try {
    const resasParams = { url: 'api/v1/prefectures' }
    const { fetchAPI } = handleResasAPI<ResasPrefectureType[]>(resasParams)

    const prefectures = await fetchAPI()

    return prefectures.map((d) => ({
      prefCode: String(d.prefCode).padStart(2, '0') + '000',
      prefName: d.prefName,
    }))
  } catch (error) {
    console.error('都道府県データの取得中にエラーが発生しました:', error)
    throw error
  }
}
```

この関数は以下の手順で動作します：

1. RESAS APIのエンドポイントを指定
2. `handleResasAPI`関数を使ってAPIリクエストを行う
3. 取得したデータを`PrefectureType`の形式に変換
   - ここで重要なのは、`prefCode`の変換です。RESAS APIから取得した数値型の`prefCode`（例：28）を、e-Stat APIで使用される文字列型の`areaCode`（例：'28000'）に変換しています。
   - `String(d.prefCode).padStart(2, '0') + '000'`という処理で、2桁の数字を5桁の文字列に変換しています。
4. エラーハンドリングを行い、エラーメッセージを日本語で出力

# 5. データ検索：findItem

```typescript
const findItem = async (
  prefCode: string
): Promise<PrefectureType | undefined> => {
  try {
    const prefectures = await fetchItems()
    return prefectures.find((f) => f.prefCode === prefCode)
  } catch (error) {
    console.error('都道府県の検索中にエラーが発生しました:', error)
    throw error
  }
}
```

この関数は、指定された都道府県コード（e-Stat API形式）に一致する都道府県データを検索します。

# 6. 地方ごとのデータ取得：fetchRegions

```typescript
const fetchRegions = async (): Promise<RegionPrefectureType[]> => {
  try {
    const prefectures = await fetchItems()
    const prefectureMap = new Map(prefectures.map((p) => [p.prefName, p]))

    return regionsData.map((region) => ({
      name: region.name,
      prefectures: region.prefectures
        .map((prefName) => prefectureMap.get(prefName))
        .filter((pref): pref is PrefectureType => pref !== undefined),
    }))
  } catch (error) {
    console.error('地方データの取得中にエラーが発生しました:', error)
    throw error
  }
}
```

この関数は、`regionsData`を使用して地方ごとの都道府県データを生成します。`regionsData`は以下のような構造になっています：

```javascript
;[
  {
    name: '北海道・東北',
    prefectures: [
      '北海道',
      '青森県',
      '岩手県',
      '秋田県',
      '宮城県',
      '山形県',
      '福島県',
    ],
  },
  {
    name: '関東',
    prefectures: [
      '東京都',
      '神奈川県',
      '埼玉県',
      '千葉県',
      '茨城県',
      '栃木県',
      '群馬県',
    ],
  },
  // ... 他の地方のデータ ...
]
```

この構造により、日本の都道府県を6つの主要な地方にグループ化しています。`fetchRegions`関数は、このデータを利用して地方ごとの都道府県リストを生成します。

# まとめ

このモジュールを使用することで、RESAS APIから取得した都道府県データをe-Stat API用に変換し、効率的に管理できます。主な特徴は以下の通りです：

1. TypeScriptの型システムを活用したコードの安全性と可読性の向上
2. RESAS APIからのデータ取得とe-Stat API用のデータ形式への変換
3. 都道府県コードによる検索機能
4. 地方ごとの都道府県グループ化
5. エラーハンドリングの実装と日本語でのエラーメッセージ出力

このモジュールは、RESAS APIとe-Stat APIを併用する地域データ分析アプリケーションの開発に特に有用です。例えば、地域経済分析、人口統計調査、選挙結果分析など、幅広い分野で活用できるでしょう。

次回は、このモジュールを実際のアプリケーションで使用する方法や、パフォーマンス最適化のテクニックについて詳しく解説します。お楽しみに！

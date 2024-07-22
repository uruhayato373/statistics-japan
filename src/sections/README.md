# sectionsディレクトリ

cardに表示するデータを取得して、整形するコンポーネント。

このディレクトリ内のコンポーネントは、`routerProps`しか受け取らない。

## 構成

fieldId > menuId のサブディレクトリを手動で作成

### 日本の統計、都道府県の統計、市区町村の統計

基本的には、ひとつのCardに対してひとつのコンポーネントとなる。

### 都道府県ランキング

pageIdごとに、{chart, table, selectPrefecture}を返却するコンポーネントを作成する。




## 責務

### e-Stat APIのパラメータ設定

e-Stat APIを利用する場合、paramsを設定する。

paramsは、都道府県と市区町村で異なる可能性があるので、基本形は次の通りとする。

```ts
const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010106',
        cdCat01: 'F1101',
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010106',
        cdCat01: 'F1101',
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020206',
        cdCat01: 'F1101',
        cdArea: routerProps.cityCode,
      }
  }
}
```

### e-Stat APIからのデータ取得

パラメータを使用してe-Stat APIからデータを取得する。

```ts
const { document } = await handleEstatAPI(params(routerProps))
```

e-Stat API からのレスポンスは、必要最小限の加工を施して、documentとして取得する。

## cardに渡す情報の生成

cardに必要な情報はここで整形する。（cardコンポーネントでは操作しない）

```ts
{
  title:'カードのタイトル',
  contents:'chartやtableに必要な情報',
}
```

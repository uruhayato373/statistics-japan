# appディレクトリ

## URLの構成

- field : 統計の分野　- 人口・世帯、国土・気象等
- menu : 統計の項目 - 総人口、気温・天候等

`fieldId`と`menuId`はディレクトリを静的に作成する。

それぞれのリストは[fieldList.json](/src/utils/field/fieldList.json)、 [menuList.json](/src/utils/menu/menuList.json)で管理する。

以降は`slug`で動的に処理する。

### 日本の統計

`/fieldId/menuId/japan/`

### 都道府県ランキング

`/fieldId/menuId/prefecture-rank/pageId/`

### 都道府県の統計

`/fieldId/menuId/prefecture/prefCode/`

### 市区町村の統計

`fieldId/menuId/city/prefCode/cityCode/`

### 市区町村ランキング

`fieldId/menuId/city-rank/prefCode/pageId`

## params.slug

`kindId`,`prefCode`,`cityCode`,`pageId`を取得する。

```ts
const [kindId, prefCodeOrPageId, cityCode] = params.slug

const {
  prefCode = kindId === 'prefecture-rank' ? null : prefCodeOrPageId,
  pageId = kindId === 'prefecture-rank' ? prefCodeOrPageId : null,
} = {}
```

### kind : 統計の種類

[kindList.json](src/utils/kind/kindList.json)で管理する。

### pageId : 統計の細目

都道府県ランキングや市区町村ランキングの場合に指定。　例：総人口、65歳以上人口　等

[pageList.json](/src/utils/page/pageList.json)で管理する。

### prefCode : 都道府県コード

RESAS-APIを利用する。プロキシ環境下ではアクセスできない場合があるので、ローカルに保存した。

[prefList.json](/src/utils/prefecture/prefList.json)

### cityCode : 市区町村コード

RESAS-APIを利用する。プロキシ環境下ではアクセスできない場合があるので、ローカルに保存した。

[cityList.json](/src/utils/city/cityList.json)

## appディレクトリの責務

### Metadataの生成

Next.jsの`generateMetadata`関数を利用してMetadataを生成する。appディレクトリ以外では利用できない。

slugを引数として、必要な情報を返す関数を作成した。[generateMetaProps](/src/utils/props/metaProps.ts)

### routerPropsの生成

URLから取得できる`fieldId`,`menuId`,`kindId`,`pageId`,`prefCode`,`cityCode`を格納するオブジェクト。

[Views](/src/views)コンポーネントにはrouterPropsしか渡さない。

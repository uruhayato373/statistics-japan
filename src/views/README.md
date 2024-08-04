# viewsディレクトリ

appディレクトリからrouterPropsを受け取り、実際のページ構成を整えるコンポーネント。

routerPropsは`utils/props`で定義している。

[utils/props](/src/utils/props/)

## 構成

fieldId > menuId のサブディレクトリを手動で作成する。

menuIdごとに、次の４つのコンポーネントを作成する。

- Japan
- PrefectureRank
- Prefecture
- City

## viewsディレクトリの責務

### breadcrumbsPropsの生成

[Breadcrumbs](/src/components/breadcrumbs/Breadcrumbs.tsx)に渡すデータを生成する。

```ts
const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
```

breadcrumbsPropsは`utils/props`で定義している。

[utils/props](/src/utils/props/)

### レイアウトの設定

DashboardやChartの各カードを配置するレイアウトを定義する。

カードを配置するためのGridはviewsコンポーネントでしか利用しない（sections以下では利用しない）

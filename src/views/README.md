# viewsディレクトリ

appディレクトリからrouterPropsを受け取り、実際のページ構成を整えるコンポーネント

## 構成

fieldId > menuId のサブディレクトリを手動で作成

menuIdごとに、次の４つのコンポーネントを作成する。

- Japan
- PrefectureRank
- Prefecture
- City

## viewsディレクトリの責務

### breadcrumbsPropsの生成

```ts
const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
```

### Gridレイアウト

Gridはviewsコンポーネントでしか利用しない（sections以下では利用しない）

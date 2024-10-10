# 統計で見る都道府県

## 概要

都道府県の各種統計データをダッシュボードで視覚的に見やすく整理するサイト

下記のAPIを利用する

- [政府統計の総合窓口 e-Stat](https://www.e-stat.go.jp/api/)
- [地域経済分析システム RESAS](https://opendata.resas-portal.go.jp/)

## 使用技術

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-D3.js-000000.svg?logo=d3.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-MUI-000000.svg?logo=mui&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-Python-000000.svg?logo=python&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Amazon%20aws-232F3E.svg?logo=amazon-aws&style=for-the-badge">
</p>

## 環境

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Node.js              | 18.17.0    |
| React                | 18.2.0     |
| Next.js              | 14.1.3     |
| MUI                  | 5.0.0      |
| D3.js                | 7.9.0      |

## 開発環境構築

### 環境変数

.envファイルを作成して、下記の環境変数を追加

```bash
# URL
NEXT_PUBLIC_BASE_URL='https://statistics-japan.com'

# e-Stat APIのAPP ID
ESTAT_API_APPID=''


# PROXY設定　必要な場合のみ記載
HTTP_PROXY='http://{IPアドレス}:{ポート番号}'
```

### パッケージのインストール

```bash
npm install
```

### 起動

```bash
npm run dev
```

[http://localhost:8081/]にアクセスできたら成功

## デプロイ

### 開発環境

[Vercel](https://vercel.com/)にデプロイする。

Git Repositoryからプロジェクトを作成した後、Settings > Environment Variables　で環境変数を追加する。

`develop`ブランチにプッシュされた場合のみデプロイしたいので、[vercel-ignore-build-step.sh](vercel-ignore-build-step.sh)を作成。

Vercelのプロジェクトから Settings > Git > Ignored Build Stepにコマンドを指定する。

```bash
bash vercel-ignore-build-step.sh
```

## ディレクトリ構成

### app

src/app/(dashboard)/README.md

### viwes

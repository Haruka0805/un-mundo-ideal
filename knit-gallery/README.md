# Knit Gallery（編み物作品ギャラリー）

写真をアップロードして、みんなが一覧・詳細を見られるシンプルなサイト（MVP）です。

## できること
- 作品の一覧表示（公開）
- 作品詳細（複数写真表示）
- 投稿：Googleログインしてアップロード（閲覧は誰でもOK）

## 構成
- フロント：静的HTML + ブラウザで Firebase SDK を直接利用（ビルド不要）
- バックエンド：Firebase Auth（Googleログイン）、Firestore（メタ情報）、Storage（画像）

## 使い方（最短）
1. Firebase コンソールで新規プロジェクトを作成
2. Authentication で「Google」ログインを有効化
3. Firestore / Storage を有効化
4. ルールを `firestore.rules` / `storage.rules` を元に設定
5. `knit-gallery/config.js` を Firebase の設定値で埋める
6. ローカル確認（あとで Hosting へデプロイ）

### ローカル起動
このフォルダ内で:
```bash
node serve.js
```
ブラウザで `http://localhost:8080/` を開きます。

## 画像/データ設計（MVP）
- Firestore: `posts/{postId}`
  - `title`, `description`, `createdAt`, `authorUid`, `photos: [{url, storagePath, order}]`
- Storage: `posts/{authorUid}/{postId}/photos/...`

## セキュリティルール
- `firestore.rules`：投稿（create/update/delete）を `authorUid` の本人だけ許可、閲覧は公開
- `storage.rules`：画像読み取りは公開、書き込みは `posts/{authorUid}/...` 配下のみ許可

※ Googleアカウントは「本人の投稿に使う」想定です（閲覧は誰でも可能）。

## デプロイ（Firebase Hosting）
Firebase CLI（npm）が必要です。CLI を入れた環境で:
1. `firebase init hosting`
2. `public` ディレクトリを `knit-gallery` に設定
3. `firebase deploy`


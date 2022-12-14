# 単語学習webアプリケーション「きびたんご」

## 概要
このアプリケーションは出題された単語を選択肢から訳を選んで答えることができるアプリです。

成績はデータベースに保存され、振り返ることができます。

## サーバーの起動
dockerを使用できる環境が必要です。

1. ダウンロードしたリポジトリに移動します。
```bash
cd kibitango_docker
```

2. 下記のコマンドを実行してサーバーを起動した後に
http://localhost:3000
にアクセスします。

```bash
docker-compose up -d
```

## 機能

### テストを受ける
アカウントにログインすることによって単語テストを受けることができます。

成績はアカウントごとに保存されます。

1. 新しくアカウントを作るもしくは、下記でログインしてください。

##### ID
>student

##### パスワード
>fdsafdsa

### テスト問題を追加する
テスト問題はExcelの決まったフォーマットにしたがって入力することで単語を追加することができます。

1. 下記のIDでログインします。
##### ID
>teacher

##### パスワード
>fdsafdsa

2. 【単語を登録する】 をクリックします。
3. 【ダウンロード】をクリックします。
4. ダウンロードしたファイルを開き、ファイルの内容を変更します。
5. ファイルを選択で変更したファイルを選択します。
6. 【アップロード】をクリックします。

これでテストを追加することができました。

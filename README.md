# pug-builder

pug to html
build and watch

1. npm を install
2. 作業したいディレクトリへ移動
3. `npm init -y` package.json 作成
4. 開発用に pug-builder をインストール `npm i -D pug-builder`
5. package.json の scripts に以下のコマンドを追加
```
  "scripts": {
    "build": "node ./dev/build.js",
    "watch": "node ./dev/watch.js"
  },
```
6. 作業ディレクトリ(以下 wd) に dev フォルダ作成
7. `wd/dev/build.js` と `wd/dev/watch.js` を作成
8. build.js の中身を以下のように書く(パスはすべてwdからの相対パス)
```
var builder = require('pug-builder');
builder.build({
  // pug ファイルを編集するディレクトリ
  target: 'src',
  // pug のモジュール(mixin等)のpugファイルを編集するディレクトリ(なければ指定する必要はない)
  includes: 'includes',
  // htmlを出力するディレクトリ (srcからの相対パスで出力)
  output: 'dst',
  // 出力するhtmlを読みやすくするかどうか
  pretty: true,
});
```
9. watch.js も以下のようにします
```
var builder = require('pug-builder');
builder.watch({
  // pug ファイルを編集するディレクトリ
  target: 'src',
  // pug のモジュール(mixin等)のpugファイルを編集するディレクトリ(なければ指定する必要はない)
  includes: 'includes',
  // htmlを出力するディレクトリ (srcからの相対パスで出力)
  output: 'dst',
  // 出力するhtmlを読みやすくするかどうか
  pretty: true,
});
```
10. wd で `npm run build` と実行すると target で指定したディレクトリ内の pug ファイルがすべて html に変換され output で指定したディレクトリに出力されます
11. `npm run watch` と実行すると target と includes で指定したディレクトリの編集を監視して自動でbuildを実行します。

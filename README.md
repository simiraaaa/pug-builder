# pug-builder

pug to html
build and watch

1. npm を install
2. yarn をインストール `npm i -g yarn`
3. 作業したいディレクトリへ移動
4. `npm init -y` package.json 作成
5. 開発用に pug-builder をインストール `npm i -D pug-builder`
6. package.json の scripts に以下のコマンドを追加
```
  "scripts": {
    "build": "node ./dev/build.js",
    "watch": "node ./dev/watch.js"
  },
```
7. 作業ディレクトリ(以下 wd) に dev フォルダ作成
8. `wd/dev/build.js` と `wd/dev/watch.js` を作成
9. build.js の中身を以下のように書く(パスはすべてwdからの相対パス)
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
10. watch.js も以下のようにします
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
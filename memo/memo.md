HTMLのCanvasを使う

　2Dまたは3Dのグラフィクスを描画する。

<!-- more -->

# ブツ

* [DEMO][]
* [リポジトリ][]

[DEMO]:
[リポジトリ]:

# 情報源

* [Canvas API][]
* [HTMLCanvasElement.getContext][]
* [WebGL 入門][]

[Canvas API]:https://developer.mozilla.org/ja/docs/Web/API/Canvas_API
[HTMLCanvasElement.getContext]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
[WebGL 入門]:https://developer.mozilla.org/ja/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL

# 最少コード

　緑色の四角形が描画される。

## index.html

```html
<canvas id="canvas"></canvas>
<script src="main.js"></script>
```

## main.js

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
```

# キャンバスとは

　[canvas][]とはJavaScriptのAPIでグラフィクス描画するHTML要素のこと。

[canvas]:https://developer.mozilla.org/ja/docs/Web/HTML/Element/canvas

## 用途

　[canvas][]要素をもちいたグラフィクスは、ゲームなど高速描画がもとめられるときに使う。

　ふつうゲームは各OSのAPIをもちいて実装する。今でもそれが最速。ただし各OS用APIによる開発コストが高い。また、ユーザの手間もかかる。しばしばマシンごとに適したバイナリを選んだり、ビルドやインストールを実行せねばならない。

　そこで[canvas][]を使う。同じAPIで実装しながらも異なるOSで同じように動作するゲームを開発することができる。ユーザはブラウザでアクセスすれば実行できる。ただし性能は各OSのAPIをもちいたそれより低い。

# コンテキストの種類

　[canvas][]のコンテキストには4種類ある。[HTMLCanvasElement.getContext][]メソッドの引数で指定する。

`contextType`|戻り値|概要
-------------|------|----
`2d`|[CanvasRenderingContext2D][]|2D描画コンテキスト
`webgl`|[WebGLRenderingContext][]|3D描画コンテキスト（OpenGL ES 2.0）
`webgl2`|[WebGL2RenderingContext][]|3D描画コンテキスト（OpenGL ES 3.0）
`bitmaprenderer`|[ImageBitmapRenderingContext][]|特定の[ImageBitmap][]に置換する機能のみ提供する

[CanvasRenderingContext2D]:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[WebGLRenderingContext]:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
[WebGL2RenderingContext]:https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext
[ImageBitmapRenderingContext]:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext
[ImageBitmap]:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
[OpenGL ES]:https://ja.wikipedia.org/wiki/OpenGL_ES
[GPU]:https://ja.wikipedia.org/wiki/Graphics_Processing_Unit
[Vulkan]:https://ja.wikipedia.org/wiki/Vulkan_(API)
[シェーディング言語]:https://ja.wikipedia.org/wiki/%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E8%A8%80%E8%AA%9E

　2D描画だけでも難しいが、3D描画ともなると桁違いに難しくなる。

　[OpenGL ES][]は[GPU][]をもちいて高速にグラフィクス描画をおこなうAPIのこと。対応した[GPU][]がなければ実行できないという致命的な欠点がある。また、Appleは自社で独占すべく共通仕様の[OpenGL ES][]をやめて自社APIをもちいる方針にした。せっかく共通化しても普及しなかったり独占すべく独自路線をゆくものもいたりするのが現状。

　[OpenGL ES][]の後継に[Vulkan][]があるらしいが、JavaScript APIとしては実装されていないようだ。そもそもローレベルすぎるため[シェーディング言語][]で描画用コードを実装することもあるらしい。私にはついていけそうにない。

## 1. [canvas][]要素を取得する

　まずはHTMLの[canvas][]要素を取得する。[getElementById][]や[querySelector][]を使う。

[getElementById]:https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById
[querySelector]:https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector

```javascript
const canvas = document.getElementById('canvas');
```

## 2. [canvas][]要素のコンテキストを取得する

　[canvas][]要素のコンテキストを指定する。

```javascript
const ctx = canvas.getContext('2d');
const ctx = canvas.getContext('webgl');
const ctx = canvas.getContext('webgl2');
const ctx = canvas.getContext('bitmaprenderer');
```

　指定したコンテキストによって返されるオブジェクトが異なる。持っているメソッドも異なる。

## 3. 各コンテキストのAPIを使いグラフィクス描画する

### 2D [CanvasRenderingContext2D][]

　2Dグラフィクス用APIがある。

```javascript
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
```

### 3D [WebGLRenderingContext][], [WebGL2RenderingContext][]

　3Dグラフィクス用APIがある。

```javascript
ctx.clearColor(0.0, 0.0, 0.0, 1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT);
```

* [WebGL_API/Tutorial][]
* [WebGLRenderingContext][]
* [WebGL2RenderingContext][]

[WebGL_API/Tutorial]:https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial

### [ImageBitmapRenderingContext][]

　特定の[ImageBitmap][]に置換するAPI、[transferFromImageBitmap][]を使う。このAPIのみ。

```javascript
const res = await fetch(`asset/image/monar-mark-gold.png`);
const blob = await res.blob();
const bitmap = await createImageBitmap(blob);
canvas.width = bitmap.width;
canvas.height = bitmap.height;
ctx.transferFromImageBitmap(bitmap)
```

　画像ファイルを高速に描画するためのコンテキストらしい。

* [画像に関する新しい DOM API の紹介][]

[画像に関する新しい DOM API の紹介]:https://inside.pixiv.blog/petamoriken/5853
[transferFromImageBitmap]:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap
[createImageBitmap]:https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap

　[createImageBitmap][]の引数をみると以下のデータから画像を生成できるようだ。

* [HTMLImageElement][]
* [SVGImageElement][]
* [HTMLVideoElement][]
* [HTMLCanvasElement][]
* [Blob][]
* [ImageData][]
* [ImageBitmap][]
* [OffscreenCanvas][]

[HTMLImageElement]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
[SVGImageElement]:https://developer.mozilla.org/en-US/docs/Web/API/SVGImageElement
[HTMLVideoElement]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
[HTMLCanvasElement]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
[Blob]:https://developer.mozilla.org/en-US/docs/Web/API/Blob
[ImageData]:https://developer.mozilla.org/en-US/docs/Web/API/ImageData
[ImageBitmap]:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
[OffscreenCanvas]:https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

　一般的なラスタ画像ファイルGIF,PNG,JPGや、ベクタ画像SVGをロードして描画できるようだ。

　また、バイナリデータから画像を作成することもできる。[createImageData][]のコード例をみると1ピクセルあたりRGBAそれぞれ1バイトずつ計4バイトのデータを配列で作るようだ。

[createImageData]:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData


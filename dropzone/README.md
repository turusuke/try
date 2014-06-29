このサンプルは [dropzonejs](http://www.dropzonejs.com/) の[解説記事](http://webdelog.info/blog/2013/03/04/dropzonejs.html)を書くために作成したサンプルです。

この記事を書いた当初から日付が経ち、最新バージョンの dropzonejs では当時のサンプルが動作しなくなっていたため、最新の仕様にあわせてコードを書き変えました。

動作させるためには PHP の利用できる環境が必要となっています。

キャンバス上に画像をドロップすると、画像に使用されている色を解析して、多く使われている色を表示します。

![](http://webdelog.info/wp-content/uploads/2013/03/913aec54ec5454460fc2164328dfb053.png)

多く利用されている色を取得するのには [colors.inc.php](http://www.codediesel.com/php/generating-color-palette-from-aimage/) を利用しています。
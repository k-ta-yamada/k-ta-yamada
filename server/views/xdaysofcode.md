### log

Record of [#100DaysOfCode](https://www.100daysofcode.com/) Challenge.

---

#### Day 0: 2019-01-xx

- ふと気がついたらAngularがCLI使うと作るの楽だと気づいた
    - まずははTodoアプリでもサクッと作れるようになる
- どうせだから[https://www.100daysofcode.com/](https://www.100daysofcode.com/)的に記録してみる
    - 100日続くかどうかはわからないけど

---

#### Day 36: 2019-02-23 sat

##### Progress
- ちょっと別件でこのリポジトリ同構成でアプリ作成してHerokuにあげた

##### Thoughts/Todo/Memo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
    - Componentクラスで`http.get().subscribe()`するより  
      template側で`async`パイプ使うほうがいいっぽい？
    - ref: [Angular Reactive Templates with ngIf and the Async Pipe](https://blog.angular-university.io/angular-reactive-templates/)
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- n/a

---

#### Day 35: 2019-02-22 fri

##### Progress
- Loadingとかの調査
    - ref: [Create a loading screen for Angular 7 apps | nezhar.com](https://nezhar.com/blog/create-a-loading-screen-for-angular-apps/)
    - んー、なんかうまくいかん

##### Thoughts/Todo/Memo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
    - Componentクラスで`http.get().subscribe()`するより  
      template側で`async`パイプ使うほうがいいっぽい？
    - ref: [Angular Reactive Templates with ngIf and the Async Pipe](https://blog.angular-university.io/angular-reactive-templates/)
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work

---

#### Day 34: 2019-02-21 thu

##### Progress
- Loadingとかの調査
- Componentクラスで`http.get().subscribe()`するより  
  template側で`async`パイプ使うほうがいいっぽい？
    - ref: [Angular Reactive Templates with ngIf and the Async Pipe](https://blog.angular-university.io/angular-reactive-templates/)

##### Thoughts/Todo/Memo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work

---

#### Day 33: 2019-02-20 wed

##### Progress
- `travis-ci`の設定をrubyとnode_js個別でなく1つにまとめる
    - codeclimateのtest coverageへの対応のため
- なぜか`travis-ci`で実行すると失敗するテストの修正
    - というか`VCR`のディレクトリの参照が正しくなく、機能していなかったため

##### Thoughts/Todo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/commit/dc9e5893078dd17c7b29a984a527528f84a7413d](https://github.com/k-ta-yamada/k-ta-yamada/commit/dc9e5893078dd17c7b29a984a527528f84a7413d)
- [k-ta-yamada/k-ta-yamada/commit/dd178dda27342418c35c0b9e43767c1b339f5db2](https://github.com/k-ta-yamada/k-ta-yamada/commit/dd178dda27342418c35c0b9e43767c1b339f5db2)

---

#### Day 32: 2019-02-19 tue

##### Progress
- `ng-click-outside`でスマホ向けに`touchstart`イベントの追加が必要だった
- 久しぶりにテスト書いてたら大分忘れてる。またTODOアプリを作る日々を再開しようかな。

##### Thoughts/Todo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/commit/67eb7865edc2a2368a93959d6b7a9074955901f4](https://github.com/k-ta-yamada/k-ta-yamada/commit/67eb7865edc2a2368a93959d6b7a9074955901f4)

---

#### Day 31: 2019-02-18 mon

##### Progress
- HEADER（メニュー）外をクリックしたらメニューを閉じるようにする対応
    - `ng-click-outside`をインストールしただけな感じ

##### Thoughts/Todo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
    - Load中なのをもう少しかっこよくするやつ
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/pull/41](https://github.com/k-ta-yamada/k-ta-yamada/pull/41)

---

#### Day 30: 2019-02-17 sun

##### Progress
- ServiceとComponentのテスト

##### Thoughts/Todo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/ng-test](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/ng-test)

---

#### Day 29: 2019-02-16 sat

##### Progress
- masterにマージ完了。クライアント側テストは一旦スキップ。

##### Thoughts/Todo
- mypage
    - Angularのテスト
    - Lighthouseの結果への対応
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/commit/84c442a27178c272e37eba365820557c1cd1161c](https://github.com/k-ta-yamada/k-ta-yamada/commit/84c442a27178c272e37eba365820557c1cd1161c)

---

#### Day 28: 2019-02-15 fri

##### Progress
- 貯まっていたコミットを意味のある単位にまとめ直すため、ブランチ別途作成
- skipしていたRubyのテストを作成

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular-app](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular-app)

---

#### Day 27: 2019-02-14 thu

##### Progress
- [compodoc](https://compodoc.app/)をインストールしてみた
- エクスプローラーの表示上`proxy.conf.json`が`angular.json`と離れているのが嫌でリネーム
    - `proxy.conf.json` => `angular.proxy-config`
    - でも`proxy.conf.json`がメジャーっぽいなぁ
    - [angular-cli/proxy.md at master · angular/angular-cli](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 26: 2019-02-13 wed

##### Progress
- 未作成のComponentとServiceの作成
- scroll to top on route click
    - ref: https://stackoverflow.com/questions/48048299/angular-5-scroll-to-top-on-every-route-click
- JSONがスネークケースでAngularはキャメルケースな点への対応
    - `humps`を使って`camelizeKeys`で対応

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
        - 今更だけどredirectしちゃだめで、常にindex.htmlを返せばOKっぽい
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
        - もう慣れたしEmmetの使い方に気づいた
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 25: 2019-02-12 tue

##### Progress
- Build周りの調整やディレクト構成の変更

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 24: 2019-02-11 mon

##### Progress
- Angularのサイトにcss grid使ってみたり

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 23: 2019-02-10 sun

##### Progress
- Angularのサイトにcss grid使ってみたり

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 22: 2019-02-09 sat

##### Progress
- Angularのサイトにcss grid使ってみたり

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 21: 2019-02-08 fri

##### Progress
- Angularのサイトにcss grid使ってみたり

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 20: 2019-02-07 thu

##### Progress
- 一転して「[これからWebをはじめる人のHTML&CSS、JavaScriptのきほんのきほん](https://www.amazon.co.jp/dp/4839959714)」
- chapter-3の途中まで（前日から進まず）
- レイアウトって`float`でやるんだっけ？ってとこから`flex`, `grid`との格闘を始める
- まだ理解しきってないけど使い分けと全体レイアウトで`grid`使うと結構楽なことに気がついた

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.
- HTML/CSS
    - flex
    - grid
        - grid-template-columns
        - grid-template-rows
        - grid-template-areas
    - box-shadow
    - @media

##### Link(s) to work
- [k-ta-yamada/html-css-js/commits/master](https://github.com/k-ta-yamada/html-css-js/commits/master)

---

#### Day 19: 2019-02-06 wed

##### Progress
- 一転して「[これからWebをはじめる人のHTML&CSS、JavaScriptのきほんのきほん](https://www.amazon.co.jp/dp/4839959714)」
- chapter-3の途中まで
- CSSの`@media`が出てきたあたりでめんどくさくなってきてしまった
- でも続けるけど

##### Thoughts/Todo
- Angular
    - リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
    - コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
    - ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
    - Todo: 今後使えるようになりたいもの
        - Form(Template, Reactive)
        - Modal Dialog
        - Routing
        - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/html-css-js/commits/master](https://github.com/k-ta-yamada/html-css-js/commits/master)

---

#### Day 18: 2019-02-05 tue

##### Progress
- サーバサイドのroutingとか設定し直し
- index.htmlへのfallback
- リロードでTOPへ移動してしまうのでuseHash=trueに設定

##### Thoughts/Todo
- リロードでfallbackしたはいいけど元のパスに移動させるには何が足りないのだろう
- コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- Todo: 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 17: 2019-02-04 mon

##### Progress
- Todoに少し飽きたので自サイトにAngularを導入してみる
- BootstrapV4がいまいちよくわからん
- リロードした場合にサーバサイドでindex.htmlへのfallbackさせないといかん
- サーバサイドのAPI関連のrouting切り直したりしないといかん
- そもそもrouting見直ししないとかな

##### Thoughts
- コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- Todo: 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 16: 2019-02-03 sun

##### Progress
- Todoに少し飽きたので自サイトにAngularを導入してみる
- BootstrapV4がいまいちよくわからん

##### Thoughts
- コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- Todo: 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 15: 2019-02-02 sat

##### Progress
- Todoに少し飽きたので自サイトにAngularを導入してみる
- Bootstrapとfont-awesomeも入れてみた

##### Thoughts
- コンテンツの持ち方とか考えないといかんかな（HTMLに打つのが久々で辛い）
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- Todo: 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/k-ta-yamada/compare/feature/angular](https://github.com/k-ta-yamada/k-ta-yamada/compare/feature/angular)

---

#### Day 14: 2019-02-01 fri

##### Progress
- 体調不良で特に進捗なし

##### Thoughts
- 久しぶりにテスト書いてみたらCompenentのテストの書き方を忘れていた
    - まあ見ればすぐ思い出せるレベルにはなってきたからいいか
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day014](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day014)

---

#### Day 13: 2019-01-31 thu

##### Progress
- 体調不良で特に進捗なし

##### Thoughts
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day013](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day013)

---

#### Day 12: 2019-01-30 wed

##### Progress
- Serviceのテスト
- Componentのテスト

##### Thoughts
- 久しぶりにテスト書いてみたらCompenentのテストの書き方を忘れていた
    - まあ見ればすぐ思い出せるレベルにはなってきたからいいか
- ReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day012](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day012)
- [k-ta-yamada/angular-todo-with-json/pull/5/files](https://github.com/k-ta-yamada/angular-todo-with-json/pull/5/files)

---

#### Day 11: 2019-01-29 tue

##### Progress
- ReactiveForms
- ReactiveFormsのテスト

##### Thoughts
- なんかReactiveFormsとClassのマッピングみたいなのはどうすればいいのかな
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - Routing
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day011](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day011)
- [k-ta-yamada/angular-todo-with-json/pull/4/files](https://github.com/k-ta-yamada/angular-todo-with-json/pull/4/files)

---

#### Day 10: 2019-01-28 mon

##### Progress
- ReactiveForms

##### Thoughts
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day010](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day010)

---

#### Day 9: 2019-01-27 sun

##### Progress
- ドキュメント読んだり調べたりで進捗なし

##### Thoughts
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day009](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day009)

---

#### Day 8: 2019-01-26 sat

##### Progress
- ドキュメント読んだり調べたり、それを少し試したりでコミットせず

##### Thoughts
- 今後使えるようになりたいもの
    - Form(Template, Reactive)
    - Dialog
        - => Angular Material?
    - loading progress and disable elements.

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day008](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day008)

---

#### Day 7: 2019-01-25 fri

##### Progress
- Serviceの修正
- テストの修正
    - とりあえずデフォルトが通るように設定

##### Thoughts
- テストについてよさげなリポジトリをみつけた
    - [juristr/angular-testing-recipes](https://github.com/juristr/angular-testing-recipes)
- これとかも
    - https://egghead.io/courses/learn-http-in-angular
- 早くサクッと作れるようになりたいなぁ

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day007](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day007)
- [k-ta-yamada/angular-todo-with-json/pull/3/files](https://github.com/k-ta-yamada/angular-todo-with-json/pull/3/files)

---

#### Day 6: 2019-01-24 thu

##### Progress
- `./vscode/launch.json`を追加
    - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)とかでデバッグしてみる
- テストの作成
    - Serviceクラスとそれ以外はデフォルトが通るように修正

##### Thoughts
- テストムズいなぁ。。。
- [Angular Material](https://material.angular.io/)で遊んでみた

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day006](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day006)
- [k-ta-yamada/angular-todo-with-json/pull/2/files](https://github.com/k-ta-yamada/angular-todo-with-json/pull/2/files)

---

#### Day 5: 2019-01-23 wed

##### Progress
- 前日に習ってService/Componentの作成
    - テストに集中するため、ここで一度masterにマージした
- テストの作成
    - Serviceクラスのテストはだいぶ慣れた
    - Componentのテストはまだこれから

##### Thoughts
- テストムズいなぁ。。。

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day005](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day005)
- [k-ta-yamada/angular-todo-with-json/pull/1/files](https://github.com/k-ta-yamada/angular-todo-with-json/pull/1/files)

---

#### Day 4: 2019-01-22 tue

##### Progress
- Service/Componentの作成

##### Thoughts
- ディレクトリ構成が決まってきたかな
- テストもかけるようにならないと

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day004](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day004)

---

#### Day 3: 2019-01-21 mon

##### Progress
- Service/Componentの作成

##### Thoughts
- 引き続きCLIに慣れるために
- CLIは慣れてきて、んじゃディレクトリ構成どうしようか、とか考え始める

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day003](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day003)

---

#### Day 2: 2019-01-20 sun

##### Progress
- Service/Componentの作成
- テストを書き始める

##### Thoughts
- CLIほんと便利だな
- 公式の[テストのページ](https://angular.jp/guide/testing)膨大すぎないか。。。

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day002](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day002)

---

#### Day 1: 2019-01-19 sat

##### Progress
- アプリの雛形作成
    - サーバサイドに`json-server`を利用
    - `proxy.conf.json`を設定
- Service/Componentの作成

##### Thoughts
- まずは`adngular-cli`を利用してserviceやcomponentの作成に慣れることから
- `ng generate`で`AppModule`とかに自動で追加されるのですごく楽になった印象

##### Link(s) to work
- [k-ta-yamada/angular-todo-with-json/compare/100doc/day001](https://github.com/k-ta-yamada/angular-todo-with-json/compare/100doc/day001)

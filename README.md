Kancolle Sortie Simulator with Wasm

プロジェクトルートのpackage.jsonは/ui/package.jsonへの繋ぎ
依存管理は/ui/package.jsonで

/coreがWasm
wasm buildの成果物は/ui/wasmに出力するように設定している

装備ごとの改修係数について、「明石の改修工廠早見表」との相違がいくつか見られる。しかし、これらについて直ちに"正解"を求めるのは難しい。
よって、改修係数、sqrt処理の有無について完全なデータ駆動に移行し、ユーザーに提示する

静的に評価可能なデータはts側で用意する
can~等の命名は完全に静的に完結している場合のみ用いる
不完全な場合は has_potential~ のように命名する
たとえば夜戦で攻撃可能かについて、艦自体に能力があるかないかはtsで評価するが、
大破なら行動できない等の評価はRustでする
つまり、
ts:   has_potential_night_battle_attack
rust: can_night_battle_attack
のようになる

制空値の文脈における「対空」はanti_airとは区別して、
air_superiority とする

// TODO: フラグ類は取り敢えずオブジェクトに全入れ 外に出す/出さないは使い勝手をみて判断
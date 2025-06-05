Kancolle Sortie Simulator with Wasm

プロジェクトルートのpackage.jsonは/ui/package.jsonへの繋ぎ
依存管理は/ui/package.jsonで

/coreがWasm
wasm buildの成果物は/ui/wasmに出力するように設定している

現状、艦爆と爆戦は「DIVEBOMBER」とされているが、実際には参照する定数が違うので分けるべきだと思う

静的に評価可能なデータはts側で用意する
can~等の命名は完全に静的に完結している場合のみ用いる
不完全な場合は has_potential~のように命名する
たとえば夜戦で攻撃可能かについて、艦自体に能力があるかないかはtsで評価するが、
大破なら行動できない等の評価はRustでする
つまり、
ts:   has_potential_night_battle_attack
rust: can_night_battle_attack
のようになる

制空値の文脈における「対空」はanti_airとは区別して、
air_superiority とする
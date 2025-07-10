import fs from "fs";
import path from "path";

const generate_union_type = (
    input_path: string,
    output_path: string,
    extract_pattern: RegExp,
    type_name: string,
): void => {
    const input_file_path = path.resolve(__dirname, input_path);

    const fileContent = fs.readFileSync(input_file_path, "utf-8");

    // 正規表現で値を抽出
    const matches = [...fileContent.matchAll(extract_pattern)];
    const names = Array.from(new Set(matches.map((match) => match[1])));

    // 全て数値なら数値リテラル型、そうでなければ文字列リテラル型
    const isAllNumber = names.every(n => /^\d+$/.test(n));
    const typeDef = [
        '/**',
        ` * ${type_name}ユニオン型 (自動生成)`,
        ` * @see ${input_path.replace(/^(\.\.\/)+/, '')}`,
        ' */',
        `export type ${type_name} =`,
        names.map((n) => isAllNumber
            ? `    | ${n}`
            : `    | '${n}'`).join("\n"),
        ';',
        ''
    ].join('\n');

    fs.writeFileSync(
        path.resolve(__dirname, output_path),
        typeDef,
        "utf-8"
    );

    console.log(`型: ${type_name} を自動生成しました`);
}

// 艦娘名
generate_union_type(
    '../src/datas/ship/player.ts',
    '../src/types/ship/playerNameJP.ts',
    /name_jp:\s*['\"`]?([^'\"`\n]+)['\"`]?/g,
    'PlayerShipNameJP',
);
// 深海棲艦名
generate_union_type(
    '../src/datas/ship/abyssal.ts',
    '../src/types/ship/abyssalNameJP.ts',
    /name_jp:\s*['\"`]?([^'\"`\n]+)['\"`]?/g,
    'AbyssalShipNameJP',
);

// ! 深海艦は名前に重複があるので名称マッチングに適さない
// 深海棲艦ID
generate_union_type(
    '../src/datas/ship/abyssal.ts',
    '../src/types/ship/abyssalId.ts',
    /^\s*(\d+):/gm,
    'AbyssalShipId',
);

// 艦娘装備名
generate_union_type(
    '../src/datas/equip/base/player.ts',
    '../src/types/equip/playerNameJP.ts',
    /name_jp:\s*['\"`]?([^'\"`\n]+)['\"`]?/g,
    'PlayerEquipNameJP',
);
// 深海棲艦装備名
generate_union_type(
    '../src/datas/equip/base/abyssal.ts',
    '../src/types/equip/abyssalNameJP.ts',
    /name_jp:\s*['\"`]?([^'\"`\n]+)['\"`]?/g,
    'AbyssalEquipNameJP',
);
// 深海棲艦装備ID
generate_union_type(
    '../src/datas/equip/base/abyssal.ts',
    '../src/types/equip/abyssalId.ts',
    /^\s*(\d+):/gm,
    'AbyssalEquipId',
);
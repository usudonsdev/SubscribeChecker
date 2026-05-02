// rules.mjs
// 今後、ここを100, 1000と増やしていきます。

const pricingRules = [
    // 月額・年額・日額の基本パターン
    {
        id: "m_yen_suffix",
        regex: /([0-9,０-９]+)円\s*[\/／]?\s*月(額)?/i,
        type: "monthly",
        description: "1,000円/月, 1,000円月額 の形式"
    },
    {
        id: "m_yen_prefix",
        regex: /月(額)?\s*([0-9,０-９]+)円/i,
        type: "monthly",
        description: "月額1,000円 の形式"
    },
    {
        id: "m_yen_kanji_prefix",
        regex: /毎月\s*([0-9,０-９]+)円/i,
        type: "monthly",
        description: "毎月1,000円 の形式"
    },
    {
        id: "m_yen_katakana",
        regex: /マンスリー\s*([0-9,０-９]+)円/i,
        type: "monthly",
        description: "マンスリー1,000円 の形式"
    },
    {
        id: "m_yen_english",
        regex: /([0-9,０-９]+)yen\s*\/\s*month/i,
        type: "monthly",
        description: "1,000yen/month の形式"
    },
    {
        id: "m_yen_taxin",
        regex: /([0-9,０-９]+)円\s*\(税込\)\s*[\/／]?\s*月/i,
        type: "monthly",
        description: "1,000円(税込)/月 の形式"
    },
    {
        id: "y_yen_suffix",
        regex: /([0-9,０-９]+)円\s*[\/／]?\s*年(額)?/i,
        type: "yearly",
        description: "12,000円/年, 12,000円年額 の形式"
    },
    {
        id: "y_yen_prefix",
        regex: /年(額)?\s*([0-9,０-９]+)円/i,
        type: "yearly",
        description: "年額12,000円 の形式"
    },
    {
        id: "y_yen_kanji_prefix",
        regex: /毎年\s*([0-9,０-９]+)円/i,
        type: "yearly",
        description: "毎年12,000円 の形式"
    },
    {
        id: "y_yen_katakana",
        regex: /イヤリー\s*([0-9,０-９]+)円/i,
        type: "yearly",
        description: "イヤリー12,000円 の形式"
    },
    {
        id: "y_yen_english",
        regex: /([0-9,０-９]+)yen\s*\/\s*year/i,
        type: "yearly",
        description: "12,000yen/year の形式"
    },
    {
        id: "d_yen_suffix",
        regex: /([0-9,０-９]+)円\s*[\/／]?\s*日(額)?/i,
        type: "daily",
        description: "100円/日, 100円日額 の形式"
    },
    {
        id: "d_yen_prefix",
        regex: /日(額)?\s*([0-9,０-９]+)円/i,
        type: "daily",
        description: "日額100円 の形式"
    },
    {
        id: "d_yen_kanji_prefix",
        regex: /毎日\s*([0-9,０-９]+)円/i,
        type: "daily",
        description: "毎日100円 の形式"
    },
    {
        id: "d_yen_english",
        regex: /([0-9,０-９]+)yen\s*\/\s*day/i,
        type: "daily",
        description: "100yen/day の形式"
    },
    // 英語表記
    {
        id: "m_en_dollar",
        regex: /\$([0-9,.]+)\s*\/\s*month/i,
        type: "monthly",
        description: "$9.99/month の形式"
    },
    {
        id: "y_en_dollar",
        regex: /\$([0-9,.]+)\s*\/\s*year/i,
        type: "yearly",
        description: "$99.99/year の形式"
    },
    {
        id: "d_en_dollar",
        regex: /\$([0-9,.]+)\s*\/\s*day/i,
        type: "daily",
        description: "$0.99/day の形式"
    },
    // その他のバリエーション
    {
        id: "m_yen_no_slash",
        regex: /([0-9,０-９]+)円\s*月(額)?/i,
        type: "monthly",
        description: "1,000円月 の形式（スラッシュなし）"
    },
    {
        id: "y_yen_no_slash",
        regex: /([0-9,０-９]+)円\s*年(額)?/i,
        type: "yearly",
        description: "12,000円年 の形式（スラッシュなし）"
    },
    {
        id: "d_yen_no_slash",
        regex: /([0-9,０-９]+)円\s*日(額)?/i,
        type: "daily",
        description: "100円日 の形式（スラッシュなし）"
    },
    // 月々・年々・日々
    {
        id: "m_yen_tsukiduki",
        regex: /月々\s*([0-9,０-９]+)円/i,
        type: "monthly",
        description: "月々1,000円 の形式"
    },
    {
        id: "y_yen_toshitoshi",
        regex: /年々\s*([0-9,０-９]+)円/i,
        type: "yearly",
        description: "年々12,000円 の形式"
    },
    {
        id: "d_yen_hibihi",
        regex: /日々\s*([0-9,０-９]+)円/i,
        type: "daily",
        description: "日々100円 の形式"
    },
    // 税込・税抜
    {
        id: "m_yen_taxout",
        regex: /([0-9,０-９]+)円\s*\(税抜\)\s*[\/／]?\s*月/i,
        type: "monthly",
        description: "1,000円(税抜)/月 の形式"
    },
    {
        id: "y_yen_taxin",
        regex: /([0-9,０-９]+)円\s*\(税込\)\s*[\/／]?\s*年/i,
        type: "yearly",
        description: "12,000円(税込)/年 の形式"
    },
    {
        id: "y_yen_taxout",
        regex: /([0-9,０-９]+)円\s*\(税抜\)\s*[\/／]?\s*年/i,
        type: "yearly",
        description: "12,000円(税抜)/年 の形式"
    },
    {
        id: "d_yen_taxin",
        regex: /([0-9,０-９]+)円\s*\(税込\)\s*[\/／]?\s*日/i,
        type: "daily",
        description: "100円(税込)/日 の形式"
    },
    {
        id: "d_yen_taxout",
        regex: /([0-9,０-９]+)円\s*\(税抜\)\s*[\/／]?\s*日/i,
        type: "daily",
        description: "100円(税抜)/日 の形式"
    }
];

export { pricingRules };
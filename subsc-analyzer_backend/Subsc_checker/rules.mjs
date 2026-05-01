// rules.mjs
// 今後、ここを100, 1000と増やしていきます。
const pricingRules = [
    {
        id: "m_yen_suffix",
        regex: /([0-9,]+)円\s*[\/／]\s*月/i,
        type: "monthly",
        description: "1,000円/月 の形式"
    },
    {
        id: "m_yen_prefix",
        regex: /月額\s*([0-9,]+)円/i,
        type: "monthly",
        description: "月額1,000円 の形式"
    },
    {
        id: "y_yen_suffix",
        regex: /([0-9,]+)円\s*[\/／]\s*年/i,
        type: "yearly",
        description: "12,000円/年 の形式"
    },
    {
        id: "y_yen_prefix",
        regex: /年額\s*([0-9,]+)円/i,
        type: "yearly",
        description: "年額12,000円 の形式"
    },
    {
        id: "d_yen_suffix",
        regex: /([0-9,]+)円\s*[\/／]\s*日/i,
        type: "daily",
        description: "100円/日 の形式"
    }
];

export { pricingRules };
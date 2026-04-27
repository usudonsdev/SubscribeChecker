import { pricingRules } from './rules.mjs';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.CACHE_TABLE_NAME;

export const lambdaHandler = async (event) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

    try {
        const { url, text } = JSON.parse(event.body);

        // 1. キャッシュチェック
        const cache = await ddbDocClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { url: url }
        }));

        if (cache.Item) {
            console.log(`[Cache Hit] URL: ${url}`);
            return { statusCode: 200, headers, body: JSON.stringify(cache.Item) };
        }

        // 2. ルール判定 ( pricingRules から最初にマッチするものを探す )
        let dailyCost = 0;
        let matchedRuleId = null;

        // .find() は見つかった瞬間にループを抜けるので、1万個あっても高速です
        const rule = pricingRules.find(r => r.regex.test(text));

        if (rule) {
            const matchResult = text.match(rule.regex);
            // 正規表現のキャプチャグループから数値を取得し、カンマを除去
            const priceStr = (matchResult[1] || matchResult[2] || "0").replace(/,/g, '');
            const price = parseInt(priceStr, 10);

            // タイプ別に1日あたりのコストを計算
            switch (rule.type) {
                case "monthly":
                    dailyCost = Math.round(price / 30);
                    break;
                case "yearly":
                    dailyCost = Math.round(price / 365);
                    break;
                case "daily":
                    dailyCost = price;
                    break;
            }
            matchedRuleId = rule.id;
        }

        const resultItem = {
            url,
            daily_cost: dailyCost,
            message: matchedRuleId ? `Matched: ${matchedRuleId}` : "No matching rules found",
            updatedAt: new Date().toISOString()
        };

        // 3. DynamoDBに保存
        await ddbDocClient.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: resultItem
        }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(resultItem)
        };

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal Server Error", details: err.message })
        };
    }
};
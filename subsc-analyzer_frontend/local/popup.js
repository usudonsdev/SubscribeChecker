import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

// クライアントの初期化（ハンドラーの外で行うことで再利用されます）
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.CACHE_TABLE_NAME;

export const lambdaHandler = async (event) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // CORS プリフライト対応
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const url = body.url || "unknown";
        const text = body.text || "";

        // --- 1. DynamoDBキャッシュをチェック ---
        console.log(`Checking cache for: ${url}`);
        const getResult = await ddbDocClient.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { url: url }
        }));

        if (getResult.Item) {
            console.log("[Cache Hit] データをDBから取得しました");
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(getResult.Item),
            };
        }

        // --- 2. キャッシュがない場合の処理（解析フェーズ） ---
        console.log("[Cache Miss] 解析ロジックを実行します");
        
        // ここに以前の「簡易判定ロジック」を入れます
        // ※将来的にここを Bedrock AI 呼び出しに置き換えます
        let monthlyPrice = 0;
        const priceMatch = text.match(/([0-9,]+)円/);
        if (priceMatch) {
            monthlyPrice = parseInt(priceMatch[1].replace(/,/g, ''));
        }

        const dailyCost = Math.round(monthlyPrice / 30);
        const resultItem = {
            url: url,
            daily_cost: dailyCost,
            message: monthlyPrice > 0 ? `月額${monthlyPrice}円から計算` : "料金が見つかりませんでした",
            updatedAt: new Date().toISOString()
        };

        // --- 3. 結果をDynamoDBに保存 ---
        await ddbDocClient.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: resultItem
        }));
        console.log("[Cache Save] 新しい結果を保存しました");

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(resultItem),
        };

    } catch (err) {
        console.error("Error details:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Internal Server Error", error: err.message }),
        };
    }
};
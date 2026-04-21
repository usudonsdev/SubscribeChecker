export const lambdaHandler = async (event) => {
    // 共通のレスポンスヘッダー
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 全てのドメインを許可
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
    };

    // 1. OPTIONS（プリフライト）への即時回答
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const response = {
            url: body.url || "no-url",
            daily_cost: 165,
            message: "CORS Fix Applied!"
        };

        // 2. 正常系
        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(response),
        };
    } catch (err) {
        // 3. 異常系（パース失敗など）
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: "Internal Error", error: err.message }),
        };
    }
};
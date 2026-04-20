export const lambdaHandler = async (event) => {
    try {
        // 拡張機能から送られてくるデータをパース
        const body = JSON.parse(event.body || "{}");
        const { url, text } = body;

        console.log("Received URL:", url);

        // 開発初期はBedrockを呼ばずに固定値を返す（完全無料！）
        const response = {
            url: url || "no-url",
            daily_cost: 165, // ダミーの計算結果
            currency: "JPY",
            message: "Mock Mode: Bedrock is not called yet.",
            timestamp: new Date().toISOString()
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // ブラウザ拡張からのアクセスを許可
                "Access-Control-Allow-Methods": "POST,OPTIONS"
            },
            body: JSON.stringify(response),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
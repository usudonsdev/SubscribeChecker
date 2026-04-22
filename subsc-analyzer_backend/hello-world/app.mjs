// backend/hello-world/app.mjs
export const lambdaHandler = async (event) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

    try {
        const body = JSON.parse(event.body || "{}");
        const receivedText = body.text || "";

        const filteredText = body.text
            .split("\n---\n")
            .filter(line => line.includes("月") || line.includes("プラン") || line.includes("込"))
            .join("\n");

        console.log("AIに送る厳選テキスト:", filteredText);

        // ★ここでターミナルに表示させる
        console.log("--- 取得したテキストの冒頭100文字 ---");
        console.log(receivedText.substring(0, 100));
        console.log("------------------------------------");

        // 簡易ロジック
        let price = 0;
        if (receivedText.includes("円")) {
            price = 500; // 仮に円という文字があれば500円とする
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                daily_cost: Math.round(price / 30),
                message: receivedText ? "テキスト解析に成功" : "テキストが空でした"
            }),
        };
    } catch (err) {
        return { statusCode: 500, headers, body: JSON.stringify({ message: "Error" }) };
    }
};
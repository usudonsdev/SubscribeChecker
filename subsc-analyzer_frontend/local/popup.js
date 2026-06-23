
// LambdaエンドポイントURL（例: API GatewayのURLに書き換えてください）
const API_ENDPOINT = 'https://your-api-gateway-url/';

document.addEventListener('DOMContentLoaded', () => {
    const checkBtn = document.getElementById('checkBtn');
    const resultSpan = document.getElementById('result');
    const statusDiv = document.getElementById('status');

    checkBtn.addEventListener('click', async () => {
        resultSpan.textContent = '-';
        statusDiv.textContent = '判定中...';

        // 現在のタブのURLとテキストを取得
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const tab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => document.body.innerText
            }, async (results) => {
                const pageText = results[0].result;
                const url = tab.url;

                try {
                    const response = await fetch(API_ENDPOINT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url, text: pageText })
                    });
                    if (!response.ok) throw new Error('APIエラー');
                    const data = await response.json();
                    resultSpan.textContent = data.daily_cost !== undefined ? data.daily_cost : '-';
                    statusDiv.textContent = data.message || '';
                } catch (err) {
                    resultSpan.textContent = '-';
                    statusDiv.textContent = 'エラー: ' + err.message;
                }
            });
        });
    });
});
document.getElementById('checkBtn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    status.textContent = "解析中...";

    // 1. 今開いているタブの情報を取得
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    try {
        // 2. ローカルで起動中のSAM APIにPOSTリクエスト
        const response = await fetch('http://127.0.0.1:3000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            url: tab.url,
            text: "dummy text" // 後でここをキーワード周辺文字に変える
        })
    });

    const data = await response.json();
    
    // 3. 結果を表示
    result.textContent = data.daily_cost;
    status.textContent = "完了！";
    } catch (error) {
    status.textContent = "API接続エラー";
    console.error(error);
    }
});
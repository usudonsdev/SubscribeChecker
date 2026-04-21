document.getElementById('checkBtn').addEventListener('click', async () => {
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    status.textContent = "解析中...";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 1. ページ内のテキストを抽出するスクリプトを実行
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // ページ全体のテキストを結合して取得（とりあえず最初の1000文字程度）
        return document.body.innerText.substring(0, 1000);
        }
    }, async (results) => {
    const pageText = results[0].result;

    try {
      // 2. 取得した本物のテキストをAPIに送る
        const response = await fetch('http://127.0.0.1:3000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                url: tab.url,
                text: pageText // ここが本物のデータ！
            })
        });

        const data = await response.json();
        result.textContent = data.daily_cost;
        status.textContent = "完了！";
        } catch (error) {
        status.textContent = "API接続エラー";
        }
    });
});
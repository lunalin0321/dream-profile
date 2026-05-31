# 黑底 IG 夢女自介模板

這是一個不用 Carrd 付費功能的單頁自介模板。直接開 `index.html` 就能看，也可以免費部署到 GitHub Pages、Netlify 或 Cloudflare Pages。

目前包含：

- 黑底 IG 私密帳風格首頁
- 多作品 / 多夢角置頂貼文模板
- 坑單區
- 社群軟體連結區
- `admin.html` 靜態後台
- `data.js` 集中管理資料

## 怎麼新增夢角

最方便的方式是打開 `admin.html`：

1. 按「新增夢角」。
2. 填作品名、夢角名、關係、雷點、標籤與代表色。
3. 按「暫存預覽」可以先在同一台電腦預覽。
4. 確定後按「下載 data.js」。
5. 把下載的 `data.js` 覆蓋 repo 裡的 `data.js`，GitHub Pages 就會更新。

如果暫存預覽後想回到 repo 目前的內容，按「清除暫存」。

也可以手動打開 `data.js`，複製 `posts` 裡任一組資料，貼到陣列最後並修改：

```js
{
  id: "09",
  work: "作品名",
  character: "夢角名",
  relation: "夢女設定 / 關係定位",
  dreamer: "夢主名",
  status: "主夢 / 副夢 / 草稿",
  boundaries: ["同擔：", "同嫁：", "雷點："],
  tags: ["#作品名", "#夢角名"],
  note: "補充設定、公開程度、委託圖或口嗨規則。",
  color: "#8cc9ff",
  icon: "star",
}
```

可用 icon：`rose`、`anchor`、`leaf`、`butterfly`、`clock`、`star`、`crown`、`feather`、`moon`、`heart`、`book`、`camera`、`mail`、`link`、`x`、`instagram`、`plurk`、`wavebox`。

也可以在後台上傳自訂 icon。上傳後會存成 `data.js` 裡的 Base64 圖片，不用另外上傳圖片檔。建議使用 512KB 以下的小圖，最好是 PNG、WebP 或 SVG。

## 怎麼改坑單

打開 `admin.html` 的「坑單」區：

- 分類標題可以寫：主坑、副坑、暫停、單純坑、待補、退坑但會提。
- 作品每行一筆，格式是：`作品｜主推｜副推｜吃CP｜備註`。
- 沒有的欄位可以留空，例如：`作品名｜主推名｜｜A/B｜暫無夢角`。
- 可以新增分類、刪除分類、上下移動。

坑單是單純作品坑位記錄，可以放沒有夢角的作品。有夢角的作品請繼續放在「夢角貼文」區。

## 怎麼改社群連結

打開 `admin.html` 的「社群連結」區：

- 平台名稱可以寫：X / Twitter、Plurk、Instagram、Wavebox、棉花糖。
- 顯示帳號 / 文字可以寫帳號、匿名留言、委託紀錄等。
- 網址請填完整連結，像 `https://x.com/your_id`。
- 說明會顯示在主頁的社群卡片裡。
- icon 可以在後台下拉選單修改。
- 也可以上傳自訂 icon；自訂圖會優先於下拉選單 icon 顯示。

## GitHub Pages 部署到另一個帳號

1. 用你要公開的 GitHub 帳號登入。
2. 建立一個新 repository，例如 `dream-profile`。
3. 上傳這個資料夾裡的檔案：`index.html`、`styles.css`、`script.js`、`data.js`、`admin.html`、`admin.css`、`admin.js`。
4. 到 repo 的 `Settings` → `Pages`。
5. Source 選 `Deploy from a branch`。
6. Branch 選 `main`，資料夾選 `/root`。
7. 儲存後等 GitHub 產生網址。

如果 repo 名稱是 `dream-profile`，網址通常會長這樣：

```text
https://你的帳號.github.io/dream-profile/
```

如果想要網址是：

```text
https://你的帳號.github.io/
```

repo 名稱要設成：

```text
你的帳號.github.io
```

## 關於後台限制

`admin.html` 是純靜態後台，適合 GitHub Pages 免費使用。它可以在瀏覽器裡編輯、暫存、匯出，但不能直接把資料寫回 GitHub，因為那需要登入權限或伺服器。

比較省事的免費流程是：

```text
admin.html 修改 → 下載 data.js → 到 GitHub 上傳覆蓋 data.js
```

## 如果還是想用 Carrd 免費版

可以照這個版型手動搭：

- 用 `Container` 做 profile header。
- 用 `Buttons` 做追蹤、發送訊息。
- 用 `Columns` 或多個 `Image/Button` 做九宮格。
- 每個夢角用一組可複製的區塊：作品名、夢角、關係、界線、標籤、備註。
- 避免用到 Carrd Pro 才有的自訂程式碼、表單、進階嵌入或多頁功能。

如果你想要自定義更強又免費，這份靜態版會比 Carrd 免費版自由。

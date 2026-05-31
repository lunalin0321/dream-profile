# 黑底 IG 夢女自介模板

這是一個不用 Carrd 付費功能的單頁自介模板。直接開 `index.html` 就能看，也可以免費部署到 GitHub Pages、Netlify 或 Cloudflare Pages。

可以自行拿去修改成自己的版本。請記得到 [Releases](https://github.com/lunalin0321/dream-profile/releases) 下載最新版 zip，不要只下載單一檔案，才不會漏掉後台、樣式或資料檔。

目前包含：

- 黑底 IG 私密帳風格首頁
- 多作品 / 多夢角置頂貼文模板
- 坑單區
- 社群軟體連結區
- `admin.html` 靜態後台
- `data.js` 集中管理資料

## 我的聯絡方式

有問題請用以下方式聯絡：

- FB：[林璐瑤](https://www.facebook.com/share/14gkWpefrFr/?mibextid=wwXIfr)
- Plurk：[🌙ℒ𝓊𝓃𝒶🌙](https://www.plurk.com/u/Luna_Tuki)

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

可用 icon：`rose`、`anchor`、`leaf`、`butterfly`、`clock`、`star`、`crown`、`feather`、`moon`、`heart`、`book`、`camera`、`mail`、`link`、`x`、`instagram`、`facebook`、`plurk`、`wavebox`。

也可以在後台上傳自訂 icon。上傳後會存成 `data.js` 裡的 Base64 圖片，不用另外上傳圖片檔。README 與後台都會標示限制：圖片尺寸不可超過 `512 × 512px`，檔案大小不可超過 `512KB`，最好是 PNG、WebP 或 SVG。

Profile 區也可以上傳頭像。頭像會存進 `data.js`，不用另外上傳圖片檔；限制是圖片尺寸不可超過 `1024 × 1024px`，檔案大小不可超過 `1MB`。未上傳頭像時，首頁會使用預設圖。

自訂 icon 有兩種模式：

- `全彩原樣`：適合彩色頭像、彩色 logo，會維持原本顏色。
- `白圖跟隨重點色`：適合白色剪影、白色符號，會跟著該夢角或社群卡的重點色變色。

優先順序是：自訂上傳 icon 大於內建 icon。只要有上傳自訂 icon，主頁就會顯示上傳圖；按「移除自訂 icon」後，才會回到下拉選單選的內建 icon。

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
- 首頁上方的「發送訊息」會自動連到第一個有網址的社群連結；想改目的地，只要在後台調整社群連結排序。
- icon 可以在後台下拉選單修改。
- 也可以上傳自訂 icon；自訂圖會優先於下拉選單 icon 顯示。

目前預設聯絡方式：

- Facebook：[林璐瑤](https://www.facebook.com/share/14gkWpefrFr/?mibextid=wwXIfr)
- Plurk：[🌙ℒ𝓊𝓃𝒶🌙](https://www.plurk.com/u/Luna_Tuki)

## 怎麼匯入到自己的 GitHub

如果你想把這份模板放到另一個 GitHub 帳號或新 repository：

1. 下載或解壓縮 `dream-profile-github-pages.zip`。
2. 登入你自己的 GitHub 帳號。
3. 建立一個新的 repository，例如 `dream-profile`。
4. Repository 必須設成 `Public`，免費版 GitHub Pages 才能啟用。
5. 進入新 repo，按 `Add file` → `Upload files`。
6. 上傳 zip 解壓後的檔案，不要只上傳 zip 本身。至少要有：
   - `index.html`
   - `styles.css`
   - `script.js`
   - `data.js`
   - `admin.html`
   - `admin.css`
   - `admin.js`
   - `README.md`
7. Commit 後，到 `Settings` → `Pages`。
8. Source 選 `Deploy from a branch`。
9. Branch 選 `main`，資料夾選 `/root`。
10. 儲存後等 1 到 5 分鐘，GitHub 會產生網站網址。

網站首頁會是：

```text
https://你的帳號.github.io/repo名稱/
```

後台會是：

```text
https://你的帳號.github.io/repo名稱/admin.html
```

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

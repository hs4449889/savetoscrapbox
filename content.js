(() => {
    chrome.browserAction.onClicked.addListener(tab => {
        chrome.storage.sync.get(null, function(items) {
            const title = tab.title.trim() || "No title";
            const url = tab.url;

            const project = items.selectedProjectName;
            const tags = items.selectedTags ? "#" + items.selectedTags.replace(/\s/g, "").split(",").join(" #") : false;
            const timestamp = `#${getTimestamp()}`;

            if (!project) {
                alert('はじめに、プロジェクトのURLをセットしましょう!');
                window.open(chrome.runtime.getURL("options.html"));
                return;
            }

            let lines = [`[${url} ${title}]`];
            if (tags) {
                lines.push("", tags);
            }
            lines.push(timestamp);

            window.open(`https://scrapbox.io/${project}/${encodeURIComponent(title)}?body=${encodeURIComponent(lines.join('\n'))}`);
        });
    });

    function getTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
})();

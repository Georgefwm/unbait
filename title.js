
function replaceTitle(node, pageType) {
    switch (pageType) {
        case "watch":
            replaceWatchTitle(node);
            break;

        case "home":
            replaceHomeTitle(node);
            break;

        case "subscriptions":
            replaceSubscriptionsTitle(node);
            break;
    }
}

function replaceWatchTitle(node) {
    var updatedTitle = node.querySelector("#video-title").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    node.querySelector("#video-title").innerText = updatedTitle;
}

function replaceHomeTitle(node) {
    var updatedTitle = node.querySelector("#video-title-link").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    node.querySelector("#video-title").innerText = updatedTitle;
}

function replaceSubscriptionsTitle(node) {
    var updatedTitle = node.querySelector("#video-title-link").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    node.querySelector("#video-title").innerText = updatedTitle;
}

function filterTitleText(originalTitle) {
    originalTitle = originalTitle.toLowerCase();

    // Remove emoji
    originalTitle = originalTitle.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "|"
    );

    return originalTitle;
}

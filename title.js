// Calls the appropriate function depending on which page requested the update
function replaceTitle(element, pageType) {
    switch (pageType) {
        case "watch":
            replaceWatchTitle(element);
            break;

        case "home":
            replaceHomeTitle(element);
            break;

        case "subscriptions":
            replaceSubscriptionsTitle(element);
            break;

        case "channels":
            replaceChannelsTitle(element);
            break;

        case "playlist":
            replacePlaylistTitle(element);
            break;
    }
}

// Makes all desired changes to title string
function filterTitleText(originalTitle) {
    originalTitle = originalTitle.toLowerCase();

    // Remove emoji
    originalTitle = originalTitle.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "|"
    );

    return originalTitle;
}

function replaceWatchTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var updatedTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    sharedParentElement.querySelector("#video-title").innerText = updatedTitle;
}

function replaceHomeTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var updatedTitle = sharedParentElement.querySelector("#video-title-link").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    sharedParentElement.querySelector("#video-title").innerText = updatedTitle;
}

function replaceSubscriptionsTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var updatedTitle = sharedParentElement.querySelector("#video-title-link").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    sharedParentElement.querySelector("#video-title").innerText = updatedTitle;
}

function replaceChannelsTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var updatedTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    sharedParentElement.querySelector("#video-title").innerText = updatedTitle;
}

function replacePlaylistTitle(element) {
    var sharedParentElement = element.closest("#container");
    var updatedTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    updatedTitle = filterTitleText(updatedTitle);

    sharedParentElement.querySelector("#video-title").innerText = updatedTitle;
}


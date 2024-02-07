// Calls the appropriate function depending on which page requested the update
async function replaceTitle(element, pageType) {
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
    var newTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    newTitle = filterTitleText(newTitle);

    sharedParentElement.querySelector("#video-title").innerText = newTitle;
}

function replaceHomeTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var newTitle = sharedParentElement.querySelector("#video-title-link").getAttribute("title");

    newTitle = filterTitleText(newTitle);

    sharedParentElement.querySelector("#video-title").innerText = newTitle;
}

function replaceSubscriptionsTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var newTitle = sharedParentElement.querySelector("#video-title-link").getAttribute("title");

    newTitle = filterTitleText(newTitle);

    sharedParentElement.querySelector("#video-title").innerText = newTitle;
}

function replaceChannelsTitle(element) {
    var sharedParentElement = element.closest("#dismissible");
    var newTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    newTitle = filterTitleText(newTitle);

    sharedParentElement.querySelector("#video-title").innerText = newTitle;
}

function replacePlaylistTitle(element) {
    var sharedParentElement = element.closest("#container");
    var newTitle = sharedParentElement.querySelector("#video-title").getAttribute("title");

    newTitle = filterTitleText(newTitle);

    sharedParentElement.querySelector("#video-title").innerText = newTitle;
}


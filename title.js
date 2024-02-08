// Calls the appropriate function depending on which page requested the update
async function replaceTitle(element, pageType) {
    switch (pageType) {
        case "home":
        case "subscriptions":
            replaceTitleDefault(element, "#dismissible", "#video-title-link");
            break;

        case "watch":
        case "channels":
        case "history":
            replaceTitleDefault(element, "#dismissible", "#video-title");
            break;

        case "playlist":
            replaceTitleDefault(element, "#container", "#video-title");
            break;

        default:
            replaceTitleDefault(element, "#dismissible", "video-title-link");
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

function replaceTitleDefault(element, sharedParentId, titleLinkElementId) {
    var sharedParentElement = element.closest(sharedParentId);
    var titleLinkElement = sharedParentElement.querySelector(titleLinkElementId);

    // This is null when video is an ad, in which case ignore
    if (!titleLinkElement)
        return;

    sharedParentElement.querySelector("#video-title").innerText = filterTitleText(titleLinkElement.getAttribute("title"));
}



async function replaceThumbnail(element, pageType) {
    switch (pageType) {
        case "home":
        case "watch":
        case "subscriptions":
        case "channels":
        case "history":
            replaceThumbnailDefault(element, "#dismissible");
            break;

        case "playlist":
            replaceThumbnailDefault(element, "#container");
            break;

        default:
            replaceThumbnailDefault(element, "#dismissible");
            break;
    }
}

function getReplacementImageLink(videoId) {
    var strippedVideoId = videoId;

    if (strippedVideoId.includes("="))
        strippedVideoId = strippedVideoId.split("=")[1] // Remove prefix

    if (strippedVideoId.includes("&"))
        strippedVideoId = strippedVideoId.split("&")[0]; // Remove suffix

    // Uses YTs image server for preview thumbnails (annoyingly los res however)
    return `https://i1.ytimg.com/vi/${strippedVideoId}/2.jpg`;
}

// True if string ENDS with "/2.jpg"
const REGEX = /\/2\.jpg$/;
// const REGEX = /(^https:\/\/i1\.ytimg\.com\/vi\/)+(.{0,12})+(\/2\.jpg$)/; // More accurate, but heavier version

// Check if thumbnail should be replaced based on URL string
function shouldReplaceImageLink(link) {
    return !REGEX.exec(link);
}

function replaceThumbnailDefault(element, sharedParentId) {
    var sharedParentElement = element.closest(sharedParentId);
    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src))
        return;

    var videoLinkElement = sharedParentElement.querySelector("a#thumbnail");

    // This is null when video is an ad, in which case ignore it
    if (!videoLinkElement.hasAttribute("href"))
        return;

    imageElement.src = getReplacementImageLink(videoLinkElement.getAttribute("href"));
}


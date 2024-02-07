// const REGEX = /(^https:\/\/i1\.ytimg\.com\/vi\/)+(.{0,12})+(\/2\.jpg$)/; // More accurate, but heavier version
const REGEX = /\/2\.jpg$/;

async function replaceThumbnail(element, pageType) {
    switch (pageType) {
        case "watch":
            replaceWatchThumbnail(element);
            break;

        case "home":
            replaceHomeThumbnail(element);
            break;

        case "subscriptions":
            replaceSubscriptionThumbnail(element);
            break;

        case "channels":
            replaceChannelsThumbnail(element);
            break;

        case "playlist":
            replacePlaylistThumbnail(element);
            break;

    }
}

function getReplacementImageLink(videoId) {
    return `https://i1.ytimg.com/vi/${videoId}/2.jpg`;
}

// check if url is the default
function shouldReplaceImageLink(link) {
    return !REGEX.exec(link);
}

function replaceWatchThumbnail(element) {
    var sharedParentElement = element.closest("#dismissible");

    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src))
        return;

    var newThumbnailLink = getReplacementImageLink(
        sharedParentElement.querySelector("a#thumbnail").getAttribute("href")
            .split("=")[1] // Remove prefix
            .split("&")[0] // Remove suffix
    );

    imageElement.src = newThumbnailLink;
}

function replaceHomeThumbnail(element) {
    var sharedParentElement = element.closest("#dismissible");

    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src)) {
        console.log("no replacing")

        return;
    }

    var newThumbnailLink = getReplacementImageLink(
        sharedParentElement.querySelector("a#thumbnail").getAttribute("href")
            .split("=")[1] // Remove prefix
            .split("&")[0] // Remove suffix
    );

    imageElement.src = newThumbnailLink;
}

function replaceSubscriptionThumbnail(element) {
    var sharedParentElement = element.closest("#dismissible");

    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src)) {
        console.log("no replacing")

        return;
    }

    var newThumbnailLink = getReplacementImageLink(
        sharedParentElement.querySelector("a#thumbnail").getAttribute("href")
            .split("=")[1] // Remove prefix
            .split("&")[0] // Remove suffix
    );

    imageElement.src = newThumbnailLink;
}

function replaceChannelsThumbnail(element) {
    var sharedParentElement = element.closest("#dismissible");

    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src)) {
        console.log("no replacing")

        return;
    }

    var newThumbnailLink = getReplacementImageLink(
        sharedParentElement.querySelector("a#thumbnail").getAttribute("href")
            .split("=")[1] // Remove prefix
            .split("&")[0] // Remove suffix
    );

    imageElement.src = newThumbnailLink;
}

function replacePlaylistThumbnail(element) {
    var sharedParentElement = element.closest("#container");

    var imageElement = sharedParentElement.querySelector(`img.yt-core-image`);

    if (!shouldReplaceImageLink(imageElement.src)) {
        console.log("no replacing")

        return;
    }

    var newThumbnailLink = getReplacementImageLink(
        sharedParentElement.querySelector("a#thumbnail").getAttribute("href")
            .split("=")[1] // Remove prefix
            .split("&")[0] // Remove suffix
    );

    imageElement.src = newThumbnailLink;
}


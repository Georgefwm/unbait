// One PageManager is assigned for every YouTube page type (home, watch, subs , etc)
// allows for dynamic startup as YouTube creates the page types on demand
class PageManager {
    observer;
    element;
    page;

    shortsObserver;
    shortsParentElement;

    constructor(targetElement) {
        this.element = targetElement;

        this.page = this.element.getAttribute("page-subtype");
        if (!this.page)
            this.page = "watch";

        // Remove shorts banners if found
        this.shortsParentElement = this.element.querySelector("ytd-rich-grid-renderer div#contents");
        if (this.shortsParentElement) {
            this.shortsObserver = new MutationObserver((mutationList, _observer) => {
                // If the mutation was not adding a direct child then exit early
                if (mutationList[0].type !== "childList" || mutationList[0].addedNodes.length <= 0)
                    return;

                for (var addedNode of mutationList[0].addedNodes) {
                    if (addedNode.localName != "ytd-rich-section-renderer")
                        continue;

                    if (addedNode.querySelectorAll("ytd-rich-shelf-renderer[is-shorts]").length == 0)
                        continue;

                    addedNode.remove();                
                }
            });

            this.shortsObserver.observe(this.shortsParentElement, {
                attributes: false,
                childList: true,
                subtree: false
            });
        }

        // when relevant change is made, update title and thumbnail
        this.observer = new MutationObserver((mutationList, _observer) => {
            for (const mutation of mutationList) {
                if (mutation.type !== "attributes")
                    break;

                var element = mutation.target;

                if (!element)
                    break;

                // this is the identifier we use for videos being ready to scan
                if (!element.classList.contains("yt-core-image--loaded"))
                    break;

                this.updateVideo(element);
            }
        });

        this.observer.observe(this.element, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }

    updateVideo(element) {
        replaceTitle(element, this.page);
        replaceThumbnail(element, this.page);
    }

    toString() {
        return `PageManager: { page: ${this.page} }`;
    }

    async removeShorts(elementList) {
        for (var element of elementList) {
            if (element.nodeName !== "YTD-RICH-SECTION-RENDERER")
                continue;

            if (element.querySelector("span#title").innerText !== "Shorts")
                continue;

            this.shortsParentElement.removeChild(element);
            return;
        }
    }
}

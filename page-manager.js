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

        this.shortsParentElement = this.element.querySelector("#contents");

        if (this.shortsParentElement) {
            this.shortsObserver = new MutationObserver((mutationList, _observer) => {
                this.removeShorts(this.shortsParentElement.children);
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

            console.log(element);
            this.shortsParentElement.removeChild(element);
            return;
        }
    }
}

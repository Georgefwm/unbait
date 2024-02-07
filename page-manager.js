class PageManager {
    observer;
    element;
    page;

    constructor(targetElement) {
        this.element = targetElement;

        this.page = targetElement.getAttribute("page-subtype");
        if (!this.page)
            this.page = "watch";

        this.observer = new MutationObserver((mutationList, _observer) => {
            for (const mutation of mutationList) {
                // if (this.page === "watch") {
                //     if (mutation.target.closest("#dismissible") != null) {
                //         console.log(mutation);
                //     }
                // }

                if (mutation.type !== "attributes")
                    break;

                // if (mutation.attributeName === "loaded")
                //     this.updateVideo(mutation.target);

                var element = mutation.target;

                if (!element)
                    break;

                if (!element.classList.contains("yt-core-image--loaded"))
                    break;

                this.updateVideo(element);
            }
        });

        // Start observing the target element for configured mutations
        this.observer.observe(targetElement, {
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
}

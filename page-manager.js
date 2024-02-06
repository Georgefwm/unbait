class PageManager {
    observer;
    node;
    page;

    constructor(targetNode) {
        this.node = targetNode;

        this.page = targetNode.getAttribute("page-subtype");
        if (!this.page)
            this.page = "watch";

        this.observer = new MutationObserver((mutationList, _observer) => {
            for (const mutation of mutationList) {
                if (mutation.type !== "attributes")
                    break;

                if (mutation.attributeName !== "loaded")
                    break;

                // Use the closest common parent of thumbnail and title elements 
                this.updateVideo(mutation.target.closest("#dismissible"));
            }
        });

        // Start observing the target node for configured mutations
        this.observer.observe(targetNode, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }

    updateVideo(node) {
        replaceTitle(node, this.page);
        replaceThumbnail(node, this.page);
    }

    toString() {
        return `PageManager: { page: ${this.page} }`;
    }
}

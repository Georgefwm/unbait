const pageManagers = [];

init(document.getElementById("page-manager"));

// Initial app setup
// Create MutationObserver which watches for changes in the YouTube page-manager
// Set a callback function to run when changes are detected
function init(targetElement) {

    const config = {
        attributes: false,
        childList: true,
        subtree: false
    };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, _observer) => {
        for (const mutation of mutationList) {
            if (mutation.type !== "childList" || mutation.addedNodes.length <= 0)
                return;

            const newManager = new PageManager(mutation.addedNodes[0]);
            pageManagers.push(newManager);
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetElement, config);
}


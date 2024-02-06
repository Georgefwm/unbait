// Planned options:
//   - lowercasify titles
//   - replace thumbnail with video preview image
//
//   - remove shorts banner (low prio)

init(document.getElementById("page-manager"));

const pageManagers = [];


// Initial app setup
// Create MutationObserver which watches for changes in a specific DOM element
// Set a callback function to run when changes are detected
function init(targetNode) {
    // Options for the observer (which mutations to observe)
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

            console.log(`new page manager created: ${newManager.toString()}`);
            console.log(`current number of page managers: ${pageManagers.length}`);
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}


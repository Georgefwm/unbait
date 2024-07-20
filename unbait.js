const pageManagers = [];
const observingFlag = "unbait-observing";

// Main
init(document.getElementById("page-manager"));

// Initial app setup
// Create MutationObserver that watches for changes in the YouTube page-manager
// Set a callback function to run when changes are detected
function init(targetElement) {

    const config = {
        attributes: false,
        childList: true,
        subtree: false
    };
    
    // Callback function to execute when mutations are observed
    const callback = (mutationList, _observer) => {
        for (var mutation of mutationList) {
            // If the mutation was not adding a direct child then exit early
            if (mutation.type !== "childList" || mutation.addedNodes.length <= 0)
                return;

            var pageNode = mutation.addedNodes[0];
            
            if (pageNode.classList.contains(observingFlag))
                return;

            attachObserver(pageNode);
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetElement, config);

    // Double check no pages where missed while setting up observer
    for (var childElement of targetElement.children) {
        if (childElement.classList.contains(observingFlag))
            continue;

        attachObserver(childElement);
    }
}

function attachObserver(targetElement) {
    var newManager = new PageManager(targetElement);
    pageManagers.push(newManager);
    
    // Add flag to make sure we aren't double setting observers
    targetElement.classList.add(observingFlag);
}

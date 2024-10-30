function(instance, properties, context) {
    // Initialize the array to keep track of elements with `alphanum`
    instance.data.alphanumInputs = instance.data.alphanumInputs || [];
    instance.data.alphanumOptions = instance.data.alphanumOptions || {};

    const alphanumOptions = {
        allow: properties.allow || undefined,
        disallow: properties.disallow || undefined,
        allowSpace: properties.allowspace,
        allowNewline: properties.allownewline,
        allowNumeric: properties.allownumeric,
        allowUpper: properties.allowupper,
        allowLower: properties.allowlower,
        allowCaseless: properties.allowcaseless,
        allowLatin: properties.allowlatin,
        allowOtherCharSets: properties.allowothercharsets,
        forceUpper: properties.forceupper,
        forceLower: properties.forcelower,
        maxLength: properties.maxlength || NaN
    };

    const areOptionsChanged = JSON.stringify(instance.data.alphanumOptions) !== JSON.stringify(alphanumOptions);

    const attachLibraryToElement = (element) => {
        if (!areOptionsChanged && instance.data.alphanumInputs.includes(element[0])) {
            return;
        }

        element.alphanum(alphanumOptions);

        if (!instance.data.alphanumInputs.includes(element[0])) {
            instance.data.alphanumInputs.push(element[0]);
        }
    };

    const isElementVisible = (element) => {
        return element.is(':visible') || element.css('display') !== 'none';
    };

    // Start observing for dynamically added elements and visibility changes
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const element = $(node);
                        const targetIds = properties.input_ids.split(',').map(id => id.trim());
                        if (targetIds.includes(node.id) && isElementVisible(element)) {
                            attachLibraryToElement(element);
                        }
                    }
                });
            } else if (mutation.attributeName === 'style') {
                // Possible visibility change; reattach if necessary
                const elementId = mutation.target.id;
                const targetIds = properties.input_ids.split(',').map(id => id.trim());
                if (targetIds.includes(elementId) && isElementVisible($('#' + elementId))) {
                    attachLibraryToElement($('#' + elementId));
                }
            }
        });
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

    // Attach the alphanum library to all currently visible elements
    if (properties.input_ids) {
        var ids = properties.input_ids.split(",");
        ids.forEach((idValue) => {
            var id = idValue.trim();
            var element = $("#" + id);

            if (isElementVisible(element)) {
                attachLibraryToElement(element);
            }
        });
    }

    // Update the stored alphanum options
    instance.data.alphanumOptions = alphanumOptions;
}
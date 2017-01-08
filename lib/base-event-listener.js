var nanoQuery = require('../vendor/nano-query'),
    jQuery = window.$ || window.jQuery || {},
    $;

if (typeof jQuery === 'function' && 'noConflict' in jQuery) {
    $ = jQuery.noConflict();
}

function __eventAction(_, interaction) {
    return function action(event) {
        return interaction.action.call(_, event, $(this));
    };
}

module.exports = function baseEventListener(action) {
    return function baseInteraction($el, interaction) {
        var _ = this;

        if ($) {
            if (interaction.target) {
                $($el).on(action, interaction.target, __eventAction(_, interaction));
            } else {
                $($el).on(action, __eventAction(_, interaction));
            }
        } else {
            $el = interaction.$element || $el;

            if (typeof $el.querySelectorAll === 'undefined' || typeof interaction.target === 'undefined') {
                $el.addEventListener(action, function(event) {
                    if (interaction.action.call(_, event, $el) === false) {
                        event.preventDefault(); // mimic jQuery's `return false`
                        event.stopPropagation();
                    };
                });
            } else {
                nanoQuery($el, interaction.target, action, function eventListener(event) {
                    if (interaction.action.call(_, event, $el) === false) {
                        event.preventDefault(); // mimic jQuery's `return false`
                        event.stopPropagation();
                    };
                });
            }
        }

    };
};

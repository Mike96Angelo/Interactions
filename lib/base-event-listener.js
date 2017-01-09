var nanoQuery = require('../vendor/nano-query');

function __eventAction(_, interaction) {
    return function action(event) {
        return interaction.action.call(_, event, interaction.$(this));
    };
}

module.exports = function baseEventListener(action) {
    return function baseInteraction(emitter, interaction) {
        var _ = this;

        if (typeof interaction.$ !== 'undefined') {
            if (interaction.target) {
                interaction.$(emitter).on(action, interaction.target, __eventAction(_, interaction));
            } else {
                interaction.$(emitter).on(action, __eventAction(_, interaction));
            }
        } else {
            emitter = interaction.emitter || emitter;

            if (typeof emitter.querySelectorAll === 'undefined' || typeof interaction.target === 'undefined') {
                emitter.addEventListener(action, function(event) {
                    if (interaction.action.call(_, event, emitter) === false) {
                        event.preventDefault(); // mimic jQuery's `return false`
                        event.stopPropagation();
                    };
                });
            } else {
                nanoQuery(emitter, interaction.target, action, function eventListener(event) {
                    if (interaction.action.call(_, event, emitter) === false) {
                        event.preventDefault(); // mimic jQuery's `return false`
                        event.stopPropagation();
                    };
                });
            }
        }

    };
};

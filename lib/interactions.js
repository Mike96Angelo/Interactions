require('./matches-polyfill');

var Generator = require('generate-js'),
    baseEventListener = require('./base-event-listener');

var Interactions = Generator.generate(function Interactions(binder, interactions, $element) {
    var _ = this;

    _.defineProperties({
        binder: binder,
        $element: $element
    });

    _.parseInteractions(interactions);
});

Interactions.actions = {};

Interactions.registerAction = function registerAction(type, action) {
    Interactions.actions[type] = action;
};

Interactions.registerActions = function registerActions(interactions) {
    for (var key in interactions) {
        Interactions.registerAction(interactions[key]);
    }
};

Interactions.definePrototype({
    parseInteractions: function parseInteractions(interactions) {
        var _ = this,
            action, key, i;

        for (key in interactions) {
            i = interactions[key];
            action = Interactions.actions[i.event] || baseEventListener(i.event);
            action.call(_.binder, _.$element, i);
        }
    },
});

if (window) window.Interactions = Interactions;

module.exports = Interactions;

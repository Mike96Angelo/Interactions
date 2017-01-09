# Interactions

[![GitHub release](https://img.shields.io/github/release/Mike96angelo/Interactions.svg?maxAge=21600)](https://github.com/Mike96Angelo/Interactions/releases)
[![npm version](https://img.shields.io/npm/v/interactions.svg?maxAge=21600)](https://www.npmjs.com/package/interactions)
[![npm downloads](https://img.shields.io/npm/dm/interactions.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=interactions&from=2017-01-01)
[![npm downloads](https://img.shields.io/npm/dt/interactions.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=interactions&from=2017-01-01)

A simple JavaScript library for creating custom browser input events.

**Currently has a very bare bones event listener setup (eg. no `target` allowed). If you have jQuery on the page, Interactions defaults to it.**

To use, simply supply a THIS argument & a map of events.

```
var INTERACTIONS = {
        clickEvent: {
            event: 'click',
            $: jQuery.noConflict(), // optional
            action: function action(e, $el) {
                var _ = this; // Equal to `thisArg` supplied to constructor (eg. DATASTORE)
                console.log('click', $el);
                return false;
            }
        },
        copy: {
            event: 'copy',
            emitter: window,
            action: function action() {
                alert('Copied to clipboard!');
            }
        }
    };

new Interactions({
    thisArg: DATASTORE,
    emitter: document.getElementById('interactions'),
    interactions: INTERACTIONS
});
```

Need a custom interaction?

```
var computer = new SomeEventEmitter();
Interactions.registerAction('shake', function eventListener(emitter, interaction) {
    var _ = this;

    computer.on('shake', function() {
        interaction.action.call(_, event, emitter)
    });
});
```

See demo/index.html for more details.

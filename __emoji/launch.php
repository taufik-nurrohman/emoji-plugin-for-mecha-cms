<?php

Config::merge('DASHBOARD.languages.MTE.plugin_emoji', $speak->plugin_emoji);

$f = 'editor.button.' . ltrim(File::B(__DIR__), '_') . '.min.';

Weapon::add('shell_after', function() use($f) {
    echo Asset::stylesheet(__DIR__ . DS . 'assets' . DS . 'shell' . DS . 'button.css', "", 'shell/' . $f . 'css');
}, 20);

Weapon::add('SHIPMENT_REGION_BOTTOM', function() use($f) {
    echo Asset::javascript(array(
        __DIR__ . DS . 'assets' . DS . 'sword' . DS . 'map.js',
        __DIR__ . DS . 'assets' . DS . 'sword' . DS . 'button.js'
    ), "", 'sword/' . $f . 'js');
}, 20);
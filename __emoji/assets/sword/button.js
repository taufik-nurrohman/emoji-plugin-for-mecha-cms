(function(w, d, base) {
    if (!base.composer) return;
    var session = base.task.session,
        speak = base.languages.MTE.plugin_emoji.title,
        name = 'smile-o plugin-emoji',
        r = session.get('__emoji_recent', false),
        recent = recent_o = r;
    function more_less(action, content, editor, callback) {
        var a = d.createElement('a');
        a.href = 'javascript:;';
        a.title = speak[1][action];
        a.innerHTML = '<i class="fa fa-' + action + '-circle"></i>';
        editor.event("click", a, callback || function() {
            recent = recent === false ? recent_o : false;
            return base.composer.grip.config.buttons[name].click(null, editor), false;
        });
        content.firstChild.appendChild(a);
    }
    base.composer.button(name, {
        title: speak[0],
        click: function(e, editor) {
            var emoji = recent || base.emoji || [],
                click = function(elem, add_to_recent) {
                    editor.event("click", elem, function() {
                        return editor.grip.tidy(' ', function() {
                            var html = elem.innerHTML,
                                title = elem.title,
                                key = elem.getAttribute('data-key');
                            if (add_to_recent) {
                                if (typeof recent_o !== "object") recent_o = [];
                                r = true;
                                recent_o.unshift([html, title, key]);
                                recent_o = recent_o.slice(0, 97);
                                session.set('__emoji_recent', recent_o);
                            }
                            editor.grip.insert(key || html);
                        }), editor.exit(true), false;
                    });
                }, s, ss;
            editor.drop('emoji', function(content) {
                content.innerHTML = '<div class="emoji-map"></div>';
                if (!recent && r) more_less('minus', content, editor);
                for (var i = 0, len = emoji.length; i < len; ++i) {
                    s = d.createElement('span');
                    ss = emoji[i][0];
                    s.tabindex = -1;
                    s.title = emoji[i][1] || "";
                    s.innerHTML = typeof ss === "number" ? '&#' + ss + ';' : ss;
                    s.setAttribute('data-key', emoji[i][2] || "");
                    click(s, !recent);
                    content.firstChild.appendChild(s);
                }
                if (recent) {
                    more_less('plus', content, editor);
                    /*
                    more_less('times', content, editor, function() {
                        session.kill('__emoji_recent');
                        recent = r = false;
                        recent_o = [];
                        return editor.exit(true), false;
                    });
                    */
                }
            });
        }
    });
})(window, document, DASHBOARD);
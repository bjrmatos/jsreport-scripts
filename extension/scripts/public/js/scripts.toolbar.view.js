﻿define(["jquery", "app", "core/utils", "core/view.base"],
    function($, app, Utils, LayoutBase) {
        return LayoutBase.extend({
            template: "scripts-toolbar",

            initialize: function() {
                $(document).on('keydown', this.hotkey.bind(this));
            },

            events: {
                "click #saveCommand": "save",
            },

            save: function() {
                var self = this;
                this.model.save({}, {
                    success: function() {
                        app.trigger("script-saved", self.model);
                    }
                });
            },

            onDomRefresh: function() {
                var self = this;
            },

            hotkey: function(e) {
                if (e.ctrlKey && e.which === 83) {
                    this.save();
                    e.preventDefault();
                    return false;
                }
            },

            onClose: function() {
                $(document).off("keydown", this.hotkey);
            }
        });
    });
﻿define(["app", "core/basicModel", "underscore"], function (app, ModelBase, _) {
   
    return ModelBase.extend({
        
        fetch: function (options) {
            var self = this;
            
            app.dataContext.scripts.toArray().then(function (items) {
                self.items = items.map(function(i) { return i.initData; });
                var empty = { name: "- not selected -", shortid: null, _id: null };
                self.items.unshift(empty);

                if (self.templateModel.get("scriptId"))
                  self.set(_.findWhere(items, { shortid: self.templateModel.get("scriptId") }).toJSON(), { silent: true });
                else 
                  self.set(empty, { silent: true });
                
                 return options.success();
            });
        },

        setTemplate: function (templateModel) {
            this.templateModel = templateModel;
            
            var self = this;
            
            this.listenTo(templateModel, "api-overrides", function(addProperty) {
                addProperty("scriptId", self.get("shortid"));
            });
        },

        initialize: function () {
            var self = this;
            this.listenTo(this, "change:shortid", function() {
                self.templateModel.set("scriptId", self.get("shortid"));
                self.set(_.findWhere(self.items, { shortid: self.get("shortid")}));
            });
        },
    });
});
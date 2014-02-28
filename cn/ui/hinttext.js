/**
 * @fileoverview A button that shows the toolbox help window.
 *
 * @author elynnlee@cs.utexas.edu (Elynn Lee)
 */

goog.provide('cn.ui.HintText');

goog.require('cn.constants');
goog.require('goog.dom.classes');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.ui.NativeButtonRenderer');



/**
 * @param {!cn.model.Game} game The game model to render.
 * @param {!cn.ui.GameUi} ui A pointer to parent game UI.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Button}
 */
cn.ui.HintText = function(game, ui, opt_renderer, opt_domHelper) {
  goog.base(this, null,
      opt_renderer,
      opt_domHelper);
  this.game_ = game;
  this.ui_ = ui;
  this.hint = '';
};
goog.inherits(cn.ui.HintText, goog.ui.Button);


/**
 * @inheritDoc
 */
cn.ui.HintText.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.dom.classes.set(
      this.getElement(), cn.constants.HINT_TEXT_CLASS_NAME);

  var EventType = goog.ui.Component.EventType;
  this.getHandler().listen(this, EventType.ACTION, function() {
      if (goog.style.getStyle(this.getElement(), 'visibility') == 'visible') {
        goog.style.setStyle(this.getElement(), 'visibility', 'hidden');
      }
  });
};

/*
 * @param {!string} hint Hint text
 */
cn.ui.HintText.prototype.setHint = function(hint) {
  this.hint = hint;
  this.updateHint_();
}

cn.ui.HintText.prototype.updateHint_ = function() {
    this.getElement().innerHtml = this.hint;
}

/**
 * Toggles visibility of help text
 */
cn.ui.HintText.prototype.toggleVisibility = function() {
  goog.style.setStyle(this.getElement(), 'visibility', 'visible');
};


/** @type {!cn.model.Game} @private */
cn.ui.HintText.prototype.game_;


/** @type {!cn.ui.GameUi} @private */
cn.ui.HintText.prototype.ui_;

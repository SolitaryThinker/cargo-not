/**
 * @fileoverview A button that shows the toolbox help window.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.ui.HelpText');

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
cn.ui.HelpText = function(game, ui, opt_renderer, opt_domHelper) {
  goog.base(this, null,
      opt_renderer,
      opt_domHelper);
  this.game_ = game;
  this.ui_ = ui;
  this.setTooltip('Show help');
};
goog.inherits(cn.ui.HelpText, goog.ui.Button);


/**
 * @inheritDoc
 */
cn.ui.HelpText.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  goog.dom.classes.set(
      this.getElement(), cn.constants.HELP_TEXT_CLASS_NAME);

  var EventType = goog.ui.Component.EventType;
  this.getHandler().listen(this, EventType.ACTION, function() {
      if (goog.style.getStyle(this.getElement(), 'visibility') == 'visible') {
        goog.style.setStyle(this.getElement(), 'visibility', 'hidden');
      }
  });
};

/**
 * Toggles visibility of help text
 */
cn.ui.HelpText.prototype.toggleVisibility = function() {
  goog.style.setStyle(this.getElement(), 'visibility', 'visible');
};


/** @type {!cn.model.Game} @private */
cn.ui.HelpText.prototype.game_;


/** @type {!cn.ui.GameUi} @private */
cn.ui.HelpText.prototype.ui_;

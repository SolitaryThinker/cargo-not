/**
 * @fileoverview A table wrapper that displays a program model, where each table
 * element is a drag-n-drop target for program instructions. Also includes a
 * toolbox as the drag-n-drop source.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.view.ProgramEditor');

goog.require('cn.controller');
goog.require('cn.model.Command');
goog.require('cn.model.Condition');
goog.require('cn.model.Game');
goog.require('cn.model.Program');
goog.require('cn.view.Animator');
goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.fx.AbstractDragDrop.EventType');
goog.require('goog.fx.DragDropGroup');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.Button');



/**
 * @param {!cn.model.Game} game The game model that includes the program to
 *     render.
 * @param {!cn.view.Animator} animator The animator window to attach events to.
 * @constructor
 */
cn.view.ProgramEditor = function(game, animator) {

  // TODO(joseph): Append these elsewhere.

  this.playButton_ = new goog.ui.Button('Play');
  this.pauseButton_ = new goog.ui.Button('Pause');
  this.resetButton_ = new goog.ui.Button('Reset');
  this.pauseButton_.setEnabled(false);
  this.resetButton_.setEnabled(false);
  this.playButton_.render();
  this.pauseButton_.render();
  this.resetButton_.render();
  this.registerButtonEvents_(game, animator);

  this.dragGroupToolbox_ = new goog.fx.DragDropGroup();
  this.dragGroupRegister_ = new goog.fx.DragDropGroup();
  this.dropGroupFunction_ = new goog.fx.DragDropGroup();
  this.dragGroupToolbox_.addTarget(this.dropGroupFunction_);
  this.dragGroupRegister_.addTarget(this.dropGroupFunction_);
  this.dragGroupRegister_.addTarget(this.dragGroupToolbox_);
  this.dragGroupToolbox_.init();
  this.dragGroupRegister_.init();
  this.registerDragEvents_();

  this.toolboxTable_ = goog.dom.createElement(goog.dom.TagName.TABLE);
  this.initToolbox_();
  goog.dom.getDocument().body.appendChild(this.toolboxTable_);

  this.registerTable_ = goog.dom.createElement(goog.dom.TagName.TABLE);
  this.initRegisters(game.program);
  goog.dom.getDocument().body.appendChild(this.registerTable_);

};


/**
 * @type {!goog.fx.DragDropGroup}
 * @private
 */
cn.view.ProgramEditor.prototype.dragGroupToolbox_;


/**
 * @type {!goog.fx.DragDropGroup}
 * @private
 */
cn.view.ProgramEditor.prototype.dropGroupFunction_;


/**
 * @type {!goog.ui.Button}
 * @private
 */
cn.view.ProgramEditor.prototype.playButton_;


/**
 * @type {!goog.ui.Button}
 * @private
 */
cn.view.ProgramEditor.prototype.pauseButton_;


/**
 * @type {!goog.ui.Button}
 * @private
 */
cn.view.ProgramEditor.prototype.resetButton_;


/**
 * @type {!Element}
 * @private
 */
cn.view.ProgramEditor.prototype.toolboxTable_;


/**
 * @type {!Element}
 * @private
 */
cn.view.ProgramEditor.prototype.registerTable_;


/**
 * @private
 */
cn.view.ProgramEditor.prototype.initToolbox_ = function() {
  var tr = goog.dom.createElement(goog.dom.TagName.TR);
  goog.object.forEach(
      cn.model.Command,
      function(command, key) {
        var td = goog.dom.createElement(goog.dom.TagName.TD);
        var div = this.createRegisterView_('pink');
        this.dragGroupToolbox_.addItem(div, command);

        // TODO(joseph): Don't use the enum text here.
        goog.dom.setTextContent(div, key);
        td.appendChild(div);
        tr.appendChild(td);
      },
      this);
  this.toolboxTable_.appendChild(tr);
};


/**
 * @param {!cn.model.Program} program The program to build a table view for.
 */
cn.view.ProgramEditor.prototype.initRegisters = function(program) {
  this.dropGroupFunction_.removeItems();
  goog.dom.removeChildren(this.registerTable_);
  goog.array.forEach(
      program.functions,
      function(instructions, f) {
        var tr = goog.dom.createElement(goog.dom.TagName.TR);
        var td = goog.dom.createElement(goog.dom.TagName.TD);
        var div = this.createRegisterView_('lightgray');
        goog.dom.setTextContent(div, 'F' + f);
        td.appendChild(div);
        tr.appendChild(td);

        goog.array.forEach(
            instructions,
            function(instruction, i) {
              var td = goog.dom.createElement(goog.dom.TagName.TD);
              var div = this.createRegisterView_('lightyellow');
              this.dropGroupFunction_.addItem(div, instruction);
              td.appendChild(div);
              tr.appendChild(td);
            },
            this);
        this.registerTable_.appendChild(tr);
      },
      this);
};


/**
 * @param {string} color The background color to draw.
 * @return {!Element} The div wrapper for a register "block".
 * @private
 */
cn.view.ProgramEditor.prototype.createRegisterView_ = function(color) {
  var div = goog.dom.createElement(goog.dom.TagName.DIV);
  goog.style.setUnselectable(div, true);
  goog.style.setStyle(div, {
    'background-color': color,
    'width': '50px',
    'height': '50px',
    'text-align': 'center',
    'border': '1px solid black'
  });
  return div;
};


/**
 * @param {!cn.model.Game} game The game model that includes the program to
 *     render.
 * @param {!cn.view.Animator} animator The animator window to attach events to.
 * @private
 */
cn.view.ProgramEditor.prototype.registerButtonEvents_ =
    function(game, animator) {
  var EventType = goog.ui.Component.EventType;
  goog.events.listen(this.playButton_, EventType.ACTION, function() {
    if (this.resetButton_.isEnabled()) {
      cn.controller.resume(animator);
    } else {
      cn.controller.play(game, animator);
    }
    this.playButton_.setEnabled(false);
    this.pauseButton_.setEnabled(true);
    this.resetButton_.setEnabled(true);
  }, false, this);

  goog.events.listen(this.pauseButton_, EventType.ACTION, function() {
    cn.controller.pause(animator);
    this.pauseButton_.setEnabled(false);
    this.playButton_.setEnabled(true);
  }, false, this);

  goog.events.listen(this.resetButton_, EventType.ACTION, function() {
    // TODO(joseph): Implement this function.
    //cn.controller.reset(game, animator);
    this.resetButton_.setEnabled(false);
    this.pauseButton_.setEnabled(false);
    this.playButton_.setEnabled(true);
  }, false, this);
};


/**
 * @private
 */
cn.view.ProgramEditor.prototype.registerDragEvents_ = function() {
  var EventType = goog.fx.AbstractDragDrop.EventType;

  goog.events.listen(this.dragGroupToolbox_, EventType.DROP, function(e) {
    goog.dom.removeNode(e.dragSourceItem.element);
  });

  goog.events.listen(this.dragGroupToolbox_, EventType.DRAGSTART, function(e) {
    goog.style.setOpacity(e.dragSourceItem.element, 0.5);
  });
  goog.events.listen(this.dragGroupRegister_, EventType.DRAGSTART, function(e) {
    var command = e.dragSourceItem.data.command;
    cn.controller.removeCommand(e.dragSourceItem.data);
    e.dragSourceItem.data = command;
    goog.style.setOpacity(e.dragSourceItem.element, 0.5);
  });

  var setOpaque = function(e) {
    goog.style.setOpacity(e.dragSourceItem.element, 1.0);
  };
  goog.events.listen(this.dragGroupToolbox_, EventType.DRAGEND, setOpaque);
  goog.events.listen(this.dragGroupRegister_, EventType.DRAGEND, setOpaque);

  goog.events.listen(this.dropGroupFunction_, EventType.DRAGOVER, function(e) {
    e.dropTargetItem.element.style.background = 'yellow';
  });

  goog.events.listen(this.dropGroupFunction_, EventType.DRAGOUT, function(e) {
    e.dropTargetItem.element.style.background = 'lightyellow';
  });

  goog.events.listen(this.dropGroupFunction_, EventType.DROP, function(e) {
    var element = e.dragSourceItem.element;
    if (e.dragSource == this.dragGroupToolbox_) {
      element = e.dragSourceItem.element.cloneNode(true);
      this.dragGroupRegister_.addItem(element, e.dropTargetItem.data);
    }
    goog.style.setOpacity(element, 1.0);
    goog.dom.removeChildren(e.dropTargetItem.element);
    e.dropTargetItem.element.appendChild(element);
    cn.controller.setCommand(e.dropTargetItem.data, e.dragSourceItem.data);
    if (e.dragSource == this.dragGroupRegister_) {
      e.dragSourceItem.data = e.dropTargetItem.data;
    }
  }, false, this);
};
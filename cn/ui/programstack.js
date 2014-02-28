/**
 * @fileoverview The stack visualization shown to the user
 *
 * @author shan.vicki@gmail.com (Vicki Shan)
 */

goog.provide('cn.ui.ProgramStack');

goog.require('cn.constants');
goog.require('cn.ui.ClassComponent');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.array');
goog.require('goog.fx.dom');



/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {cn.ui.ClassComponent}
 */
cn.ui.ProgramStack = function(opt_domHelper) {
  goog.base(this, cn.constants.PROGRAM_STACK_CLASS_NAME, opt_domHelper);
  this.instructions = [];
};
goog.inherits(cn.ui.ProgramStack, cn.ui.ClassComponent);

/**
 * @inheritDoc
 */
cn.ui.ProgramStack.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

};

/**
 * @param {Array} instructions instructions to update the stack visualization with.
 */
cn.ui.ProgramStack.prototype.update = function(instructions) {
  this.removeChildren(true);
  this.instructions = instructions;
  this.redraw();
};

/**
 * Pop the stack
 */
cn.ui.ProgramStack.prototype.getInstructions = function() {
  return this.instructions;
};

/**
 * Pop the stack
 */
cn.ui.ProgramStack.prototype.pop = function(animate) {
  var first = this.instructions.shift();
  console.log("get container");
  // var instruction = goog.dom.getElementByClass(cn.constants.PROGRAM_STACK_INSTRUCTION_CLASS_NAME);
  // console.log(instruction);
  // if(animate) {
  //   var anim = new goog.fx.dom.FadeOutAndHide(instruction, 300);
  //   goog.events.listen(anim, goog.fx.Animation.EventType.END, function() {
  //     this.removeChildren(true);
  //     this.redraw();
  //   });
  //   anim.play();
  // } else {
  this.removeChildren(true);
  this.redraw();
  // }
  return first;
};

/**
 * Peek at the top of the stack
 */
cn.ui.ProgramStack.prototype.peek = function() {
  return (this.instructions.length == 0) ? null : this.instructions[0];
};

cn.ui.ProgramStack.prototype.pushFunction = function(f) {
  var stack = []
  for(var i = 0; i < f.length; i++) {
    if(f[i].command != null) stack.push(f[i]);
  }
  console.log("function to add ", stack);
  var pstack = this.instructions;
  console.log("old stack ", pstack);
  var first = pstack.shift();
  console.log("first should be a func ", first);
  goog.array.forEach(pstack, function(s) {
    stack.push(s);
  })

  stack.unshift(first);
  console.log("new stack ", stack);

  this.instructions = stack;
}

/**
 * Reset the stack
 */
cn.ui.ProgramStack.prototype.reset = function() {
  this.removeChildren(true);
  this.instructions = [];
};

cn.ui.ProgramStack.prototype.isEmpty = function() {
  return this.instructions.length === 0;
}

cn.ui.ProgramStack.prototype.redraw = function() {
  for(var i = 0; i < this.instructions.length; i++) {
    if(this.instructions[i].command == null) {
      continue;
    }

    var cond = this.instructions[i].condition;
    if(cond === null) cond = "null";

    this.addChild(
      new cn.ui.ClassContainer(
        cn.constants.PROGRAM_STACK_INSTRUCTION_CLASS_NAME,
        [new cn.ui.ClassComponent(cn.constants.CONDITION_CLASS_NAMES[cond.toUpperCase()], null),
        new cn.ui.ClassComponent(cn.constants.COMMAND_CLASS_NAMES[this.instructions[i].command.toUpperCase()], null)],
        null, null), true);

    console.log("finished redraw");
  }
}
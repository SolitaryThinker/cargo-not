/**
 * @fileoverview The lists of actions that determine the bot's behavior.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.model.Program');

goog.require('cn.model.Command');
goog.require('cn.model.Condition');
goog.require('cn.model.Instruction');
goog.require('cn.model.Resettable');
goog.require('cn.ui.ProgramStack');
goog.require('goog.array');


/** @typedef {{f: number, i: number}} */
cn.model.Pointer;



/**
 * @constructor
 * @implements {cn.model.Resettable}
 */
cn.model.Program = function() {
  this.init([1], null);
};


/**
 * Index of the currently executing function.
 * @type {number}
 * @private
 */
cn.model.Program.prototype.f_;


/**
 * Index of the currently executing instruction.
 * @type {number}
 * @private
 */
cn.model.Program.prototype.i_;


/** @type {Array.<Array.<!cn.model.Instruction>>} */
cn.model.Program.prototype.functions;


/**
 * @type {Array.<Array.<!cn.model.Pointer>>}
 * @private
 */
cn.model.Program.prototype.pointers_;


/**
 * Initialize the program with the given instruction lengths.
 * @param {Array.<number>} lengths Lengths for each function.
 */
cn.model.Program.prototype.init = function(lengths, pstack) {
  this.f_ = 0;
  this.i_ = 0;
  this.pointers_ = [];
  this.functions = [];
  goog.array.forEach(
      lengths,
      function(length) {
        this.functions.push(this.createFunction_(length));
      },
      this);
  this.programStack = pstack;
};


/**
 * Initialize a single function with the given length.
 * @param {number} length The length for the function.
 * @return {Array.<!cn.model.Instruction>} The newly created function.
 * @private
 */
cn.model.Program.prototype.createFunction_ = function(length) {
  var instructions = [];
  for (var i = 0; i < length; i++) {
    instructions.push(new cn.model.Instruction());
  }
  return instructions;
};


/**
 * @return {!cn.model.Instruction} The currently executing instruction.
 * @private
 */
cn.model.Program.prototype.current_ = function() {
  return this.functions[this.f_][this.i_];
};


/**
 * @return {boolean} True if the pointer is at the end of a function.
 * @private
 */
cn.model.Program.prototype.atEndOfFunction_ = function() {
  return this.i_ >= this.functions[this.f_].length ||
      !this.current_().hasCommand();
};


/**
 * @return {boolean} True if the program has a next instruction or can return
 *     to the caller from the current function.
 * @private
 */
cn.model.Program.prototype.hasNext_ = function() {
  return this.pointers_.length > 0 || !this.atEndOfFunction_();
};

/**
 * Updates the program pointers and returns the instruction to execute.
 * @param {!cn.model.Bot} bot The bot to check the instruction's condition
 *     against.
 * @return {?cn.model.Instruction} The next instruction or null if there are no more
 *     instructions to execute.
 */
cn.model.Program.prototype.next = function(bot) {
  console.log("progstack ", this.programStack.getInstructions());
  if (!this.hasNext_()) {
    this.i_++;
    return null;
  }

  // Pop the most recent stack pointer and return to the caller by recursively
  // calling this function.
  if (this.atEndOfFunction_()) {
    var pointer = this.pointers_.pop();
    console.log("popped ", this.functions[pointer.f][pointer.i]);
    this.f_ = pointer.f;
    this.i_ = pointer.i;
    return this.next(bot);
  }

  var instruction = this.current_();

  // Skip this instruction if its condition fails.
  if (!instruction.passesCondition(bot)) {
    this.i_++;
    // Pop off function call
    this.programStack.pop(true);
    return this.next(bot);
  }

  // Update the pointer stack and call the function, then return the function
  // call instruction.
  if (instruction.isFunctionCall()) {
    this.pointers_.push({f: this.f_, i: this.i_ + 1});
    console.log("pushed ", this.functions[this.f_][this.i_ + 1]);
    this.f_ = instruction.getFunctionCall();
    this.i_ = 0;
    // Pop off function call
    // this.programStack.pop();
    this.programStack.pop(true);
    // Push on the next function
    this.programStack.pushFunction(this.functions[this.f_]);
    return instruction;
  }

  // Simplest case. Just move to the next instruction.
  this.i_++;
  this.programStack.pop(false);
  return instruction;
};

/**
 * Returns the current state of the program.
 * @return {Array} The next command or null if there are no more
 *     instructions to execute.
 */
cn.model.Program.prototype.startTransaction = function() {
  var pointers = goog.array.clone(this.pointers_)
  var i = this.i_;
  var f = this.f_;
  return [pointers, i, f];
};


/**
 * Sets the program state to the state given.
 * @param {Array} state The original state.
 */
cn.model.Program.prototype.rollback = function(state) {
  this.pointers_ = state[0];
  this.i_ = state[1];
  this.f_ = state[2];
};

/**
 * @return {number} The current function index.
 */
cn.model.Program.prototype.getCurrentFunction = function() {
  return this.f_;
};


/**
 * @return {number} The current instruction index.
 */
cn.model.Program.prototype.getCurrentInstruction = function() {
  return this.i_;
};


/**
 * @return {number} The caller's function index or -1 if no caller.
 */
cn.model.Program.prototype.getCallerFunction = function() {
  return goog.array.isEmpty(this.pointers_) ?
      -1 :
      goog.array.peek(this.pointers_).f;
};


/**
 * @return {number} The caller's instruction index or -1 if no caller.
 */
cn.model.Program.prototype.getCallerInstruction = function() {
  return goog.array.isEmpty(this.pointers_) ?
      -1 :
      goog.array.peek(this.pointers_).i;
};


/**
 * Resets the current pointers and call stack.
 */
cn.model.Program.prototype.reset = function() {
  this.f_ = 0;
  this.i_ = 0;
  goog.array.clear(this.pointers_);
};


/**
 * Clears all commands and conditionals.
 */
cn.model.Program.prototype.clear = function() {
  goog.array.forEach(
      this.functions,
      function(instructions) {
        goog.array.forEach(
            instructions,
            function(instruction) {
              instruction.command = null;
              instruction.condition = null;
            });
      });
};


/**
 * @return {number} The total number of instructions used.
 */
cn.model.Program.prototype.instructionCount = function() {
  var count = 0;
  goog.array.forEach(
      this.functions,
      function(instructions) {
        goog.array.forEach(
            instructions,
            function(instruction) {
              if (goog.isDefAndNotNull(instruction.command)) {
                count++;
              }
            });
      });
  return count;
};


/**
 * @return {boolean} True if the program has started.
 */
cn.model.Program.prototype.hasStarted = function() {
  var isReset =
      this.f_ == 0 && this.i_ == 0 && goog.array.isEmpty(this.pointers_);
  return !isReset;
};

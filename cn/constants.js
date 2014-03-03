/**
 * @fileoverview All game constants in one file.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.constants');


/** @type {number} @const */
cn.constants.GAME_WIDTH = 750;


/** @type {number} @const */
cn.constants.GAME_HEIGHT = 300;


/** @type {number} @const */
cn.constants.GAME_MARGIN = 1;


/** @type {string} @const */
cn.constants.GAME_COLOR = 'white';


/** @type {number} @const */
cn.constants.GOAL_WIDTH = 375;


/** @type {number} @const */
cn.constants.GOAL_HEIGHT = 176;


/** @type {number} @const */
cn.constants.GOAL_MARGIN = 100;


/** @type {string} @const */
cn.constants.BOT_COLOR = '#909090';


/** @type {number} @const */
cn.constants.BOT_SPEED_MIN = 3;


/** @type {number} @const */
cn.constants.BOT_SPEED_MAX = 20;


/** @type {number} @const */
cn.constants.LEVEL_HEIGHT = 10;


/** @type {string} @const */
cn.constants.LEVEL_COLOR = cn.constants.BOT_COLOR;


/** @type {number} @const */
cn.constants.STACK_WIDTH = 40;


/** @type {number} @const */
cn.constants.STACK_HEIGHT = 10;


/** @type {string} @const */
cn.constants.STACK_COLOR = cn.constants.LEVEL_COLOR;


/** @type {number} @const */
cn.constants.CARGO_SIZE = 20;


/** @type {string} @const */
cn.constants.GAME_UI_CLASS_NAME = goog.getCssName('cn-game-ui');


/** @type {string} @const */
cn.constants.GAME_LOGO_CLASS_NAME = goog.getCssName('cn-game-logo');


/** @type {string} @const */
cn.constants.HEADING_CLASS_NAME = goog.getCssName('cn-heading');


/** @type {string} @const */
cn.constants.GAME_CANVAS_CLASS_NAME = goog.getCssName('cn-game-canvas');


/** @type {string} @const */
cn.constants.GAME_CANVAS_CONTAINER =
    goog.getCssName('cn-game-canvas-container');


/** @type {string} @const */
cn.constants.ANIMATED_GAME_CANVAS_CLASS_NAME =
    goog.getCssName('cn-game-canvas-animated');


/** @type {string} @const */
cn.constants.LEVEL_SELECTOR_CLASS_NAME = goog.getCssName('cn-level-selector');

/** @type {string} @const */
cn.constants.RIGHT_PANEL_CONTAINER =
    goog.getCssName('cn-right-panel-container');

/** @type {string} @const */
cn.constants.LEVEL_SELECTOR_CONTAINER =
    goog.getCssName('cn-level-selector-container');


/** @type {string} @const */
cn.constants.CONTROLS_CLASS_NAME = goog.getCssName('cn-controls');


/** @type {string} @const */
cn.constants.CONDITION_CLASS_NAME = goog.getCssName('cn-condition');


/** @type {string} @const */
cn.constants.COMMAND_CLASS_NAME = goog.getCssName('cn-command');

/** @type {string} @const */
cn.constants.REQUIRED_LEVEL_CLASS_NAME = goog.getCssName('cn-required');

/** @type {string} @const */
cn.constants.COMPLETED_LEVEL_CLASS_NAME = goog.getCssName('cn-completed');


/**
 * Enum of CSS class names for all possible program commands.
 * @enum {string}
 */
cn.constants.COMMAND_CLASS_NAMES = {
  'LEFT': goog.getCssName('cn-command-left'),
  'RIGHT': goog.getCssName('cn-command-right'),
  'DOWN': goog.getCssName('cn-command-down'),
  'F0': goog.getCssName('cn-command-f0'),
  'F1': goog.getCssName('cn-command-f1'),
  'F2': goog.getCssName('cn-command-f2'),
  'F3': goog.getCssName('cn-command-f3')
};

cn.constants.REQUIRED_LEVEL_CLASS_NAMES = {
  'LEARN 2 STACK \'EM': goog.getCssName('cn-level-learn-2-stack-em'),
  'TRANSPORTER': goog.getCssName('cn-level-transporter'),
  'RE-CURSES': goog.getCssName('cn-level-re-curses'),
  'GO LEFT': goog.getCssName('cn-level-go-left'),
  'GO LEFT 2': goog.getCssName('cn-level-go-left-2'),
  'THE STACKER': goog.getCssName('cn-level-the-stacker'),
  'CLARITY': goog.getCssName('cn-level-clarity'),
  'COME TOGETHER': goog.getCssName('cn-level-come-together'),
  'UP THE GREENS': goog.getCssName('cn-level-up-the-greens')
}

/**
 * Enum of CSS class names for all possible program conditionals.
 * @enum {string}
 */
cn.constants.CONDITION_CLASS_NAMES = {
  'NONE': goog.getCssName('cn-condition-none'),
  'ANY': goog.getCssName('cn-condition-any'),
  'RED': goog.getCssName('cn-condition-red'),
  'GREEN': goog.getCssName('cn-condition-green'),
  'BLUE': goog.getCssName('cn-condition-blue'),
  'YELLOW': goog.getCssName('cn-condition-yellow'),
  'NULL' : goog.getCssName('cn-condition-null')
};


/** @type {string} @const */
cn.constants.TOOLBOX_CLASS_NAME = goog.getCssName('cn-toolbox');


/** @type {string} @const */
cn.constants.FULL_TOOLBOX_CLASS_NAME = goog.getCssName('cn-full-toolbox');


/** @type {string} @const */
cn.constants.TOOLBOX_CONTAINER = goog.getCssName('cn-toolbox-container');

/** @type {string} @const */
cn.constants.PROGRAM_STACK_CONTAINER = goog.getCssName('cn-program-stack-container');

/** @type {string} @const */
cn.constants.HINT_BUTTON_CLASS_NAME = goog.getCssName('cn-hint-button');

/** @type {string} @const */
cn.constants.HELP_BUTTON_CLASS_NAME = goog.getCssName('cn-help-button');

/** @type {string} @const */
cn.constants.HELP_TEXT_CLASS_NAME = goog.getCssName('cn-help-text');

/** @type {string} @const */
cn.constants.HINT_TEXT_CLASS_NAME = goog.getCssName('cn-hint-text');

/** @type {string} @const */
cn.constants.PROGRAM_EDITOR_CLASS_NAME = goog.getCssName('cn-program-editor');

/** @type {string} @const */
cn.constants.PROGRAM_STACK_CLASS_NAME = goog.getCssName('cn-program-stack');

/** @type {string} @const */
cn.constants.PROGRAM_STACK_INSTRUCTION_CLASS_NAME = goog.getCssName('cn-program-stack-instruction');

/** @type {string} @const */
cn.constants.FUNCTION_EDITOR_CLASS_NAME = goog.getCssName('cn-function-editor');


/** @type {Array.<string>} @const */
cn.constants.FUNCTION_CLASS_NAMES = [
  goog.getCssName('cn-register-f0'),
  goog.getCssName('cn-register-f1'),
  goog.getCssName('cn-register-f2'),
  goog.getCssName('cn-register-f3')
];


/** @type {string} @const */
cn.constants.REGISTER_CLASS_NAME = goog.getCssName('cn-register');


/** @type {string} @const */
cn.constants.CONDITION_REGISTER_CLASS_NAME =
    goog.getCssName('cn-condition-register');


/** @type {string} @const */
cn.constants.COMMAND_REGISTER_CLASS_NAME =
    goog.getCssName('cn-command-register');

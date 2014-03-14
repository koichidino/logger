define(
    [],
    function() {

  /**
   * log levels.
   */
  var Levels = {
    'ALL': 0,
    'TRACE': 1,
    'LOG': 1,
    'INFO': 2,
    'DEBUG': 3,
    'WARN': 4,
    'ERROR': 5,
    'FATAL': 6,
    'OFF': 7
  };

  /**
   * Current level setting.
   */
  mode = Levels.ALL;

  /**
   * Logger module
   * @return {function} log, trace, debug, info, warn, error, fatal, setLevel
   * @example
   *   Logger.log('hello');
   *   Logger.debug('world');
   *   Logger.info('hello');
   *   Logger.warn('world);
   *
   *   Logger.setLevel(icamera.log.Levels.DEBUG);
   */
  var Logger = function() {
    //this.alertFallback = true; ??
    this.level = mode;

  };

  Logger.prototype = {
  //return {
    log: function(msg) {
      if (this.level <= Levels.LOG) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        console.log('%c' + output + ' --- %c' + getLine(), 'color: #111111;', 'color: #777777; ');
      }
    },
    trace: function(msg) {
      if (this.level <= Levels.TRACE) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        console.log('%c' + output + ' - %c' + getLine(), 'color: #111111;', 'color: #777777; ');
      }
    },
    debug: function(msg) {
      if (this.level <= Levels.DEBUG) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        if (typeof console.debug === 'function')
          console.debug('%c' + output + ' - %c' + getLine() , 'color: #000080; font-weight:bold;' ,'color: #777777;');
        else
          console.log('%c' + output + ' - %c' + getLine() , 'color: #000080; font-weight:bold;' ,'color: #777777;');
      }
    },
    info: function(msg) {
      if (this.level <= Levels.INFO) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;

        console.log('%c' + output + ' - %c' + getLine() , 'color: #228b22; ' ,'color: #777777;');
      }
    },
    warn: function(msg) {
      if (this.level <= Levels.WARN) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        console.warn('%c' + output, "color:" + '#d2691e' + ";");
      }
    },
    error: function(msg) {
      if (this.level <= Levels.ERROR) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        console.error('%c' + output, "color:" + 'red' + ";font-weight:bold;");
      }
    },
    fatal: function(msg) {
      if (this.level <= Levels.FATAL) {
        var output;
        if (typeof msg === 'object')
          output = JSON.stringify(msg);
        else
          output = msg;
        console.error('%c' + output, 'color: #baba55; background: #222; font-weight:bold;');
      }
    },
    setLevel: function(logLevel){
      this.level = logLevel;
    }
  };

  /**
   * get log Line number
   */
  function getLine() {
  //  var e = new Error();
  //  // now magic will happen: get line number from callstack
  //  var line = e.stack.split('\n')[3].split(':')[1];
  //  return line;

    var stack = new Error().stack;
//    console.log('------[' + JSON.stringify(stack) + ']-----------');
    if (stack) {
//      var split = stack.split("\n")[3].split("/");
//      var file = stack.split("\n")[3].split("/")[split.length - 1].split(":")[0];
//      var line = stack.split("\n")[3].split(":")[3];

      var split = stack.split("\n")[5].split("/");
      var file = stack.split("\n")[5].split("/")[split.length - 1].split(":")[0];
      var line = stack.split("\n")[5].split(":")[3];
    //  var file = stack.split("\n")[2].split("/")[4].split("?")[0]
    //  var line = stack.split("\n")[2].split(":")[5];
    //  console.log('file: ' + file);
    //  console.log('line: ' + line);
      return file + ':' + line;
    } else {
      return;
    }
  }


  return Logger;
});


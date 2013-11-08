var Organel = require("organic").Organel

module.exports = Organel.extend( function(plasma, config){
  Organel.call(this, plasma);

  this.config = config;

  this.logger = console
  if(config.target)
    if(typeof config.target == "string")
      this.logger = require(config.target)
    else
      this.logger = config.target

  if(config.prefixConsoleWithTimestamps)
    this.prefixWithTimestamps({target: this.logger, methods: config.timeStampMethods || ["log", "error"]})

  if(config.listenUncaughtExceptions) {
    var self = this
    this.uncaughtExceptionHandler = function(err){
      self.logException(err)
    }
    process.addListener("uncaughtException", this.uncaughtExceptionHandler)
    this.on("kill", function(){
      if(config.prefixConsoleWithTimestamps)
        self.unprefixWithTimestamps({target: self.logger, methods: config.timeStampMethods || ["log", "error"]})
      process.removeListener("uncaughtException", self.uncaughtExceptionHandler)
      return false
    })
  }
}, {
  logException: function(c) {
    if(c.stack)
      this.logger.error(c.stack);
    else
      this.logger.error(c);
  },
  prefixWithTimestamps: function(c) {
    var self = this
    c.methods.forEach(function(methodName){
      c.target["original$"+methodName] = c.target[methodName]
      c.target[methodName] = function(){
        var args = [(new Date).toString(), methodName.toUpperCase()]
        for(var i = 0; i<arguments.length; i++)
          args.push(arguments[i])
        c.target["original$"+methodName].apply(c.target, args);
      }
    })
  },
  unprefixWithTimestamps: function(c){
    c.methods.forEach(function(methodName){
      c.target[methodName] = c.target["original$"+methodName]
      delete c.target["original$"+methodName]
    })
  }
})

var Chemical = require("organic").Chemical;
var Logger = require("../index");
var Plasma = require("organic").Plasma;

describe("Logger", function(){

  var plasma = new Plasma();
  var config = {
    "listenUncaughtExceptions": true,
    "prefixConsoleWithTimestamps": true,
    "target": {
      log: function(){
        this.logged = arguments
      },
      error: function(){
        this.errored = arguments
      }
    }
  };

  var instance = new Logger(plasma, config);

  it("should console log and error with timestamp", function(){
    instance.logger.log("test")
    expect(instance.logger.logged).toBeDefined()
    expect(instance.logger.logged[2]).toContain("test")
    expect(instance.logger.logged[0]).toContain("GMT")

    instance.logger.error("errortest")
    expect(instance.logger.errored).toBeDefined()
    expect(instance.logger.errored[2]).toContain("errortest")
  });

  it("should trap exception", function(){
    process.emit("uncaughtException", new Error("custom exception"));
    expect(instance.logger.errored).toBeDefined()
    expect(instance.logger.errored[2]).toContain("custom")
  });

  it("should unprefix log and error", function(){
    instance.unprefixWithTimestamps({target: instance.logger, methods: ["log", "error"]})
    instance.logger.log("test2")
    expect(instance.logger.logged[0]).toContain("test2")
    expect(instance.logger.logged[0]).not.toContain("GMT")
  })

  it("should untrap exceptions on kill", function(){
    plasma.emit("kill")
    process.emit("uncaughtException", new Error("custom2 exception"));
    expect(instance.logger.errored[2]).not.toContain("custom2")
  })

});

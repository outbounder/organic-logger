organel | dna & defaults:

* prefixConsoleWithTimestamps - `false`

  instructs including modified version of [clim](http://github.com/epeli/node-clim.git) 
  which will monkey-patch `console` object so that any further usage will include 
  prefixed timestamp

* attachHttpServerErrorMiddleware - `false`

  instructs start listening for `HttpServer` Chemical containing `ExpressHttpServer data` 
  instance for attaching middleware responsible to piping any found errors to `console.error`
  method

* listenUncaughtExceptions - `false`

  instructs to do `process.addListener("uncaughtException", ...)` , which will then pipe any 
  errors to `console.error` method

# incoming | HttpServer

does not aggrigates the chemical

* data - ExpressHttpServer instance

# incoming | Logger 

does simple console.log( `chemical` )
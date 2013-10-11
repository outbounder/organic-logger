# organic-httpserver

The organelle provides ondemand utilities supporting console logging (`console.log`)

## DNA structure and defaults

    {
      "prefixConsoleWithTimestamps": false,
      "timeStampMethods": ["log", "error"], /* optional */
      "listenUncaughtExceptions": false,
      "target": console /* optional */
    }

- `target`
It is optional property. Defaults to `console` global object.
If set it will be used as target of logger either
by requiring given path as String or directly using it as Object.

- `prefixConsoleWithTimestamps`
Wraps methods on `target` using `timeStampMethods` property as source and prepends timestamp
before calling original methods.

## Reacts to chemicals

### type: "kill"

effective only when listening and logging uncaughtExceptions emitted on `process` object

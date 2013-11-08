# organic-logger

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
Wraps methods on `target` using `timeStampMethods` property as source and prepends `current timestamp`
and `used method name to uppercase` before calling original methods.

- `listenUncaughtExceptions`
addes event listener to `process` global object for piping any exceptions to `target.error` method

- `timeStampMethods`
optional, defines which methods to be hijacked with timestamps when `prefixConsoleWithTimestamps` is enabled

## Reacts to chemicals

### type: "kill"

effective only when listening and logging uncaughtExceptions emitted on `process` object

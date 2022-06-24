var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let FileMgmtAPI_Sample;
        (function (FileMgmtAPI_Sample) {
            function TcHMIRequestEx(ReqSymbol) {
                if (TcHmi.Server.isWebsocketReady()) {
                    // Request object.
                    var request = {
                        'requestType': 'ReadWrite', 'commands': [ReqSymbol]
                    };
                    // Send request to TwinCAT HMI Server.
                    TcHmi.Server.requestEx(request, {
                        timeout: 2000
                    }, function (data) {
                        // Callback handling.
                        if (data.error !== TcHmi.Errors.NONE) {
                            // Handle TcHmi.Server class level error here.
                            return;
                        }
                        var response = data.response;
                        if (!response || response.error !== undefined) {
                            // Handle TwinCAT HMI Server response level error here.
                            return;
                        }
                        var commands = response.commands;
                        if (commands === undefined) {
                            return;
                        }
                        for (var i = 0, ii = commands.length; i < ii; i++) {
                            var command = commands[i];
                            if (command === undefined) {
                                return;
                            }
                            if (command.error !== undefined) {
                                // Handle TwinCAT HMI Server command level error here.
                                return;
                            }
                            // Handle result...
                            //TcHmi.Log.debug(command.symbol+'='+command.readValue); // TS knows this is a boolean
                            console.log(command.readValue);
                        }
                    });
                }
            }
            FileMgmtAPI_Sample.TcHMIRequestEx = TcHMIRequestEx;
        })(FileMgmtAPI_Sample = Functions.FileMgmtAPI_Sample || (Functions.FileMgmtAPI_Sample = {}));
        Functions.registerFunctionEx('TcHMIRequestEx', 'TcHmi.Functions.FileMgmtAPI_Sample', FileMgmtAPI_Sample.TcHMIRequestEx);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=TcHMIRequestEx.js.map
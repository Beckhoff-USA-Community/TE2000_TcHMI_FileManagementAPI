var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let FileMgmtAPI_Sample;
        (function (FileMgmtAPI_Sample) {
            function UploadFile(targetPath) {
                /**
                 * Called when menubar buttton upload is pressed.
                 * Opens file upload dialog, allows users to upload files to current active path
                 */
                const onUploadFilesPressed = () => {
                    // Create a dummy HTMLAnchorElement
                    var inputElement = document.createElement('input');
                    inputElement.type = 'file';
                    inputElement.multiple = true;
                    var pendingFileCount = 0;
                    inputElement.onchange = (data) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            // this.__showLoadingScreen();
                            if (inputElement.files) {
                                pendingFileCount += inputElement.files.length;
                                for (var i = 0, numFiles = inputElement.files.length; i < numFiles; i++) {
                                    var file = inputElement.files[i];
                                    var fileData = '';
                                    fileData = yield getFileData(file);
                                    yield uploadFile(targetPath, file.name, fileData);
                                }
                            }
                            else {
                                if (pendingFileCount <= 0) {
                                    // abort in error state
                                    return;
                                }
                                pendingFileCount = 0;
                                throw (new Error(''));
                            }
                        }
                        catch (error) {
                            console.log(error);
                            // TcHmi.Log.error(`[Source=Control, Module=${this.__type}, Id=${this.getId()} Process='uploadFiles'` + error);
                        }
                        finally {
                        }
                    });
                    // Simulate a click. Works probably only if this action is triggered by a user interaction (not on load or symbol change)
                    inputElement.click();
                };
                onUploadFilesPressed();
                /** Reads file resolves file data as Base64Encoded string.
                 * @param file
                 * @returns Promise
                 */
                function getFileData(file) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise((resolve, reject) => {
                            var reader = new FileReader();
                            reader.addEventListener('loadend', function (evt) {
                                if (reader.result === null) {
                                    throw (new Error('Can not read file'));
                                }
                                let newreq = reader.result;
                                newreq = newreq.substring(newreq.indexOf(',') + 1, newreq.length); // remove the dataurl part from encoded string.
                                resolve(newreq);
                            });
                            reader.addEventListener('error', function (data2) {
                                reject('Error');
                            });
                            reader.readAsDataURL(file);
                        });
                    });
                }
                /** Uploads given file data to server.
                 * @param  currentPath
                 * @param  newFileName
                 * @param  newData
                 * @returns Promise
                 */
                function uploadFile(currentPath, newFileName, newData) {
                    return new Promise((resolve, reject) => {
                        let requestPath = currentPath + '/' + newFileName;
                        TcHmi.Server.requestEx({
                            requestType: 'ReadWrite',
                            commands: [{
                                    symbol: 'Upload',
                                    writeValue: {
                                        //  domain: this.__serverDomain,
                                        fileName: requestPath,
                                        data: newData
                                    }
                                }]
                        }, null, data => {
                            if (data.error || !data.results) {
                                reject(data.details);
                                return;
                            }
                            if (data.results[0].error) {
                                reject(data.results[0].details);
                                return;
                            }
                            var response = data.response;
                            if (!response || response.error !== undefined) {
                                reject(response === null || response === void 0 ? void 0 : response.error);
                                return;
                            }
                            var commands = response.commands;
                            if (commands === undefined) {
                                TcHmi.Log.error(` [Source = Control,Module = $ {
                                    this.__type
                                },Id = $ {
                                    this.getId()
                                }` + TcHmi.Log.buildMessage(data.details));
                                reject(data.details);
                                return;
                            }
                            resolve(true);
                        });
                    });
                }
            }
            FileMgmtAPI_Sample.UploadFile = UploadFile;
        })(FileMgmtAPI_Sample = Functions.FileMgmtAPI_Sample || (Functions.FileMgmtAPI_Sample = {}));
        Functions.registerFunctionEx('UploadFile', 'TcHmi.Functions.FileMgmtAPI_Sample', FileMgmtAPI_Sample.UploadFile);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=UploadFile.js.map
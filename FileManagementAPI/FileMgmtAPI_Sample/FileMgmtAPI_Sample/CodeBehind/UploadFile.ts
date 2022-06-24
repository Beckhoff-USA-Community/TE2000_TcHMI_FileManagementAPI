module TcHmi {
    export module Functions {
        export module FileMgmtAPI_Sample {
            export function UploadFile(targetPath:any) {
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
                    inputElement.onchange = async(data) => {
                        try {
                            // this.__showLoadingScreen();
                            if (inputElement.files) {
                                pendingFileCount += inputElement.files.length;
                                for (var i = 0, numFiles = inputElement.files.length; i < numFiles; i++) {
                                    var file = inputElement.files[i];
                                    var fileData:string = '';

                                    fileData = await getFileData(file);
                                    await uploadFile(targetPath, file.name, fileData);
                                }
                            } else {
                                if (pendingFileCount <= 0) {
                                    // abort in error state
                                    return;
                                }
                                pendingFileCount = 0;
                                throw (new Error(''));
                            }
                        } catch(error) {
                            console.log(error);
                            // TcHmi.Log.error(`[Source=Control, Module=${this.__type}, Id=${this.getId()} Process='uploadFiles'` + error);
                        } finally {
                        }
                    };
                    // Simulate a click. Works probably only if this action is triggered by a user interaction (not on load or symbol change)
                    inputElement.click();
                };

                onUploadFilesPressed();
                
                /** Reads file resolves file data as Base64Encoded string. 
                 * @param file
                 * @returns Promise
                 */
                async function getFileData(file:File):Promise<string> {
                    return new Promise<string> ((resolve,reject) => {
                        var reader = new FileReader();
                        reader.addEventListener('loadend',function(evt:any) {
                            if (reader.result === null) {
                                throw (new Error('Can not read file'));
                            }
                            let newreq = reader.result as string;
                            newreq = newreq.substring(newreq.indexOf(',')+1,newreq.length); // remove the dataurl part from encoded string.
                            resolve(newreq);
                        });
                        reader.addEventListener('error',function(data2) {
                            reject('Error');
                        });
                        reader.readAsDataURL(file);
                    });
                }

                /** Uploads given file data to server.
                 * @param  currentPath
                 * @param  newFileName
                 * @param  newData
                 * @returns Promise
                 */
                function uploadFile(currentPath:string,newFileName:string,newData:string):Promise<boolean> {
                    return new Promise<boolean> ((resolve,reject) => {
                        let requestPath = currentPath + '/' + newFileName;
                        TcHmi.Server.requestEx({
                            requestType:'ReadWrite',
                            commands: [{
                                symbol:'Upload',
                                writeValue: {
                                    //  domain: this.__serverDomain,
                                    fileName:requestPath,
                                    data:newData
                                }
                            }]
                        },null,data => {
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
                                reject(response?.error);
                                return;
                            }
                            var commands = response.commands;
                            if (commands === undefined) {
                                TcHmi.Log.error(` [Source = Control,Module = $ {
                                    this.__type
                                },Id = $ {
                                    this.getId()
                                }`+Log.buildMessage(data.details));
                                reject(data.details);
                                return;
                            }
                            resolve(true);
                        });
                    });
                }
            }
        }
        registerFunctionEx('UploadFile','TcHmi.Functions.FileMgmtAPI_Sample',FileMgmtAPI_Sample.UploadFile);
    }
}
module TcHmi {
    export module Functions {
        export module FileMgmtAPI_Sample {
            export function DownloadFile(dirPath:any,fileName:any) {

                /** Download file using HTML a tag
                 * @param  dirRef
                 * @param  serverDirPath
                 * @param  fileName
                 */
                async function downloadFile(dirPath:string,fileName:string) {
                    try {
                        const url = dirPath + '/' + fileName;
                        var downloadElement = document.createElement('a');
                        downloadElement.download = fileName;
                        downloadElement.href = url;
                        // the filename you want
                        document.body.appendChild(downloadElement);
                        downloadElement.click();
                        window.URL.revokeObjectURL(url);
                    }
                    catch(e) {
                        console.log(e);
                        // TcHmi.Log.error(`[Source=Control, Module=${this.__type}, Id=${this.getId()} `);
                        throw (new Error(''));
                    }
                }
                downloadFile(dirPath,fileName);
            }
        }
        registerFunctionEx('DownloadFile','TcHmi.Functions.FileMgmtAPI_Sample',FileMgmtAPI_Sample.DownloadFile);
    }
}
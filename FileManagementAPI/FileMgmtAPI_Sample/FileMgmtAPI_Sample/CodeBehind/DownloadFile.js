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
            function DownloadFile(dirPath, fileName) {
                /** Download file using HTML a tag
                 * @param  dirRef
                 * @param  serverDirPath
                 * @param  fileName
                 */
                function downloadFile(dirPath, fileName) {
                    return __awaiter(this, void 0, void 0, function* () {
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
                        catch (e) {
                            console.log(e);
                            // TcHmi.Log.error(`[Source=Control, Module=${this.__type}, Id=${this.getId()} `);
                            throw (new Error(''));
                        }
                    });
                }
                downloadFile(dirPath, fileName);
            }
            FileMgmtAPI_Sample.DownloadFile = DownloadFile;
        })(FileMgmtAPI_Sample = Functions.FileMgmtAPI_Sample || (Functions.FileMgmtAPI_Sample = {}));
        Functions.registerFunctionEx('DownloadFile', 'TcHmi.Functions.FileMgmtAPI_Sample', FileMgmtAPI_Sample.DownloadFile);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=DownloadFile.js.map
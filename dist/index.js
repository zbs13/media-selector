"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../assets/css/index.css");
/**
 * media-selector v.1.1.12
 *
 * media-selector is a simple library to import medias as the most secure way as possible.
 *
 * @author Lucas Estrade
 * @github author => https://github.com/lucasestrade
 * @github repository => https://github.com/lucasestrade/media-selector
 *
 * Copyright 2020, Lucas Estrade
 * Released under the MIT license
 *
 */
function MediaSelector(options, callback) {
    /**
     * providers
     */
    var providers = {
        /**
         * all available extensions (by default if formats in conf not informed)
         */
        formats: [
            "AVI",
            "BMP",
            "DOC",
            "DOCX",
            "DLL",
            "XLS",
            "XLSX",
            "EXE",
            "FLV",
            "GIF",
            "GZ",
            "ICO",
            "JPEG",
            "PNG",
            "MSI",
            "MP3",
            "PPT",
            "PPTX",
            "PDF",
            "RAR",
            "TIFF",
            "TIF",
            "TAR",
            "WMV",
            "WM",
            "ZIP",
            "XML"
        ]
    };
    /**
     * check media-selector options
     */
    checkOptions(options);
    /**
     * display media-selector errors
     * @param {string} text text value
     */
    function error(text) {
        console.error("media-selector error => " + text);
    }
    /**
     * media options
     * @param {object} options
     */
    function checkOptions(options) {
        var formats = options.formats, maxSize = options.maxSize, minSize = options.minSize, formatError = options.formatError, minSizeError = options.minSizeError, maxSizeError = options.maxSizeError;
        try {
            if (formats !== undefined) {
                formats.map(function (format) {
                    if (!providers.formats.includes(format.toUpperCase())) {
                        error("one or more extensions in formats is invalid");
                    }
                });
            }
            if (maxSize !== undefined) {
                if (typeof maxSize !== "number") {
                    error("maxSize must be of type Number");
                }
            }
            if (minSize !== undefined) {
                if (typeof minSize !== "number") {
                    error("minSize must be of type Number");
                }
            }
            if (formatError !== undefined) {
                if (typeof formatError !== "function") {
                    error("formatError must be of type Function");
                }
            }
            if (minSizeError !== undefined) {
                if (typeof minSizeError !== "function") {
                    error("minSizeError must be of type Function");
                }
            }
            if (maxSizeError !== undefined) {
                if (typeof maxSizeError !== "function") {
                    error("maxSizeError must be of type Function");
                }
            }
        }
        catch (er) {
            error(er);
        }
    }
    /**
     * select all media input files
     */
    var inputs = document.getElementsByClassName("media-selector--input-file");
    /***
     * map input files
     */
    Array.prototype.map.call(inputs, function (input) {
        input.addEventListener("change", function () {
            var file = this.files !== null ? this.files[0] : undefined;
            /**
             * if file not undefined
             * check options and then processing
             */
            if (file !== undefined) {
                var maxSize = options.maxSize, minSize = options.minSize, formats_1 = options.formats, formatError_1 = options.formatError, minSizeError = options.minSizeError, maxSizeError = options.maxSizeError;
                var maxSizeOk = true;
                var minSizeOK = true;
                if (maxSize !== undefined) {
                    maxSizeOk = file.size <= maxSize;
                }
                if (minSize !== undefined) {
                    minSizeOK = file.size >= minSize;
                }
                if (maxSizeOk && minSizeOK) {
                    var base64 = null;
                    var blob = file;
                    var fileReaderForBase64 = new FileReader();
                    var fileReader_1 = new FileReader();
                    /**
                     * load file to encode it in base64
                     */
                    fileReaderForBase64.addEventListener("load", function (e) {
                        base64 = e.target !== null ? e.target.result : null;
                        /**
                         * when file loaded and base 64 generated then exec fileReaderEnd()
                         */
                        fileReaderEnd_1();
                    });
                    fileReaderForBase64.readAsDataURL(blob);
                    /**
                     * check file metadatas and then display an error or call callback
                     */
                    var fileReaderEnd_1 = function () {
                        fileReader_1.onloadend = function (e) {
                            var res;
                            res = e.target !== null ? e.target.result : null;
                            if (res !== null && typeof res !== "string") {
                                var arr = (new Uint8Array(res)).subarray(0, 4);
                                var header = "";
                                for (var i = 0; i < arr.length; i++) {
                                    header += arr[i].toString(16);
                                }
                                var mime = null;
                                var extension = null;
                                /**
                                 * check first part of file metadatas to check the file authenticity
                                 */
                                switch (header.toUpperCase()) {
                                    /**
                                     * avi
                                     */
                                    case "52494646":
                                        mime = "video/x-msvideo";
                                        extension = "avi";
                                        break;
                                    /**
                                     * bmp
                                     */
                                    case "424D":
                                        mime = "image/bmp";
                                        extension = "bmp";
                                        break;
                                    /**
                                     * doc (word)
                                     */
                                    case "D0CF11E0A1B11AE1":
                                    case "0D444F43":
                                    case "CF11E0A1B11AE100":
                                    case "DBA52D00":
                                    case "ECA5C100":
                                        mime = "application/msword";
                                        extension = "doc";
                                        break;
                                    /**
                                     * docx (word)
                                     */
                                    case "504B0304":
                                    case "504B030414000600":
                                        mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                                        extension = "docx";
                                        break;
                                    /**
                                     * dll
                                     */
                                    case "4D5A":
                                        mime = "application/vnd.microsoft.portable-executable";
                                        extension = "dll";
                                        break;
                                    /**
                                     * xls (excel)
                                     */
                                    case "D0CF11E0A1B11AE1":
                                    case "0908100000060500":
                                    case "FDFFFFFF10":
                                    case "FDFFFFFF1F":
                                    case "FDFFFFFF22":
                                    case "FDFFFFFF23":
                                    case "FDFFFFFF28":
                                    case "FDFFFFFF29":
                                        mime = "application/vnd.ms-excel";
                                        extension = "xls";
                                        break;
                                    /**
                                     * xlsx (excel)
                                     */
                                    case "504B0304":
                                    case "504B030414000600":
                                        mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                                        extension = "xlsx";
                                        break;
                                    /**
                                     * exe
                                     */
                                    case "4D5A":
                                        mime = "application/octet-stream";
                                        extension = "exe";
                                        break;
                                    /**
                                     * flv
                                     */
                                    case "464C5601":
                                        mime = "video/x-flv";
                                        extension = "flv";
                                        break;
                                    /**
                                     * gif
                                     */
                                    case "47494638":
                                        mime = "image/gif";
                                        extension = "gif";
                                        break;
                                    /**
                                     * gz
                                     */
                                    case "1F8B08":
                                        mime = "application/gzip";
                                        extension = "gz";
                                        break;
                                    /**
                                     * ico
                                     */
                                    case "00000100":
                                        mime = "image/x-icon";
                                        extension = "ico";
                                        break;
                                    /**
                                     * jpeg
                                     */
                                    case "FFD8FFE0":
                                    case "FFD8FFE1":
                                    case "FFD8FFE2":
                                    case "FFD8FFE3":
                                        mime = "image/jpeg";
                                        extension = "jpeg";
                                        break;
                                    /**
                                     * png
                                     */
                                    case "89504E470D0A1A0A":
                                        mime = "image/png";
                                        extension = "png";
                                        break;
                                    /**
                                     * msi
                                     */
                                    case "D0CF11E0A1B11AE1":
                                        mime = "application/octet-stream";
                                        extension = "msi";
                                        break;
                                    /**
                                     * mp3
                                     */
                                    case "494433":
                                        mime = "audio/mpeg";
                                        extension = "mp3";
                                        break;
                                    /**
                                     * ppt (powerpoint)
                                     */
                                    case "D0CF11E0A1B11AE1":
                                    case "006E1EF0":
                                    case "0F00E803":
                                    case "A0461DF0":
                                    case "FDFFFFFF0E000000":
                                    case "FDFFFFFF1C000000":
                                    case "FDFFFFFF43000000":
                                        mime = "application/vnd.ms-powerpoint";
                                        extension = "ppt";
                                        break;
                                    /**
                                     * pptx (powerpoint)
                                     */
                                    case "504B0304":
                                    case "504B030414000600":
                                        mime = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                                        extension = "pptx";
                                        break;
                                    /**
                                     * pdf
                                     */
                                    case "25504446":
                                        mime = "application/pdf";
                                        extension = "pdf";
                                        break;
                                    /**
                                     * rar
                                     */
                                    case "526172211A0700":
                                        mime = "application/x-rar-compressed";
                                        extension = "rar";
                                        break;
                                    /**
                                     * tiff
                                     */
                                    case "492049":
                                    case "49492A00":
                                    case "4D4D002A":
                                    case "4D4D002B":
                                        mime = "image/tiff";
                                        extension = "tiff";
                                        break;
                                    /**
                                     * tar
                                     */
                                    case "7573746172":
                                        mime = "application/x-tar";
                                        extension = "tar";
                                        break;
                                    /**
                                     * wmv
                                     */
                                    case "3026B2758E66CF11":
                                        mime = "video/x-ms-wmv";
                                        extension = "wmv";
                                        break;
                                    /**
                                     * zip
                                     */
                                    case "504B0304":
                                    case "504B4C495445":
                                    case "504B537058":
                                    case "504B0506":
                                    case "504B0708":
                                    case "57696E5A6970":
                                    case "504B030414000100":
                                        mime = "application/zip";
                                        extension = "zip";
                                        break;
                                    /**
                                     * xml
                                     */
                                    case "3C3F786D6C2076657273696F6E3D22312E30223F3E":
                                        mime = "application/xml";
                                        extension = "xml";
                                        break;
                                    /**
                                     * not find
                                     */
                                    default:
                                        mime = "invalid";
                                        extension = "invalid";
                                        break;
                                }
                                if (mime !== "invalid") {
                                    // valid
                                    if (formats_1 !== undefined) {
                                        if (!formats_1.map(function (v) { return v.toLowerCase(); }).includes(extension)) {
                                            if (formatError_1 !== undefined) {
                                                formatError_1();
                                            }
                                            return;
                                        }
                                    }
                                    /**
                                     * while everything good, calling callback
                                     */
                                    callback({
                                        base64: base64,
                                        mime: mime,
                                        extension: extension,
                                        size: file !== undefined ? file.size : null
                                    });
                                }
                                else {
                                    // not valid
                                    if (formatError_1 !== undefined) {
                                        formatError_1();
                                    }
                                    return;
                                }
                            }
                        };
                    };
                    fileReader_1.readAsArrayBuffer(blob);
                }
                else {
                    /**
                     * display right error depending the option
                     */
                    if (!maxSizeOk) {
                        if (maxSizeError !== undefined) {
                            maxSizeError();
                        }
                    }
                    if (!minSizeOK) {
                        if (minSizeError !== undefined) {
                            minSizeError();
                        }
                    }
                }
            }
        });
    });
}
exports.default = MediaSelector;

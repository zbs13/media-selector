"use strict";
/**
 * media-selector v.1.0.6
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
Object.defineProperty(exports, "__esModule", { value: true });
function MediaSelector(options, callback) {
    /**
     * providers
     */
    var providers = {
        formats: {
            img: ["PNG", "JPEG", "JPG", "TIF", "SVG", "GIF", "AI", "EPS", "PSD", "BMP", "PDF"],
            video: ["AVI", "MOV", "MPEG", "FLV", "ASF", "MKV", "WMV", "MP4", "RM", "RMVB", "TS", "DAT", "VOB"],
        }
    };
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
        var formats = options.formats;
        try {
            if (formats !== undefined) {
                formats.map(function (format) {
                    if (!providers.formats.img.includes(format.toUpperCase()) && !providers.formats.video.includes(format.toUpperCase())) {
                        error("one or more extensions in formats is invalid");
                    }
                });
            }
        }
        catch (er) {
            error(er);
        }
    }
    var inputs = document.getElementsByClassName("media-selector--input-file");
    Array.prototype.map.call(inputs, function (input) {
        input.addEventListener("change", function () {
            var file = this.files !== null ? this.files[0] : undefined;
            if (file !== undefined) {
                var maxSize = options.maxSize;
                var isSizeOk = true;
                if (maxSize !== undefined) {
                    isSizeOk = file.size <= maxSize;
                }
                if (isSizeOk) {
                    var base64;
                    var blob = file;
                    var fileReader = new FileReader();
                    var fileReaderForBase64 = new FileReader();
                    fileReaderForBase64.addEventListener("load", function (e) {
                        base64 = e.target !== null ? e.target.result : null;
                    });
                    fileReaderForBase64.readAsDataURL(blob);
                    fileReader.onloadend = function (e) {
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
                            switch (header) {
                                case "89504e47":
                                    mime = "image/png";
                                    extension = "png";
                                    break;
                                case "52494646":
                                    mime = "image/webp";
                                    extension = "webp";
                                    break;
                                case "ffd8ffe0":
                                case "ffd8ffe1":
                                case "ffd8ffe2":
                                case "ffd8ffe3":
                                case "ffd8ffe8":
                                    mime = "image/jpeg";
                                    extension = "jpeg";
                                    break;
                                default:
                                    mime = "invalid";
                                    break;
                            }
                            if (mime !== "invalid") {
                                console.log(base64);
                                return {
                                    base64: base64,
                                    mime: mime,
                                    extension: null
                                };
                            }
                            else {
                                console.log("error");
                            }
                        }
                    };
                    fileReader.readAsArrayBuffer(blob);
                }
                else {
                    console.log("error");
                }
            }
        });
    });
    return {};
}
exports.default = MediaSelector;

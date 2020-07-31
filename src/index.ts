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

function MediaSelector(options: Object, callback: Function): Object {
    /**
     * providers
     */
    let providers = {
        formats : {
            img : ["PNG", "JPEG", "JPG", "TIF", "SVG", "GIF", "AI", "EPS", "PSD", "BMP", "PDF"],
            video : ["AVI", "MOV", "MPEG", "FLV", "ASF", "MKV", "WMV", "MP4", "RM", "RMVB", "TS", "DAT", "VOB"],
        }
    }

    checkOptions(options);

    /**
     * display media-selector errors
     * @param {string} text text value
     */
    function error(text: string){
        console.error(`media-selector error => ${text}`);
    }

    interface Options{
        maxSize?: number|undefined
        minSize?: number|undefined
        formats?: string[]
        formatError?: Function|undefined
        minSizeError?: Function|undefined
        maxSizeError?: Function|undefined
    }

    /**
     * media options
     * @param {object} options 
     */
    function checkOptions(options: Object){
        const { formats }: Options = options;

        try{
            if(formats !== undefined){
                formats.map(format => {
                    if(!providers.formats.img.includes(format.toUpperCase()) && !providers.formats.video.includes(format.toUpperCase())){
                        error("one or more extensions in formats is invalid");
                    }
                })
            }
        }
        catch(er){
            error(er);
        }
    }

    let inputs = document.getElementsByClassName("media-selector--input-file");
    Array.prototype.map.call(inputs, function(input: HTMLInputElement){
        input.addEventListener("change", function(){
            let file: File|undefined = this.files !== null ? this.files[0] : undefined;
            if(file !== undefined){
                const { maxSize }: Options = options;
                let isSizeOk: boolean = true;
                if(maxSize !== undefined){
                    isSizeOk = file.size <= maxSize;
                }
        
                if(isSizeOk){
                    var base64: string|ArrayBuffer|null;
                    let blob: File = file;
                    let fileReader: FileReader = new FileReader();
                    let fileReaderForBase64: FileReader = new FileReader();
        
                    fileReaderForBase64.addEventListener("load", function(e: ProgressEvent<FileReader>){
                        base64 = e.target !== null ? e.target.result : null;
                    });
                    fileReaderForBase64.readAsDataURL(blob);
        
                    fileReader.onloadend = function(e: ProgressEvent<FileReader>) {
                        let res: string|ArrayBuffer|null;
                        res = e.target !== null ? e.target.result : null;
                        if(res !== null && typeof res !== "string"){
                            let arr: Uint8Array = (new Uint8Array(res)).subarray(0, 4);
                            let header: string = "";
                            for(let i: number = 0; i < arr.length; i++) {
                                header += arr[i].toString(16);
                            }
            
                            let mime: string|null = null;
                            let extension: string|null = null; 
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
            
                            if(mime !== "invalid"){
                                console.log(base64);
                                return {
                                    base64: base64,
                                    mime: mime,
                                    extension: null
                                }
                            }else{
                                console.log("error");
                            }
                        }
                    };
        
                    fileReader.readAsArrayBuffer(blob);
                }else{
                    console.log("error");
                }
            }
        });
    })

    return {};
}

export default MediaSelector;
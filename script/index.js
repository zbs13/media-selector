/**
 * media-selector v.1.0.0
 * 
 * media-selector is a simple library to import medias with as the most secure way as possible.
 * 
 * @author Lucas Estrade 
 * @github author => https://github.com/lucasestrade
 * @github repository => https://github.com/lucasestrade/media-selector
 * 
 * Copyright 2020, Lucas Estrade
 * Released under the MIT license
 * 
 */

function MediaSelector(options, callback){
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
    function error(text){
        console.error(`media-selector error => ${text}`);
    }

    /**
     * media options
     * @param {object} options 
     */
    function checkOptions(options){
        let {maxSize, minSize, formats, formatError, minSizeError, maxSizeError} = options || {};

        if(typeof maxSize !== "number" && typeof minSize !== "undefined"){
            error("maxSize must be of type 'number'");
            return;
        }

        if(typeof minSize !== "number" && typeof minSize !== "undefined"){
            error("minSize must be of type 'number'");
            return;
        }
        
        if(typeof formats !== "object"){
            error("formats is mandatory and must be of type 'object'");
            return
        }else{
            try{
                formats.map(format => {
                    if(!providers.formats.img.includes(format) && !providers.formats.video.includes(format)){
                        error("one or more extensions in formats is invalid");
                    }
                })
            }
            catch(er){
                error(er);
            }
        }
    }

    let inputs = document.getElementsByClassName("media-selector--input-file");
    Array.prototype.map.call(inputs, function(input){
        input.addEventListener("change", function(){
            if(this.files[0] !== undefined){
                let isSizeOk = this.files[0].size <= providers._const.file.MAX_SIZE;
        
                if(isSizeOk){
                    var base64;
                    let blob = this.files[0];
                    let fileReader = new FileReader();
                    let fileReaderForBase64 = new FileReader();
        
                    fileReaderForBase64.addEventListener("load", function(e){
                        base64 = e.target.result;
                    });
                    fileReaderForBase64.readAsDataURL(blob);
        
                    fileReader.onloadend = function(e) {
                        let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                        let header = "";
                        for(let i = 0; i < arr.length; i++) {
                            header += arr[i].toString(16);
                        }
        
                        let type;
                        switch (header) {
                            case "89504e47":
                                type = "image/png";
                                break;
                            case "52494646":
                                type = "image/webp";
                                break;
                            case "ffd8ffe0":
                            case "ffd8ffe1":
                            case "ffd8ffe2":
                            case "ffd8ffe3":
                            case "ffd8ffe8":
                                type = "image/jpeg";
                                break;
                            default:
                                type = "invalid";
                                break;
                        }
        
                        if(type !== "invalid"){
                            popUpConfirm("Valider l'image de profil ?", async function(){
                                let el = document.getElementById("profile-pic");
                                el.style.backgroundImage = `url(${base64})`;
        
                                let response = await Request.post(providers._const.url.PROFILE_PIC,
                                    {
                                        pic: base64
                                    },
                                    "Téléchargement de l'image de profil en cours...");
                                
                                if(response.status === "success"){
                                    Status.message("success", response.message);
                                    el.classList.add("custom-profile-pic");
                                    actionDeletePic();
                                }
                            }, null, base64);
                        }else{
                            Status.message("error", "L'image n'a pas un format valide. Les formats autorisés sont : PNG, JPEG, WEBP");
                        }
                    };
        
                    fileReader.readAsArrayBuffer(blob);
                }else{
                    Status.message("error", "L'image est trop lourde. Le poid maximum autorisé est de 3 MO");
                }
            }
        });
    })
}

module.exports = MediaSelector;
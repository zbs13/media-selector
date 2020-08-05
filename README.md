<p align="center" >
    <img src="/assets/img/logo/media-selector-logo.png" alt="Media-selector"/>
</p>

<p align="center">
    <b>Import medias easily and as the most secure way as possible.</b>
</p>

[![NPM version](http://img.shields.io/npm/v/npm-expansions.svg?style=flat-square)](https://www.npmjs.org/package/media-selector) [![NPM license](http://img.shields.io/npm/l/npm-expansions.svg?style=flat-square)](https://www.npmjs.org/package/media-selector)

## Description

<p>
    This library is used to easily, and securely, create one or more file selection inputs.
    It is possible to configure according to our wishes such as, for example, specifying the type of authorized file (.pdf, .png ...)
    The library takes care of all the security aspect, that is to say the verification of the metadata of the selected file to ensure the authenticity of the latter.
</p>

## Get started

<p>
    <code>npm i media-selector</code>
</p>

## Include HTML

<p>
    To start well include the following html. This permit to media-selector to focus your media input file.
</p>

```html
<div class="media-selector--upload-btn-wrapper">
    <button class="media-selector--upload-btn">
        <label>Select a file</label>
    </button>
    <input type="file" class="media-selector--input-file" accept="*" />
</div>
```

<p>
    By default the file button is stylized. To restyled, just add custom classes or only add the following html :
</p>

```html
<input type="file" class="media-selector--input-file" accept="*" />
```

## Include JS

#### Import library :

```js
import MediaSelector from 'media-selector';
```

<p>
    or :
</p>

```js
const MediaSelector = require('media-selector');
```

#### Use :

<p>
    Then, you can configure according to your wishes.
</p>

<p>
    Here are the available configuration options :
</p>

- ##### formats
    - list of authorized file formats
    - is an array of string
- ##### minSize
    - **minimum** authorized file size (Byte. Ex : 2 000 000 = 2MO)
    - is a number
- ##### maxSize
    - **maximum** authorized file size (Byte)
    - is a number
- ##### formatError
    - callback if the file have an **unauthorized format**
    - is a function
- ##### minSizeError
    - callback if the file size is **too small**
    - is a function
- ##### maxSizeError
    - callback if the file size is **too large**
    - is a function

```js
MediaSelector({
    // authorized formats
    formats: ["PNG", "JPEG"],
    // min size
    minSize: 2,
    // max size
    maxSize: 20000000,
    formatError: function(){
        /**
         * callback if file format unauthorized
         */
        console.log("format error");
    },
    minSizeError: function(){
        /**
         * callback if max file size too small
         */
        console.log("minSize error");
    },
    maxSizeError: function(){
        /**
         * callback if max file size exceeded
         */
        console.log("maxSize error");
    }
}, function(data){
    /**
     *  callback if success
     * 
     *  data is an object that contain file infos. Ex :
     *  {
     *      base64 : ...,
     *      mime : "image/png",
     *      extension : "png"
     *  } 
     */
    console.log("success, file uploaded", data);
});
```

<p>
    Successful file upload return an object with file infos.
</p>
<p>
    Ex :
</p>

```json
{
    "base64" : "base64/...",
    "mime" : "image/png",
    "extension" : "png"
}
```

#### Available file formats :

- AVI
- BMP
- DOC,
- DOCX
- DLL
- XLS
- XLSX
- EXE
- FLV
- GIF
- GZ
- ICO
- JPEG
- PNG
- MSI
- MP3
- PPT
- PPTX
- PDF
- RAR
- TIFF
- TIF
- TAR
- WMV
- WM
- ZIP
- XML

## Thanks

<p>
    Thanks for using my library.
</p>

## Bug

If you spot any bug contact me : **[Lucas Estrade (lucas.estrade5@hotmail.fr)](mailto:lucas.estrade5@hotmail.fr)**

## Development

<p>
    This library may be improve (must).
</p>
    
Do not hesitates to propose some updates via the project github : **[project github](https://github.com/lucasestrade/media-selector)**

## Licence

<p>
    MIT
</p>
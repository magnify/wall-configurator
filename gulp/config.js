'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectPath = "./"; // path for the source files
    var assetPath = projectPath + "assets/";
    var webPath = projectPath + ""; // path for the website - usually path to livereload views, and used for distPath
    var vendorPath = projectPath + "node_modules/"; // path for vendor scripts
    var distPath = webPath + "dist/"; // path for production files
    var cleanPaths = [distPath]; // files/folders to be removed with "clean"-task
    var stylesPath = projectPath + "/patterns/**/*.css"; // path for the source files

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: 'vendor',
                ignorePlugins: ['jscs', 'jshint', 'watch'], // add 'minify', to ignore minifaction on a bundle
                scripts: [
                    vendorPath + "jquery/dist/jquery.min.js",
                    assetPath + "scripts/vendor/jquery-ui.min.js"
                ]
            },
            {
                name: 'master',
                scripts: [
                    projectPath + "scripts/components/**/*.js",
                    projectPath + "scripts/master.js"
                ],
                styles: [
                    projectPath + "patterns/_base/master.css"
                ],
                images: [ assetPath + "images/**/*.{jpg,png,svg,gif}"],
                html: [ projectPath + "html/*.html" ]
            },
            {
                name: "icons",
                icons: [ assetPath + "icons/**/*.svg" ]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "css",

        // ------------- Scripts -------------
        scriptsDist: distPath + "scripts",

        // ------------- Icons ---------------
        iconsDist: distPath + "icons/",

        // ------------- Fonts -------------
        fontsDist: distPath + "fonts",

        // ------------- Images -------------
        imagesDist: distPath + "images",

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            distPath + "**/*.*",
            webPath + "Views/**/*.cshtml", // Umbraco, Sitecore
            webPath + "Files/Templates/Designs/**/*.cshtml", // Dynamicweb
            webPath + "html/**/*.html",
            webPath + "**/*.php"
        ],

        // ------------- Watch -------------
        watchImages: [ assetPath + 'images/**/*' ],
        watchIcons: [ assetPath + 'icons/*' ],
        watchFonts: [ assetPath + 'fonts/*' ],
        watchHtml: [ projectPath + 'html/**/*' ],
        watchScripts: [
            projectPath + 'scripts/**/*.js'
        ],
        watchStyles: [
            stylesPath
        ],

        // ------------- Deploy task --------
        deployHost: "",
        deployUser: "",
        deployPass: "",
        deployDest: "/public_html/",
        deployGlobs: [ distPath + '**' ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: assetPath + "fonts/**/*",
            to: distPath  + "fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "styles", "scripts", "images", "icons", "copy", "watch", "build", "html", "deploy"
        ],
        buildTasks: [
            "styles", "scripts", "images", "icons", "copy"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        vendorPath: vendorPath,
        cleanPaths: cleanPaths,
        distPath: distPath,

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    'title': taskName,
                    'message': 'An error occured in the ' + e.plugin + ' plugin.'
                });
                console.log(e.message);
                this.emit('end');
            };
        }
    }
})();

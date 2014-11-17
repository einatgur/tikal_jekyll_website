var fs = require('fs'),
    unzip = require('unzip'),
    path = require('path'),
    async = require('async'),
    rimraf = require('rimraf');

var chooser = $('#originFile');

chooser.on('change', function(){
    console.log($(this).val());
    $(".fields").show();
});

var submit = $('#go');

submit.on('click', onGo);


function onGo() {
    console.log('onGo()');
    var fileLocation = $('#originFile').val();
    var name = $('#name').val();
    var savePath = $('#savePath').val();
    if (!fileLocation) {
        return error('please choose a file');
    }
    if (!name) {
        return error('please choose a name');
    }
    if(!savePath){
        return error('please choose the save path');
    }
    var tmpDir = path.join(process.cwd(), '.tmp', path.basename(fileLocation, '.zip'));

    var dirName;

    //Extract the file to .tmp
    fs.createReadStream(fileLocation)
        .pipe(unzip.Extract({path: tmpDir}))
        .on('close', function(){
            async.series([
                    function(next){
                        fs.readdir(tmpDir, function(err, files){
                            if(err){
                                return next(err);
                            }

                           for(var i=0; i<files.length; i++){
                               if(fs.statSync(path.join(tmpDir, files[i])).isDirectory()){
                                   dirName = path.join(tmpDir, files[i]);
                                   console.log('Foud Dir!!!  '+  dirName);
                                   break;
                               }
                           }
                            next();
                        });
                    }, function(next){
                        fs.rename(dirName, path.join(savePath, name), next);
                    }, function(next){
                        rimraf(tmpDir, next);
                    }
                ],
            function(err){
               if(err){
                   return console.error(err);
               }
                //clean form
                $('#originFile').val('');
                $('#name').val('');
                $('#savePath').val('');
                toast('Look for "'+name+'" in saved worlds');
            });
        });


    function error(message){
        swal({   title: "Error!",   text: message,   type: "error",   confirmButtonText: "Got it!" });
    }

    function toast(message){
        swal({   title: "Success!",   text: message,   type: "success",   confirmButtonText: "Cool" });
    }
}

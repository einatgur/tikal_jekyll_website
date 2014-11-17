/**
 * Created by assafgannon on 11/9/14.
 */

var XLSX = require('xlsx'),
    path = require('path'),
    yaml = require('js-yaml'),
    fs   = require('fs');

var file = path.join(__dirname, 'files', 'Adam_Mesha-TikalCV.xlsx');
console.log('Parsing file %s', file);
var workbook = XLSX.readFile(file);

var obj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', '..', '_data', 'users', 'adam.yml'), 'utf8'));

obj.experience = [];

var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    console.log('Worksheet: '+y);
    switch(y){
        case 'Work Exp':
            for (z in worksheet) {
                if(z[0] === '!') continue;

                if(worksheet[z].v === 'Work Experience'){
                    continue;
                }
                var job = {};
                var m = z.match(/(\D*)(\d*)/);

                if(m[1] === 'A'){
                    //console.log(y + "!" + m[1]+m[2] + "=" + JSON.stringify(worksheet[z].v));
                    job.years = worksheet['A'+m[2]].v;
                    job.title = worksheet['B'+m[2]].v;
                    job.description = worksheet['B'+(m[2]*1+1)].v;
                    //console.log(JSON.stringify(job));
                    obj.experience.push(job);
                }

            }
            break;
        case 'Tech Q':
            for (z in worksheet) {
                if(worksheet[z].v === 'Years ' ||
                    worksheet[z].v === 'Developer ' ||
                    worksheet[z].v === 'Expert '
                )continue;

                console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
            }
            break;
        default:
            //for (z in worksheet) {
            //    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
            //}
    }



    //fs.writeFileSync(path.join(__dirname, '..', '..', '_data', 'users', 'adam.yml'), yaml.safeDump(obj));

});
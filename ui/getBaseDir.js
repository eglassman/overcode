var PARAM_BASE_DIR_KEY = 'src';

function getBaseDir(callback) {
    console.log('location.search:',window.location.search)

    // Slightly modified from:
    // http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
    var params = {};
    if (location.search) {
        var parts = location.search.substring(1).split('&');
        for (var i = 0; i < parts.length; i++) {
            var param_and_val = parts[i].split('=');
            if (!param_and_val[0]) {
                continue;
            }
            params[param_and_val[0]] = unescape(param_and_val[1]) || true;
        }
    }

    var base_dir_key = params[PARAM_BASE_DIR_KEY];

    d3.json('config.json', function(error, config) {
        if (error) {
            // error loading the json file
            callback(error, null);
            return;
        }
        if (! config.hasOwnProperty('base_dirs')) {
            // no base_dirs key
            callback(new Error('Missing base_dirs from config.json'), null);
            return;
        }
        if (config.base_dirs[base_dir_key] === undefined) {
            callback(new Error('No entry in config.json for key: ' + base_dir_key), null);
            return;
        }

        var base_dir = 'overcode_data/' + config.base_dirs[base_dir_key];
        callback(null, base_dir);
    });
}

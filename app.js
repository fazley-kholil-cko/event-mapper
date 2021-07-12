var objectMapper = require('object-mapper');
var fs = require('fs');
const crypto = require('crypto')

function compileMappings(mappingPath) {
    var eventMappers = [];

    if (mappingPath == '') {
        mappingPath = mappingPath;
    }

    var files = fs.readdirSync(mappingPath, {
            withFileTypes: true
        })
        .filter(item => !item.isDirectory())
        .map(item => item.name);

    for (const file of files) {
        var mapper = JSON.parse(fs.readFileSync(mappingPath + file, 'utf8'));

        var mappings = {};

        for (var key in mapper.Mapping) {
            if (mapper.Mapping.hasOwnProperty(key)) {
                mappings[key] = mapper.Name + '.' + mapper.Mapping[key];
            }
        }
        eventMappers[mapper.Name] = mappings;
    }

    return eventMappers;

}

function map(dto, mapper) {
    var dest = objectMapper(dto, mapper);

    return dest;
}

function generateEventHash(str) {
    let hash = crypto.createHash('md5').update(str).digest("hex");
    return hash.toUpperCase();
}

module.exports.init = compileMappings;
module.exports.map = map;
module.exports.generateEventHash = generateEventHash;
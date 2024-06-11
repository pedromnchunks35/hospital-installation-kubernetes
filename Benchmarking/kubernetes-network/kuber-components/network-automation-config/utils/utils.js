"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageIdFromString = exports.bytesToBase64 = exports.readFileBytes = exports.client = void 0;
var fs = require("fs");
var client_1 = require("@apollo/client");
exports.client = new client_1.ApolloClient({
    uri: "http://CHP-SRVAIDA69.chuporto.min-saude.pt:30012/graphql",
    cache: new client_1.InMemoryCache({ addTypename: false }),
});
var readFileBytes = function (_file_path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(_file_path, 'utf8', function (err, data) {
            if (err) {
                console.error("Error reading the file " + err);
                reject(err);
            }
            var bytes = Array.from(Buffer.from(data, 'binary'));
            resolve(bytes);
        });
    });
};
exports.readFileBytes = readFileBytes;
var bytesToBase64 = function (_bytes) {
    var binaryString = String.fromCharCode.apply(null, _bytes);
    return btoa(binaryString);
};
exports.bytesToBase64 = bytesToBase64;
var getPackageIdFromString = function (_string) {
    // Regular expression pattern to match the package ID
    var packageIdPattern = /Package ID: ([^,]+)/;
    // Executing the regular expression on the input string
    var match = _string.match(packageIdPattern);
    // Extracting the package ID from the match
    var packageId = match ? match[1] : null;
    return packageId;
};
exports.getPackageIdFromString = getPackageIdFromString;

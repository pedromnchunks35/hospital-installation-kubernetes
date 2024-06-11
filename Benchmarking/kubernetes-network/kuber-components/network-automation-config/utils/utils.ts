import * as fs from 'fs';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const client = new ApolloClient({
    uri: "http://CHP-SRVAIDA69.chuporto.min-saude.pt:30012/graphql",
    cache: new InMemoryCache({ addTypename: false }),
});
export const readFileBytes = (_file_path: string): any => {
    return new Promise((resolve, reject) => {
        fs.readFile(_file_path, 'utf8', (err: any, data: any) => {
            if (err) {
                console.error("Error reading the file " + err)
                reject(err)
            }
            const bytes = Array.from(Buffer.from(data, 'binary'));
            resolve(bytes);
        })
    });
}

export const bytesToBase64 = (_bytes: any): string => {
    const binaryString = String.fromCharCode.apply(null, _bytes)
    return btoa(binaryString)
}

export const getPackageIdFromString = (_string: string) => {
    // Regular expression pattern to match the package ID
    const packageIdPattern = /Package ID: ([^,]+)/;

    // Executing the regular expression on the input string
    const match = _string.match(packageIdPattern);

    // Extracting the package ID from the match
    const packageId = match ? match[1] : null;
    return packageId
}
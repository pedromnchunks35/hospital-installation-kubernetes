"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var utils_1 = require("./utils/utils");
function delay(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}
var tasks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, filePathconfigtx, file, configtx_base64, receipt_create_block, receipt_send_all, orderer_services, i, item, index, stringArgs, arrayArgs, args, receipt_join_orderer, error_1, peer_services, i, item, filePathChaincode, file_chaincode, base64_chaincode, index, fetch_string_args, fetch_string_array, fetch_args, receipt_fetch_block, error_2, join_peer_args_string, join_peer_args_array, join_peer_args, receipt_join_peer, error_3, receipt_upload_chaincode, error_4, install_chaincode_string, install_chaincode_array, install_chaincode_final, receipt_install_chaincode, error_5, package_id, query_installed_string, query_installed_array_string, query_installed_string_final, res_query_installed, error_6, approve_string, approve_array, approve_string_final, receipt_approve, error_7, commit_string, j, commit_array, commit_string_final, receipt_commit, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.client.query({
                    query: (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      query{\n        List_components{\n          services\n        }\n    }"], ["\n      query{\n        List_components{\n          services\n        }\n    }"])))
                })
                //? Send and generate channel block
            ];
            case 1:
                result = _a.sent();
                filePathconfigtx = "./artifacts/configtx.yaml";
                return [4 /*yield*/, (0, utils_1.readFileBytes)(filePathconfigtx)];
            case 2:
                file = _a.sent();
                configtx_base64 = (0, utils_1.bytesToBase64)(file);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        mutation{\n            Create_blocks_orderer(\n              file_name: \"configtx.yaml\",\n              channel_name: \"channel1\",\n              service_name: \"orgx-orderer\",\n              file: \"", "\"\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }"], ["\n        mutation{\n            Create_blocks_orderer(\n              file_name: \"configtx.yaml\",\n              channel_name: \"channel1\",\n              service_name: \"orgx-orderer\",\n              file: \"", "\"\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }"])), configtx_base64)
                    })];
            case 3:
                receipt_create_block = _a.sent();
                console.log("Receipt for the created block: \n" + JSON.stringify(receipt_create_block, null, '\t'));
                return [4 /*yield*/, delay(7000)
                    //? Send to all the orderers
                ];
            case 4:
                _a.sent();
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        mutation{\n            Send_blocks_orderer(\n              block_name: \"genesis_block_channel1.pb\",\n              service_name: \"orgx-orderer\"\n            ){\n              confirmation{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Send_blocks_orderer(\n              block_name: \"genesis_block_channel1.pb\",\n              service_name: \"orgx-orderer\"\n            ){\n              confirmation{\n                message\n                status\n              }\n            }\n          }\n        "])))
                    })];
            case 5:
                receipt_send_all = _a.sent();
                console.log(JSON.stringify(receipt_send_all, null, '\t'));
                return [4 /*yield*/, delay(7000)
                    //? getting orderer services
                ];
            case 6:
                _a.sent();
                orderer_services = [];
                for (i = 0; i < result.data.List_components.services.length; i++) {
                    item = result.data.List_components.services[i];
                    if (item.includes("orderer")) {
                        orderer_services.push(item);
                    }
                }
                index = 0;
                _a.label = 7;
            case 7:
                if (!(index < orderer_services.length)) return [3 /*break*/, 13];
                stringArgs = "channel join --channelID channel1 --config-block ../blocks/genesis_block_channel1.pb -o ".concat(orderer_services[index], ":81 --ca-file ../admin-tls-msp/tlscacerts/tls-CHP-SRVAIDA69-chuporto-min-saude-pt-30008.pem --client-cert ../admin-tls-msp/signcerts/cert.pem --client-key ../admin-tls-msp/keystore/key.pem");
                arrayArgs = stringArgs.split(" ");
                args = JSON.stringify(arrayArgs);
                _a.label = 8;
            case 8:
                _a.trys.push([8, 11, , 12]);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_orderer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_orderer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response\n            }\n          }\n        "])), orderer_services[index], args)
                    })];
            case 9:
                receipt_join_orderer = _a.sent();
                console.log("Receipt for the orderer " + orderer_services[index] + " join: " + JSON.stringify(receipt_join_orderer, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 10:
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                console.log("Error with the orderer " + orderer_services[index] + " " + error_1);
                return [3 /*break*/, 12];
            case 12:
                index++;
                return [3 /*break*/, 7];
            case 13:
                peer_services = [];
                for (i = 0; i < result.data.List_components.services.length; i++) {
                    item = result.data.List_components.services[i];
                    if (item.includes("peer")) {
                        peer_services.push(item);
                    }
                }
                filePathChaincode = "./artifacts/basic.tar.gz";
                return [4 /*yield*/, (0, utils_1.readFileBytes)(filePathChaincode)];
            case 14:
                file_chaincode = _a.sent();
                base64_chaincode = (0, utils_1.bytesToBase64)(file_chaincode);
                index = 0;
                _a.label = 15;
            case 15:
                if (!(index < peer_services.length)) return [3 /*break*/, 48];
                fetch_string_args = "channel fetch config --channelID channel1 --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem --tls  --certfile ../admin-tls-msp/signcerts/cert.pem --keyfile ../admin-tls-msp/keystore/key.pem -o orgx-orderer:80";
                fetch_string_array = fetch_string_args.split(" ");
                fetch_args = JSON.stringify(fetch_string_array);
                _a.label = 16;
            case 16:
                _a.trys.push([16, 19, , 20]);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "])), peer_services[index], fetch_args)
                    })];
            case 17:
                receipt_fetch_block = _a.sent();
                console.log("Receipt for the fetch of the block for the peer " + peer_services[index] + " " + JSON.stringify(receipt_fetch_block, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 18:
                _a.sent();
                return [3 /*break*/, 20];
            case 19:
                error_2 = _a.sent();
                console.log("Error fetching the block in the peer " + peer_services[index] + " " + error_2);
                return [3 /*break*/, 20];
            case 20:
                join_peer_args_string = "channel join -b ./channel1_config.block";
                join_peer_args_array = join_peer_args_string.split(" ");
                join_peer_args = JSON.stringify(join_peer_args_array);
                _a.label = 21;
            case 21:
                _a.trys.push([21, 24, , 25]);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "])), peer_services[index], join_peer_args)
                    })];
            case 22:
                receipt_join_peer = _a.sent();
                console.log("Receipt for the join of the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_join_peer, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 23:
                _a.sent();
                return [3 /*break*/, 25];
            case 24:
                error_3 = _a.sent();
                console.log("Error joinning the peer " + peer_services[index] + " " + error_3);
                return [3 /*break*/, 25];
            case 25:
                _a.trys.push([25, 28, , 29]);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        mutation{\n          Send_chaincode_peer(\n            file: \"H4sIAAAAAAAAA8tNLUlMSSxJ1Msqzs9joA0wAAIzExMQbWhuaoBMQ4CZCYOhiampsam5saGhGYOBobG5qSmDggGN3IMCSotLEosUFBgKUlOK8nPzjE1xqCMkP0RBNZcCECiVVBakKlkpKKVWlKQW5SXmKOlAxHMSk1JzQBJJicWZyfGGegZKXLUD7eZRQD2QnJ+SqgfMAXrpVTSzg1D+NzY0gud/IwNw/jc2Nh/N//QA8t0cEAbz2/MHvZgNRVofrvktknhtq8q5Jbq1M4UmiyhfXuJrpP3x7lytJo+Fq5VO/c9992jO0Z16y0Viui3XxmX5PZK7kmPLM321uVvtfvmS/Ba5npe9gW7rWy8537fnWvlu07P2lWbRS0SWP/C2W1Z5qnT7J/tXpYrpc7/ua4naPffNvJzedwdtb8+I+Za4PfTup81PFst+15Vznndr6crQv123Ir6rzlke0TR/cbNsdsSev9+KUVz/oX8vc1XQOmMGjQEIulEwCkbBKBgFo2AUjIJRMApGwSgYBaNgFIyCUTAKRsEoGAWjYBSMglEwCkbBKBgFo2AUjIJBAQCXB6TZACgAAA==\",\n            file_name: \"basic.tar.gz\",\n            service_name: \"", "\"\n          ){\n            response{\n              message\n              status\n            }\n          }\n        }\n        "], ["\n        mutation{\n          Send_chaincode_peer(\n            file: \"H4sIAAAAAAAAA8tNLUlMSSxJ1Msqzs9joA0wAAIzExMQbWhuaoBMQ4CZCYOhiampsam5saGhGYOBobG5qSmDggGN3IMCSotLEosUFBgKUlOK8nPzjE1xqCMkP0RBNZcCECiVVBakKlkpKKVWlKQW5SXmKOlAxHMSk1JzQBJJicWZyfGGegZKXLUD7eZRQD2QnJ+SqgfMAXrpVTSzg1D+NzY0gud/IwNw/jc2Nh/N//QA8t0cEAbz2/MHvZgNRVofrvktknhtq8q5Jbq1M4UmiyhfXuJrpP3x7lytJo+Fq5VO/c9992jO0Z16y0Viui3XxmX5PZK7kmPLM321uVvtfvmS/Ba5npe9gW7rWy8537fnWvlu07P2lWbRS0SWP/C2W1Z5qnT7J/tXpYrpc7/ua4naPffNvJzedwdtb8+I+Za4PfTup81PFst+15Vznndr6crQv123Ir6rzlke0TR/cbNsdsSev9+KUVz/oX8vc1XQOmMGjQEIulEwCkbBKBgFo2AUjIJRMApGwSgYBaNgFIyCUTAKRsEoGAWjYBSMglEwCkbBKBgFo2AUjIJBAQCXB6TZACgAAA==\",\n            file_name: \"basic.tar.gz\",\n            service_name: \"", "\"\n          ){\n            response{\n              message\n              status\n            }\n          }\n        }\n        "])), peer_services[index])
                    })];
            case 26:
                receipt_upload_chaincode = _a.sent();
                console.log("Receipt for the upload of the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_upload_chaincode, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 27:
                _a.sent();
                return [3 /*break*/, 29];
            case 28:
                error_4 = _a.sent();
                console.log("Error uploading chaincode on the peer " + peer_services[index] + " " + error_4);
                return [3 /*break*/, 29];
            case 29:
                _a.trys.push([29, 32, , 33]);
                install_chaincode_string = "lifecycle chaincode install ../chaincode/basic.tar.gz";
                install_chaincode_array = install_chaincode_string.split(" ");
                install_chaincode_final = JSON.stringify(install_chaincode_array);
                console.log(install_chaincode_final);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "])), peer_services[index], install_chaincode_final)
                    })];
            case 30:
                receipt_install_chaincode = _a.sent();
                console.log("Receipt for the install of the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_install_chaincode, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 31:
                _a.sent();
                return [3 /*break*/, 33];
            case 32:
                error_5 = _a.sent();
                console.log("Error installing chaincode on the peer " + peer_services[index] + " " + error_5);
                return [3 /*break*/, 33];
            case 33:
                package_id = "";
                _a.label = 34;
            case 34:
                _a.trys.push([34, 37, , 38]);
                query_installed_string = "lifecycle chaincode queryinstalled";
                query_installed_array_string = query_installed_string.split(" ");
                query_installed_string_final = JSON.stringify(query_installed_array_string);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "])), peer_services[index], query_installed_string_final)
                    })];
            case 35:
                res_query_installed = _a.sent();
                console.log("Receipt for querying the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(res_query_installed, null, '\t'));
                package_id = (0, utils_1.getPackageIdFromString)(res_query_installed.data.Exec_admin_command_peer.response.message);
                console.log("The package id of the peer " + peer_services[index] + " is " + package_id);
                return [4 /*yield*/, delay(7000)];
            case 36:
                _a.sent();
                return [3 /*break*/, 38];
            case 37:
                error_6 = _a.sent();
                console.log("Error querying the chaincode installed on the peer " + peer_services[index] + " " + error_6);
                return [3 /*break*/, 38];
            case 38:
                if (!(package_id !== "")) return [3 /*break*/, 43];
                _a.label = 39;
            case 39:
                _a.trys.push([39, 42, , 43]);
                approve_string = "lifecycle chaincode approveformyorg -o orgx-orderer:80 --channelID channel1 --name basic --version 1.0 --package-id ".concat(package_id, " --sequence 1 --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem   --tls --certfile ../admin-tls-msp/signcerts/cert.pem  --keyfile  ../admin-tls-msp/keystore/key.pem");
                approve_array = approve_string.split(" ");
                approve_string_final = JSON.stringify(approve_array);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "], ["\n        mutation{\n            Exec_admin_command_peer(\n              service_name: \"", "\",\n              arguments: ", "\n            ){\n              response{\n                message\n                status\n              }\n            }\n          }\n        "])), peer_services[index], approve_string_final)
                    })];
            case 40:
                receipt_approve = _a.sent();
                console.log("Receipt for the chaincode approval for the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_approve, null, '\t'));
                return [4 /*yield*/, delay(7000)];
            case 41:
                _a.sent();
                return [3 /*break*/, 43];
            case 42:
                error_7 = _a.sent();
                console.log("Error approving the chaincode in the peer " + peer_services[index] + " " + error_7 + "\n \n \n");
                return [3 /*break*/, 43];
            case 43:
                _a.trys.push([43, 46, , 47]);
                commit_string = "lifecycle chaincode commit -o orgy-orderer:80 --channelID channel1 --name basic --version 1.0 --sequence 1 --tls --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem";
                for (j = 0; j < peer_services.length; j++) {
                    commit_string += " --peerAddresses ".concat(peer_services[j], ":80 --tlsRootCertFiles ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem");
                }
                console.log(commit_string);
                commit_array = commit_string.split(" ");
                commit_string_final = JSON.stringify(commit_array);
                return [4 /*yield*/, utils_1.client.mutate({
                        mutation: (0, client_1.gql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n          mutation{\n              Exec_admin_command_peer(\n                service_name: \"", "\",\n                arguments: ", "\n              ){\n                response{\n                  message\n                  status\n                }\n              }\n            }\n          "], ["\n          mutation{\n              Exec_admin_command_peer(\n                service_name: \"", "\",\n                arguments: ", "\n              ){\n                response{\n                  message\n                  status\n                }\n              }\n            }\n          "])), peer_services[index], commit_string_final)
                    })];
            case 44:
                receipt_commit = _a.sent();
                console.log("Receipt for the chaincode commit for the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_commit, null, "\n"));
                return [4 /*yield*/, delay(7000)];
            case 45:
                _a.sent();
                return [3 /*break*/, 47];
            case 46:
                error_8 = _a.sent();
                console.log("Error making the commit in the peer " + peer_services[index] + " " + error_8);
                return [3 /*break*/, 47];
            case 47:
                index++;
                return [3 /*break*/, 15];
            case 48: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tasks()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;

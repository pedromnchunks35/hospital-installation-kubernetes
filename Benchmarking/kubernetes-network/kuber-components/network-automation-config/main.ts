import { gql } from "@apollo/client"
import { bytesToBase64, client, getPackageIdFromString, readFileBytes } from "./utils/utils"
function delay(milliseconds: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
const tasks = async () => {

  //? Get all services
  let result: any = await client.query({
    query: gql`
      query{
        List_components{
          services
        }
    }`
  })

  //? Send and generate channel block
  const filePathconfigtx = "./artifacts/configtx.yaml"
  let file: any = await readFileBytes(filePathconfigtx)
  let configtx_base64: string = bytesToBase64(file)
  let receipt_create_block: any = await client.mutate({
    mutation: gql`
        mutation{
            Create_blocks_orderer(
              file_name: "configtx.yaml",
              channel_name: "channel1",
              service_name: "orgx-orderer",
              file: "${configtx_base64}"
            ){
              response{
                message
                status
              }
            }
          }`
  })
  console.log("Receipt for the created block: \n" + JSON.stringify(receipt_create_block, null, '\t'))
  await delay(7000)
  //? Send to all the orderers
  let receipt_send_all: any = await client.mutate({
    mutation: gql`
        mutation{
            Send_blocks_orderer(
              block_name: "genesis_block_channel1.pb",
              service_name: "orgx-orderer"
            ){
              confirmation{
                message
                status
              }
            }
          }
        `
  })
  console.log(JSON.stringify(receipt_send_all, null, '\t'))
  await delay(7000)
  //? getting orderer services
  let orderer_services: string[] = []
  for (let i = 0; i < result.data.List_components.services.length; i++) {
    let item: string = result.data.List_components.services[i] as string
    if (item.includes("orderer")) {
      orderer_services.push(item)
    }
  }
  //? Join all orderers in a recursive way
  for (let index = 0; index < orderer_services.length; index++) {
    let stringArgs: string = `channel join --channelID channel1 --config-block ../blocks/genesis_block_channel1.pb -o ${orderer_services[index]}:81 --ca-file ../admin-tls-msp/tlscacerts/tls-CHP-SRVAIDA69-chuporto-min-saude-pt-30008.pem --client-cert ../admin-tls-msp/signcerts/cert.pem --client-key ../admin-tls-msp/keystore/key.pem`
    let arrayArgs: string[] = stringArgs.split(" ")
    let args: string = JSON.stringify(arrayArgs)
    try {
      let receipt_join_orderer: any = await client.mutate({
        mutation: gql`
        mutation{
            Exec_admin_command_orderer(
              service_name: "${orderer_services[index]}",
              arguments: ${args}
            ){
              response
            }
          }
        `
      })
      console.log("Receipt for the orderer " + orderer_services[index] + " join: " + JSON.stringify(receipt_join_orderer, null, '\t'))
      await delay(7000)
    } catch (error) {
      console.log("Error with the orderer " + orderer_services[index] + " " + error)
    }
  }
  //? getting peer services
  let peer_services: string[] = []
  for (let i = 0; i < result.data.List_components.services.length; i++) {
    let item: string = result.data.List_components.services[i] as string
    if (item.includes("peer")) {
      peer_services.push(item)
    }
  }
  //? Getting the chaincode base64 to install chaincode
  const filePathChaincode = "./artifacts/basic.tar.gz"
  let file_chaincode: any = await readFileBytes(filePathChaincode)
  let base64_chaincode: string = bytesToBase64(file_chaincode)

  //? Fetch block ,join peer ,install chaincode,approve it and commit it in a recursive way
  for (let index = 0; index < peer_services.length; index++) {
    let fetch_string_args: string = "channel fetch config --channelID channel1 --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem --tls  --certfile ../admin-tls-msp/signcerts/cert.pem --keyfile ../admin-tls-msp/keystore/key.pem -o orgx-orderer:80"
    let fetch_string_array: string[] = fetch_string_args.split(" ")
    let fetch_args: string = JSON.stringify(fetch_string_array)
    try {
      let receipt_fetch_block: any = await client.mutate({
        mutation: gql`
        mutation{
            Exec_admin_command_peer(
              service_name: "${peer_services[index]}",
              arguments: ${fetch_args}
            ){
              response{
                message
                status
              }
            }
          }
        `
      })
      console.log("Receipt for the fetch of the block for the peer " + peer_services[index] + " " + JSON.stringify(receipt_fetch_block, null, '\t'))
      await delay(7000)
    } catch (error) {
      console.log("Error fetching the block in the peer " + peer_services[index] + " " + error)
    }
    let join_peer_args_string: string = "channel join -b ./channel1_config.block"
    let join_peer_args_array: string[] = join_peer_args_string.split(" ")
    let join_peer_args: string = JSON.stringify(join_peer_args_array)
    try {
      let receipt_join_peer: any = await client.mutate({
        mutation: gql`
        mutation{
            Exec_admin_command_peer(
              service_name: "${peer_services[index]}",
              arguments: ${join_peer_args}
            ){
              response{
                message
                status
              }
            }
          }
        `
      })
      console.log("Receipt for the join of the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_join_peer, null, '\t'))
      await delay(7000)
    } catch (error) {
      console.log("Error joinning the peer " + peer_services[index] + " " + error)
    }
    try {
      let receipt_upload_chaincode: any = await client.mutate({
        mutation: gql`
        mutation{
          Send_chaincode_peer(
            file: "H4sIAAAAAAAAA8tNLUlMSSxJ1Msqzs9joA0wAAIzExMQbWhuaoBMQ4CZCYOhiampsam5saGhGYOBobG5qSmDggGN3IMCSotLEosUFBgKUlOK8nPzjE1xqCMkP0RBNZcCECiVVBakKlkpKKVWlKQW5SXmKOlAxHMSk1JzQBJJicWZyfGGegZKXLUD7eZRQD2QnJ+SqgfMAXrpVTSzg1D+NzY0gud/IwNw/jc2Nh/N//QA8t0cEAbz2/MHvZgNRVofrvktknhtq8q5Jbq1M4UmiyhfXuJrpP3x7lytJo+Fq5VO/c9992jO0Z16y0Viui3XxmX5PZK7kmPLM321uVvtfvmS/Ba5npe9gW7rWy8537fnWvlu07P2lWbRS0SWP/C2W1Z5qnT7J/tXpYrpc7/ua4naPffNvJzedwdtb8+I+Za4PfTup81PFst+15Vznndr6crQv123Ir6rzlke0TR/cbNsdsSev9+KUVz/oX8vc1XQOmMGjQEIulEwCkbBKBgFo2AUjIJRMApGwSgYBaNgFIyCUTAKRsEoGAWjYBSMglEwCkbBKBgFo2AUjIJBAQCXB6TZACgAAA==",
            file_name: "basic.tar.gz",
            service_name: "${peer_services[index]}"
          ){
            response{
              message
              status
            }
          }
        }
        `
      })
      console.log("Receipt for the upload of the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_upload_chaincode, null, '\t'))
      await delay(7000)
    } catch (error) {
      console.log("Error uploading chaincode on the peer " + peer_services[index] + " " + error)
    }
    try {
      let install_chaincode_string: string = "lifecycle chaincode install ../chaincode/basic.tar.gz"
      let install_chaincode_array: string[] = install_chaincode_string.split(" ")
      let install_chaincode_final: string = JSON.stringify(install_chaincode_array)
      console.log(install_chaincode_final)
      let receipt_install_chaincode: any = await client.mutate({
        mutation: gql`
        mutation{
            Exec_admin_command_peer(
              service_name: "${peer_services[index]}",
              arguments: ${install_chaincode_final}
            ){
              response{
                message
                status
              }
            }
          }
        `
      })
      console.log("Receipt for the install of the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_install_chaincode, null, '\t'))
      await delay(7000)
    } catch (error) {
      console.log("Error installing chaincode on the peer " + peer_services[index] + " " + error)
    }
    let package_id: string = ""
    try {
      let query_installed_string: string = "lifecycle chaincode queryinstalled"
      let query_installed_array_string: string[] = query_installed_string.split(" ")
      let query_installed_string_final: string = JSON.stringify(query_installed_array_string)
      let res_query_installed: any = await client.mutate({
        mutation: gql`
        mutation{
            Exec_admin_command_peer(
              service_name: "${peer_services[index]}",
              arguments: ${query_installed_string_final}
            ){
              response{
                message
                status
              }
            }
          }
        `
      })
      console.log("Receipt for querying the chaincode on the peer " + peer_services[index] + "\n" + JSON.stringify(res_query_installed, null, '\t'))
      package_id = getPackageIdFromString(res_query_installed.data.Exec_admin_command_peer.response.message) as string
      console.log("The package id of the peer " + peer_services[index] + " is " + package_id)
      await delay(7000)
    } catch (error) {
      console.log("Error querying the chaincode installed on the peer " + peer_services[index] + " " + error)
    }
    if (package_id !== "") {
      try {
        let approve_string: string = `lifecycle chaincode approveformyorg -o orgx-orderer:80 --channelID channel1 --name basic --version 1.0 --package-id ${package_id} --sequence 1 --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem   --tls --certfile ../admin-tls-msp/signcerts/cert.pem  --keyfile  ../admin-tls-msp/keystore/key.pem`
        let approve_array: string[] = approve_string.split(" ")
        let approve_string_final: string = JSON.stringify(approve_array)
        let receipt_approve: any = await client.mutate({
          mutation: gql`
        mutation{
            Exec_admin_command_peer(
              service_name: "${peer_services[index]}",
              arguments: ${approve_string_final}
            ){
              response{
                message
                status
              }
            }
          }
        `
        })
        console.log("Receipt for the chaincode approval for the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_approve, null, '\t'))
        await delay(7000)
      } catch (error) {
        console.log("Error approving the chaincode in the peer " + peer_services[index] + " " + error + "\n \n \n")
      }
    }

    try {
      let commit_string: string = "lifecycle chaincode commit -o orgy-orderer:80 --channelID channel1 --name basic --version 1.0 --sequence 1 --tls --cafile ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem"
      for (let j = 0; j < peer_services.length; j++) {
        commit_string += ` --peerAddresses ${peer_services[j]}:80 --tlsRootCertFiles ../admin-tls-msp/tlscacerts/cacert-tls-admin.pem`
      }
      console.log(commit_string)
      let commit_array: string[] = commit_string.split(" ")
      let commit_string_final: string = JSON.stringify(commit_array)
      let receipt_commit: any = await client.mutate({
        mutation: gql`
          mutation{
              Exec_admin_command_peer(
                service_name: "${peer_services[index]}",
                arguments: ${commit_string_final}
              ){
                response{
                  message
                  status
                }
              }
            }
          `
      })
      console.log("Receipt for the chaincode commit for the peer " + peer_services[index] + "\n" + JSON.stringify(receipt_commit, null, `\n`))
      await delay(7000)
    } catch (error) {
      console.log("Error making the commit in the peer " + peer_services[index] + " " + error)
    }
  }
}
const main = async () => {
  await tasks()
}
main()
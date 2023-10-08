import {createAndSignPresentationJWT, EthrDIDMethod} from "@jpmorganchase/onyx-ssi-sdk";
import {VerifiableCredential} from "did-jwt-vc";
import {hexToBytes} from "did-jwt";
import * as process from "process";

const OnyxPresentCredential = async (vcs:VerifiableCredential[], privkey:string) : Promise<string> => {

  try{
    const ethrDID = new EthrDIDMethod({
      name: process.env.REACT_APP_ONYX_PROVIDER_CHAIN as string,
      registry: process.env.REACT_APP_ONYX_DID_REGISTRY_ADDRESS as string,
      rpcUrl: process.env.REACT_APP_ONYX_PROVIDER_URL
    });
    const subjectDID = await ethrDID.generateFromPrivateKey(privkey);
    //console.log(ethrDID);
    //console.log(subjectDID);

    // Fix bug as jwt.convertKeys expects privateKey as bytes or hex string
    subjectDID.keyPair.privateKey = hexToBytes( privkey );

    const vp:string = await createAndSignPresentationJWT(subjectDID, vcs);
    //console.log(vp);

    return vp;
  } catch(e){
    console.log(e);
    return '';
  }
}

export default OnyxPresentCredential;
//import axios from 'axios';
import {fromString, toString} from 'uint8arrays';
import { hashSha256 } from 'jsontokens/lib/cryptoClients/sha256';
import secp256k1 from 'secp256k1';
import {EthrDIDMethod} from "@jpmorganchase/onyx-ssi-sdk";

const OnyxClaimCredential = async () => {

  try {
    const ethrDID = new EthrDIDMethod({
      name: process.env.REACT_APP_ONYX_PROVIDER_CHAIN as string,
      registry: process.env.REACT_APP_ONYX_DID_REGISTRY_ADDRESS as string,
      rpcUrl: process.env.REACT_APP_ONYX_PROVIDER_URL
    });
    const privkey = process.env.REACT_APP_ETHEREUM_PRIVATE_KEY_1 as string;
    const subjectDID = await ethrDID.generateFromPrivateKey(privkey);
    console.log(ethrDID);
    console.log(subjectDID);

    const timestamp = Date.now();
    const did = 'did:ethr:abcedfg'; //subjectDID.did;
    const token = process.env.REACT_APP_ONYX_CUSTOMER_API_KEY;


    const data = `${token}\n${did}\n${timestamp}`
    const sig = signChallenge(data, privkey);

    console.log(sig);

    //let wallet = new ethers.Wallet(privkey);
    //const sigb = wallet.signMessage(data);
    //const sigc = wallet.signMessageSync(data)
    //console.log(sigb);
    //console.log(sigc);

    /*
    const credentialResponse = await axios.post(`${process.env.REACT_APP_ONYX_ISSUER_URL}/public/issue`, {
      token: token,
      did: did,
      timestamp: timestamp,
      signature: sig,
    });
    const credentialJWT = credentialResponse.data;
    console.log(credentialResponse);
    return {
      jwt: credentialJWT,
      did: did
    }
     */
  }catch (e) {
    console.log(e);
  }

}

export default OnyxClaimCredential;

export function signChallenge(challenge: string, privateKey: string) : string {
  const sigobj = secp256k1.ecdsaSign(hashSha256(challenge), hexToBytes(privateKey))
  return bytesToHex(sigobj.signature).concat(':').concat(sigobj.recid.toString())
  //return bytesToHex(sigobj.signature).concat(':').concat(sigobj.recid.toString())
}

export function bytesToHex(bytes: Uint8Array) {
  return toString(bytes, 'base16')
  //return Buffer.from(bytes.buffer).toString();
}

export function hexToBytes(s: string): Uint8Array {
  const input = s.startsWith('0x') ? s.substring(2) : s
  return fromString(input.toLowerCase(), 'base16')
  //return new Uint8Array(Buffer.from(input.toLowerCase()));
}
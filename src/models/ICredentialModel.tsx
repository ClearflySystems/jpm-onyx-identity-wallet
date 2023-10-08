/**
 * TODO explore use case of WEB API's Credential - https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API
 */

/**
 * @var uuid - Credential Local ID
 * @var name - Lowercase Name eg proof_of_age
 * @var title - Display label eg Proof of Age
 * @var vc - Verified Credential from issuer - JWT Token
 * @var issuer - Name/Identifier of Issuer
 */
export interface ICredentialModel {
  uuid: string;
  name: string;
  title: string;
  vc: string;
  issuer: string;
}

export type CredentialList = Array<ICredentialModel>;

export const CREDENTIAL_STORAGE_KEY = 'enki-credentials';
import React, {createRef} from 'react';
import {useReadLocalStorage} from 'usehooks-ts'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Center,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import {ChatIcon, EditIcon, ChevronDownIcon} from "@chakra-ui/icons";
import CredentialForm, {CredentialFormRef} from "../components/Form/CredentialForm";
//import CredentialsList from "../components/CredentialsList";
import {CREDENTIAL_STORAGE_KEY, ICredentialModel} from "../models/ICredentialModel";
//import {ethers} from 'ethers';
import {v4 as uuidv4} from "uuid";
import {useEnkiEthereumWalletProvider} from "../services/EnkiEthereumWalletProvider";
//import OnyxClaimCredential from "../services/OnyxClaimCredential";
import OnyxPresentCredential from "../services/OnyxPresentCredential";
import {VerifiableCredential} from "did-jwt-vc";

const AssetsScreen = () => {
  /**
   * Reference Wallet Context vars
   */
  const {
    getCurrentWallet,
    ethBalance,
    curWalletIndex,
    setCurWalletIndex,
    lastMessage,
    setLastMessage
  } = useEnkiEthereumWalletProvider();

  /**
   * Storage of credentials in localStorage
   */
  const currentCredentialList = useReadLocalStorage<ICredentialModel[]>(CREDENTIAL_STORAGE_KEY);

  /**
   * Forward reference for child credential form component
   */
  const childFormRef = createRef<CredentialFormRef>();

  /**
   * Event handler to generate VP from selected credential
   * @param index
   */
  const handlePresent = async (index: number) => {
    // todo disable button until complete

    if(currentCredentialList && currentCredentialList[index]) {
      const selectedCredential = currentCredentialList[index];// as ICredentialModel;
      const selectedVC: VerifiableCredential = selectedCredential.vc;

      // Generate VP - IE signed VC
      const VP = OnyxPresentCredential([selectedVC], getCurrentWallet().signingKey.privateKey).then((VP: string | undefined) => {
        const msg = JSON.stringify({
          'action': 'PRESENT_VP',
          'data': VP
        });
        setLastMessage(msg);
        // Send to extension service worker
        //window.postMessage(msg);
        // @ts-ignore
        if (typeof chrome !== 'undefined') {
          // @ts-ignore
          chrome.runtime.sendMessage(msg).then((r:any) => {
            // todo re-enable button
          });
        }
      });
    }
  }

  // temp flag for unlocked wallet
  const loggedOn = true; // useReadLocalStorage('user');

  return (
    <>
      {loggedOn &&
        <div className="enki-assets-page">
          <Card>
            <Select
              placeholder='Switch account'
              variant='outline'
              size='lg'
              icon={<ChevronDownIcon />}
              value={curWalletIndex}
              onChange={(e) => setCurWalletIndex(parseInt(e.target.value)) }
            >
              <option value='0'>Account 1</option>
              <option value='1'>Account 2</option>
            </Select>
          </Card>
          <br/>
          <Card>

            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab>Tokens</Tab>
                <Tab>Credentials</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <h2>Account Address: {getCurrentWallet().address}</h2>
                  <h2>ETH Balance: {ethBalance} ETH</h2>
                </TabPanel>
                <TabPanel>
                  <Stack spacing='4'>
                    {
                      currentCredentialList?.map((credential, index) => {
                        return (<div key={uuidv4()}>
                          <Card>
                            <CardHeader>{credential.title}</CardHeader>
                            <CardFooter>
                              <Button
                                flex='1'
                                variant='ghost'
                                leftIcon={<EditIcon/>}
                                onClick={(e) => {childFormRef?.current?.openModalForm(index)}}
                              >
                                Edit
                              </Button>
                              <Button
                                flex='1'
                                variant='ghost'
                                leftIcon={<ChatIcon/>}
                                onClick={(e) => {handlePresent(index)}}
                              >
                                Present
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>)
                      })
                    }
                  </Stack>
                  <br/>
                  <CredentialForm ref={childFormRef}/>
                  <Center>
                    <Stack>
                      <Button onClick={() => {
                        childFormRef?.current?.openModalForm(-1)
                      }}>
                        Add New Credential
                      </Button>
                      {/*
                      <Button onClick={() => {
                        //OnyxClaimCredential();
                      }}>
                        Claim Onyx VC
                      </Button>
                      */}
                    </Stack>
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
          <br/>
          <Card>
            <CardHeader>Last Message:</CardHeader>
            <>{lastMessage}</>
          </Card>

        </div>
      }
    </>
  )
}


export default AssetsScreen;
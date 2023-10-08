import React, {useImperativeHandle, forwardRef, useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ScaleFade,
  Stack,
  Spacer,
  Textarea,
  ModalFooter,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import {useFormik} from "formik"
import {useLocalStorage} from "usehooks-ts";
import {CREDENTIAL_STORAGE_KEY, ICredentialModel} from "../../models/ICredentialModel";
import {v4 as uuidv4} from "uuid";
import {CheckIcon, DeleteIcon} from "@chakra-ui/icons";
import {decodeJWT} from "did-jwt";
import {JWTDecoded} from "did-jwt/src/JWT";

export interface CredentialFormRef {
  openModalForm: (index: number) => void;
}

export interface CredentialFormProps {
  selectedCredentialIndex?: number;
}

const CredentialForm = forwardRef<CredentialFormRef, CredentialFormProps>(
  (props, ref) => {

    // Get/Set Credential list from localStorage
    const [currentCredentialList, setCurrentCredentialList] = useLocalStorage<ICredentialModel[]>(CREDENTIAL_STORAGE_KEY, []);

    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    let defaultCredential: ICredentialModel = {
      uuid: uuidv4(),
      name: 'my_credential',
      title: 'My Credential',
      vc: '',
      issuer: ''
    }

    // Modal Event handlers
    const {isOpen, onClose, onOpen} = useDisclosure();

    const [decodedJwt, setDecodedJwt] = useState<Partial<JWTDecoded>>({});

    // Parent ref event forwarding
    useImperativeHandle(ref, () => ({
      openModalForm(index) {
        setCurrentIndex(index);
        const credential = currentCredentialList[index] || defaultCredential;
        console.log(credential);
        if(credential.vc){
          setDecodedJwt( decodeJWT(credential.vc) );
          console.log(credential.vc);
          console.log(decodedJwt);
        }
        formik.setValues(credential);
        onOpen();
      }
    }));

    const handleDelete = () => {
      if(currentIndex >= 0 && confirm('Delete this credential?')){
        currentCredentialList.splice(currentIndex, 1);
        setCurrentCredentialList(currentCredentialList);
        setCurrentIndex(-1);
        onClose();
      }
      alert(currentIndex);
    }

    const formik = useFormik({
      //enableReinitialize: true, // dont use - render error
      initialValues: defaultCredential,
      onSubmit: (values: ICredentialModel) => {
        // TODO add validation

        // Map values to Credential Model
        const newCredential: ICredentialModel = {...values}

        // Save to localStorage
        setCurrentCredentialList([...currentCredentialList, newCredential]);

        formik.resetForm();
        setCurrentIndex(-1);
        onClose();
      },
    })

    return (
      <>
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
              bg='blackAlpha.300'
              backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent>
              <ModalHeader>
                <h3>Manage Credential</h3>
                <ModalCloseButton/>
              </ModalHeader>

              <ModalBody>
                <form id='manage-credential'
                      onSubmit={formik.handleSubmit}
                >
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel>Credential Name</FormLabel>
                      <Input name='name'
                             onChange={formik.handleChange}
                             value={formik.values.name}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Credential Title</FormLabel>
                      <Input name='title'
                             onChange={formik.handleChange}
                             value={formik.values.title}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Credential JWT</FormLabel>
                      <Textarea name='vc'
                                resize='none'
                                placeholder='Paste in the issued Signed JWT here'
                                onChange={formik.handleChange}
                                value={formik.values.vc}
                      />
                    </FormControl>

                    <div className="scrollBox">
                    <pre>{
                      JSON.stringify(decodedJwt, null, 2)
                    }</pre>
                    </div>
                  </Stack>
                </form>
              </ModalBody>

              <ModalFooter>
                {currentIndex >= 0 &&
                  <Button
                    colorScheme='red'
                    float='left'
                    leftIcon={<DeleteIcon/>}
                    onClick={(e) => {
                      handleDelete()
                    }}
                  >
                    Delete
                  </Button>
                }
                <Spacer />
                <Button
                  colorScheme='teal'
                  leftIcon={<CheckIcon/>}
                  type="submit"
                  form="manage-credential"
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ScaleFade>
      </>
    );
  }
);
export default CredentialForm;



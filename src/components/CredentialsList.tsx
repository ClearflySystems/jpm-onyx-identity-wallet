import React, {PropsWithChildren} from 'react';
import {useReadLocalStorage} from "usehooks-ts";
import {CREDENTIAL_STORAGE_KEY, ICredentialModel} from "../models/ICredentialModel";
import {Button, Card, CardHeader, CardFooter, Stack} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";


const CredentialsList = (props: PropsWithChildren) => {

  const currentCredentialList = useReadLocalStorage<ICredentialModel[]>(CREDENTIAL_STORAGE_KEY);

  return (
    <>
      <Stack spacing='4'>
      {
        currentCredentialList?.map(credential => {
          return (<div key={credential.uuid}>
            <Card colorScheme='teal'>
              <CardHeader>{credential.title}</CardHeader>
              <CardFooter>
                <Button flex='1' variant='ghost' leftIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </div>)
        })
      }
      </Stack>
    </>
  )
}

export default CredentialsList;
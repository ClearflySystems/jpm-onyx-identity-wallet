import React from 'react';
import {useNavigate} from "react-router-dom";
import {Card, CardHeader, CardBody, Stack, StackDivider, Heading, Button, Input} from "@chakra-ui/react";

const UnlockScreen = () => {
  const afterUnlock = () => {
    navigate('/assets');
  }

  // Add Navigation/Location hooks
  const navigate = useNavigate();

  return (
    <>
      <div className="enki-unlock-page">
        <Card>
          <CardHeader>
            <Heading size='md'>Unlock Wallet</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider/>} spacing='4'>
              <Input type='password' placeholder='Enter Password'/>
              <Button onClick={afterUnlock} colorScheme='teal'>Unlock</Button>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default UnlockScreen;
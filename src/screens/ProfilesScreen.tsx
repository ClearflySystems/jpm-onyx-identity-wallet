import React from 'react';
import { useReadLocalStorage } from 'usehooks-ts'

const ProfilesScreen = () => {
  const loggedOn = useReadLocalStorage('user');

  return (
    <>
      {loggedOn &&
        <>
          <h1>Your Profiles</h1>
          <div className="enki-profiles-page">

          </div>

        </>
      }
    </>
  )
}

export default ProfilesScreen;
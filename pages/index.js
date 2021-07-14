import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { userSession, getUserData, getPerson } from '../utils/auth';
import { SignIn } from '../components/sign-in';
import CreateNFT from '../components/create-nft';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [person, setPerson] = useState(null);
  const [profile, setProfile] = useState(null);

  function handleSignout(e) {
    e.preventDefault();
    setUserData(null);
    userSession.signUserOut(window.location.origin);
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn() && userData == null) {
      setUserData(getUserData());
      setPerson(getPerson());
      setProfile(getPerson().profile());
    }
  }, [userData]);

  // console.log('userData', userData);
  // console.log('avatar', userData?.profile?.avatarUrl());
  return (
    <div className={styles.container}>
      <Head>
        <title>POC Stacks</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="/">NFTGems</a>
        </h1>

        <section className="center">
          {!userSession.isUserSignedIn() ? (
            <SignIn />
          ) : (
            <>
              <img
                style={{ width: '200px', height: '200px' }}
                src={
                  person?.avatarUrl()
                    ? person.avatarUrl()
                    : 'http://picsum.photos/200/200'
                }
              />
              <p>{!userData?.username ? 'Guest' : userData.username}</p>
              <button onClick={handleSignout}>Signout</button>
            </>
          )}
        </section>

        {userSession && (
          <section className="m-t-10">
            <div>Connected</div>
            <CreateNFT userSession={userSession} />
          </section>
        )}
      </main>

      <footer className={styles.footer} />
    </div>
  );
}

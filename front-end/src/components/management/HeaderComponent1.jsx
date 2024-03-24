import { FC, useEffect, useState } from "react";
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/css/style.css'
import icon from '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/img/icon.png'

export default function HeaderComponent1(){

  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window;
      if (solWindow.solana && solWindow.solana.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attempt an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on("connect", (publicKey) => {
        console.log(`connect event: ${publicKey}`);
        setConnected(true);
        setPubKey(publicKey);
      });
      provider.on("disconnect", () => {
        console.log("disconnect event");
        setConnected(false);
        setPubKey(null);
      });
    }
  }, [provider]);

  const connectHandler = (event) => {
    console.log(`connect handler`);
    provider?.connect()
      .catch((err) => {
        console.error("connect ERROR:", err);
      });
  };

  const disconnectHandler = (event) => {
    console.log("disconnect handler");
    provider?.disconnect()
      .catch((err) => {
        console.error("disconnect ERROR:", err);
      });
  };


    return (
        <header role="banner" aria-label="site-wide-navigation" class="site-header">
            <div class="container">
        <nav role="navigation" aria-label="navigation" class="site-header-nav">

          <ul class="site-nav-left">
            <li>
              <a href="#">
                <img src={icon} alt="Citrus" class="logo" />
              </a>
            </li>
            <li>
              <a href="#" class="site-nav-link">About</a>
            </li>
            <li>
              <a href="#" class="site-nav-link-active">Register URL</a>
            </li>
          </ul>

          <ul class="site-nav-right">
            <li>
              <a href="#" class="site-nav-link" aria-label="site-wide-search-button" role="button">
                <img src="https://s3.amazonaws.com/codecademy-content/programs/ui-design/color-ui/icon-search.svg" alt="Search" />
              </a>
            </li>
            <li>
            {walletAvail ? (
  <>
    {connected ? (
      <button className="button-30" role="button" onClick={disconnectHandler}>
        Disconnect from Phantom
      </button>
    ) : (
      <button className="button-30" role="button" onClick={connectHandler}>
        Connect to Phantom
      </button>
    )}
  </>
) : (
  <>
    <p>
      <a href="https://phantom.app/">Connect to Phantom wallet</a>.
    </p>
  </>
)}
            </li>
          </ul>
        </nav>
      </div>
    </header>
    )
}
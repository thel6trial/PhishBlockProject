import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/css/style.css'
import { VersionedMessage, clusterApiUrl, Keypair, Transaction, Connection } from '@solana/web3.js';
import {Formik, Form, Field} from 'formik'
import { registerApi } from "./api/RegisterApiService";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {confirmTransactionFromFrontend } from '/Users/mac/Documents/LibraryWebApp/management-app/src/components/shyft.js';
import icon from '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/img/icon.png'

function RegisterComponent(){

  const [enterpriseName, setEnterpriseName] = useState('')
  const [enterpriseMail, setEnterpriseMail] = useState('')
  const [representativePhone, setRepresentativePhone] = useState('')
  const [websiteName, setWebsiteName] = useState('')
  const [network, setnetwork] = useState("devnet");

  const [errorMessage, setErrorMessage] = useState('')

  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);

  const callback = (signature,result) => {
		console.log("Signature ",signature);
		console.log("result ",result);
	}

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

  async function signAndConfirmTransactionFe(network,transaction,callback)
{
    const phantom = new PhantomWalletAdapter();
    await phantom.connect();
    const rpcUrl = clusterApiUrl(network);
    const connection = new Connection(rpcUrl,"confirmed");
    //console.log(connection.rpcEndpoint);
    const ret = await confirmTransactionFromFrontend(connection,transaction,phantom);
    // const checks = await connection.confirmTransaction({signature:ret},'finalised');
    console.log(ret);
    // console.log(checks);
    // await connection.confirmTransaction({
    //     blockhash: transaction.blockhash,
    //     signature: ret,
    // });
    connection.onSignature(ret,callback,'finalized')
    return ret;
}

  
  function onSubmit(values){

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "Ruuze7DHVu5TPNiJ");

    const formdata = new FormData();
    formdata.append("network", "devnet");
    formdata.append("wallet", pubKey);
    formdata.append("name", "LMS Team Service Phising");
    formdata.append("symbol", "LMS");
    formdata.append("description", "Shyft makes Web3 development sooo easy");
    formdata.append("attributes", JSON.stringify([
      { trait_type: "enterpriseName", value: values.enterpriseName },
      { trait_type: "enterpriseMail", value: values.enterpriseMail },
      { trait_type: "representativePhone", value: values.representativePhone },
      { trait_type: "websiteURL", value: values.websiteName },
      { trait_type: "edification", value: "100" }
    ]));
    formdata.append("external_url", "https://shyft.to");
    formdata.append("max_supply", "0");
    formdata.append("royalty", "5");
    formdata.append("nft_receiver", "DCR6ACRqSEM5xgz31q5DgF89whTo3jimim3zRc2tmLn3");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata
    };

    fetch("https://api.shyft.to/sol/v1/nft/create_detach", requestOptions)
        .then((response) => response.text())
        .then( async(result) => {
          console.log(result)
          console.log(JSON.parse(result))
          const encoded_transaction = JSON.parse(result).result.encoded_transaction
          let websiteMint = JSON.parse(result).result.mint
          console.log(encoded_transaction)

          const encoder = new TextEncoder(); 
          const encodedTransaction = encoder.encode(encoded_transaction)
          const ret_result = await signAndConfirmTransactionFe(network, encoded_transaction,callback);
          console.log(ret_result);

          const registerFormDTO = {
              enterpriseName: values.enterpriseName,
              enterpriseMail: values.enterpriseMail,
              representativePhone: values.representativePhone,
              websiteName: values.websiteName,
              websiteMint: websiteMint
          }
    
          registerApi(registerFormDTO)
              .then(response => {
                window.location.href = `http://localhost:3000/detail/${websiteMint}`;
          })
        })
}

  return (
    <body>

    <header id="header" class="fixed-top header-scrolled">
      <div class="container d-flex align-items-center justify-content-lg-between">
  
        <h1 class="logo me-auto me-lg-0"><a href="index.html"><img src={icon}/><span></span></a></h1>
  
        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a class="nav-link scrollto" href="#hero">Home</a></li>
            <li><a class="nav-link scrollto active" href="#about">Register</a></li>
            <li><a class="nav-link scrollto" href="#services">Wallet</a></li>
            <li><a class="nav-link scrollto " href="#portfolio">Portfolio</a></li>
            <li><a class="nav-link scrollto" href="#team">Team</a></li>
              
            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
  
  
        {walletAvail ? (
    <>
      {connected ? (
        <a class="get-started-btn scrollto" style={{textDecoration: 'none'}} onClick={disconnectHandler}>
          Disconnect from Phantom
        </a>
      ) : (
        <a class="get-started-btn scrollto" style={{textDecoration: 'none'}} onClick={connectHandler}>
          Connect to Phantom
        </a>
      )}
    </>
  ) : (
    <>
      <a href="https://phantom.app/" style={{textDecoration: 'none'}} class="get-started-btn scrollto">
          Download Phantom Wallet
        </a>
    </>
  )}
  
      </div>
    </header>
  
    <section id="hero" class="d-flex align-items-center justify-content-center">
      <div class="container" >
  
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8">
            <h1>PhishBlock<span>.</span></h1>
            <h2>Defend Yours With Blockchain</h2>
          </div>
        </div>
  
        <div class="row gy-4 mt-5 justify-content-center">
          <div class="col-xl-2 col-md-4">
            <div class="icon-box">
              <i class="ri-store-line"></i>
               {walletAvail ? (
    <>
      {connected ? (
        <h3>
          Connect Successfully. {pubKey.toString()}
        </h3>
      ) : (
        <h3>
          Please connect to your Phantom wallet to use our service.
        </h3>
      )}
    </>
  ) : (
    <>
      <h3><a href="https://phantom.app/">
          Oops! Phantom Wallet is not available. Go get it now
        </a></h3>
    </>
  )}
            </div>
          </div>
        </div>
  
  
      </div>
    </section>
  
    <main id="main">
  
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <h2>Register</h2>
          <p>Register Your Information to Our PhishBlock Service</p>
        </div>

        <div>
          <iframe style={{border:'0', width: '100%', height: '270px'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0491588177215!2d105.78125387506762!3d20.990666480649207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb67ddf0cbd%3A0xc8c8cf8450cdf8d!2sKaopiz%20Software%20Co.%2C%20Ltd.!5e0!3m2!1svi!2s!4v1710312323760!5m2!1svi!2s" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="row mt-5">

          <div class="col-lg-4">
            <div class="info">
              <div class="address">
                <i class="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>Tầng 4 Toà Nhà C14 Bắc Hà CT1 Tố Hữu Hà Nội</p>
              </div>

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>kaopiz@example.com</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>

            </div>

          </div>

          <div class="col-lg-8 mt-5 mt-lg-0">
            <Formik initialValues = {{enterpriseName, enterpriseMail, representativePhone, websiteName}}
                     enableReinitialize = {true}
                     onSubmit={onSubmit}
                     validateOnChange={false}
                     validateOnBlur={false}  
                >
                    {
                        (pros) => (

            <Form role="form" class="php-email-form">
              <div class="row">
                <fieldset class="col-md-6 form-group">
                  <Field type="text" name="enterpriseName" className="form-control" id="name" placeholder="Enterprise Name" required />
                </fieldset>
                <fieldset class="col-md-6 form-group mt-3 mt-md-0">
                  <Field type="text" class="form-control" name="enterpriseMail" id="email" placeholder="Enterprise Email" required />
                </fieldset>
              </div>
              <fieldset class="form-group mt-3">
                <Field type="text" class="form-control" name="representativePhone" id="subject" placeholder="Enterprise Phone" required />
              </fieldset>
              <fieldset class="form-group mt-3">
                <Field class="form-control" name="websiteName" placeholder="Website Name" required />
              </fieldset>
              <div style={{marginTop: '30px'}} class="text-center"><button type="submit">Send Message</button></div>

            </Form>

             )
                    }
                </Formik>

          </div>

        </div>

      </div>
    </section>
    </main>
  
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
  
            <div class="col-lg-3 col-md-6">
              <div class="footer-info">
                <h3>PhishBlock<span></span></h3>
                <p>Defend Yours With Blockchain</p>
                
                <div class="social-links mt-3">
                  <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                  <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                  <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                  <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                  <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                </div>
              </div>
            </div>
  
            <div class="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
              </ul>
            </div>
  
            <div class="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i class="bx bx-chevron-right"></i> <a href="#">UserSubscription</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">EnterpriseSubscription</a></li>
                <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing Serivce</a></li>
              </ul>
            </div>
  
            <div class="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
            </div>
  
          </div>
        </div>
      </div>
    </footer>
  
  </body>
    )
}

export default () => (
    <>
      <RegisterComponent />
    </>
  );
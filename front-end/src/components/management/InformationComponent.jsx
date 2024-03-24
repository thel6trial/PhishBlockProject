import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/css/style.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/aos/aos.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/boxicons/css/boxicons.min.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/glightbox/css/glightbox.min.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/remixicon/remixicon.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/swiper/swiper-bundle.min.css'
import icon from '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/img/icon.png'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/vendor/bootstrap/css/bootstrap.min.css'
import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/js/main.js'
import { retrieveFromMint } from "./api/RegisterApiService";

function InformationComponent(){

  const {websiteMint} = useParams()
  const [websiteName, setWebsiteName] = useState('')
  const [enterpriseName, setEnterpriseName] = useState('')

  useEffect(
    () => retrieveData(),
    [websiteMint]
)

function retrieveData(){
        retrieveFromMint(websiteMint)
          .then(response =>{
            setWebsiteName(response.data.websiteName)
            setEnterpriseName(response.data.enterpriseName)
          })
          .catch(error => console.log(error))
}

  const navigate = useNavigate()

  function moveToSolScan(){
    window.location.href = `https://solscan.io/token/${websiteMint}?cluster=devnet`;
  }

  function backToRegister(){
    window.location.href = `http://localhost:3000/`;
  }

  return (
    <body>

  <header id="header" class="fixed-top header-scrolled">
    <div class="container d-flex align-items-center justify-content-lg-between">

      <h1 class="logo me-auto me-lg-0"><a href="index.html"><img src={icon}/><span></span></a></h1>

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li><a class="nav-link scrollto" href="#hero">Home</a></li>
          <li><a class="nav-link scrollto" href="#about">Register</a></li>
          <li><a class="nav-link scrollto" href="#services">Wallet</a></li>
          <li><a class="nav-link scrollto active" href="#portfolio">Detail</a></li>
          <li><a class="nav-link scrollto" href="#team">Team</a></li>
            
          <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
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
            <h3><a onClick={moveToSolScan}>View NFT Mint on SolScan</a></h3>
          </div>
        </div>
      </div>


    </div>
  </section>

  <main id="main">

    {/* <!-- ======= Services Section ======= --> */}
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Services</h2>
          <p>Certificate of the Website registered on PhishBlock service</p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch" >
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">EnterpriseName</a></h4>
              <p>{enterpriseName}</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" >
            <div class="icon-box">
              <div class="icon"><i class="bx bx-file"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">Enterprise Website</a></h4>
              <p>{websiteName}</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" >
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4><a style={{textDecoration: 'none'}} href="">NFT Mint</a></h4>
              <p>{websiteMint}</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="cta" class="cta">
      <div class="container" >

        <div class="text-center">
          <h3>Click here to register</h3>
          <p>Protect your information with our PhishBlock service now.</p>
          <a style={{textDecoration: 'none'}} onClick={backToRegister} class="cta-btn">Click here to register</a>
        </div>

      </div>
    </section>

    <section id="team" class="team">
      <div class="container" >

        <div class="section-title">
          <h2>Team</h2>
          <p>Check our Team</p>
        </div>

        <div class="row">

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member" >
              <div class="member-img">
                <img  class="img-fluid" alt="" />
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h4>Nguyễn Hữu Lộc</h4>
                <span>Developer</span>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member" >
              <div class="member-img">
                <img  class="img-fluid" alt="" />
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h4>Trần Cao Sơn</h4>
                <span>Developer</span>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member" >
              <div class="member-img">
                <img  class="img-fluid" alt="" />
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h4>Nguyễn Tiến Mạnh</h4>
                <span>Reasearcher</span>
              </div>
            </div>
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
      <InformationComponent />
    </>
  );
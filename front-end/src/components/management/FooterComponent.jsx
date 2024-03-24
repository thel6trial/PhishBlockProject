import '/Users/mac/Documents/LibraryWebApp/management-app/src/assets/css/styles.css'

function FooterComponent(){
    return (
        <footer role="contentinfo" class="footer">
      <div class="container">
        <nav role="navigation" class="clearfix">
          <ul class="col-1-4 footer-section">
            <li>
              <img src="https://s3.amazonaws.com/codecademy-content/programs/ui-design/color-ui/logo.svg" alt="Citrus" class="logo" />
            </li>
            <li>
              <p><smalL>All Rights Reserved | &copy; <time>2017</time></smalL></p>
            </li>
          </ul>
          <div class="col-1-4 footer-section" aria-labelledby="product-pages">
            <p id="product-pages"><b>About</b></p>
            <ul>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Schedule Demo</a>
              </li>
            </ul>
          </div>
          <div class="col-1-4 footer-section" aria-labelledby="support-pages">
            <p id="support-pages"><b>Support</b></p>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">API Status</a>
              </li>
            </ul>
          </div>
          <div class="col-1-4 footer-section" arai-labelledby="social-links">
            <p id="support-pages"><b>Stay Up To Date</b></p>
            <form>
              <input type="email" placeholder="Your emaill address" class="footer-email-input" />
              <input type="submit" value="Submit" class="button button-secondary footer-email-button"/>
            </form>
          </div>
        </nav>
      </div>
    </footer>
    )
}

export default FooterComponent
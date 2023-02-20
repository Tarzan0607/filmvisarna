import { useStates } from "../../utilities/states";
import '../../css/style-footer.css';


export default function Home() {
  let s = useStates('main');
  return <>
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>Kontakta oss</h4>
            <p className='footer-adress'>Östra Fejkadress 28</p>
            <p className='footer-adress-postcode'>213 44 Malmö</p>
            <p className='footer-text'>040 - 00 00 00</p>
            <p className='footer-text'>info@filmvisarna.se</p>

          </div>
          <div className="sb_footer-links_div">
            <h4>Salonger</h4>
            <a href="/OmOss">
              <p>IMAX</p>
            </a>
            <a href="/OmOss">
              <p>4DX</p>
            </a>

          </div>
          <div className="sb_footer-links_div">
            <h4>Ladda ner appen</h4>
            <a href="/app">
              <p>Android</p>
            </a>
            <a href="/app2">
              <p>ios</p>
            </a>
          </div>

          <div className="sb_footer-links_div">
            <h4>Följ oss</h4>
            <div className="socialmedia">
              <p><img src='/images/instagram.png' alt="" /></p>
              <p><img src='/images/facebook.png' alt="" /></p>
              <p><img src='/images/twitter.png' alt="" /></p>
              <p><img src='/images/linkdin.png' alt="" /></p>
            </div>
          </div>
        </div>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              ©Filmvisarna - 2013. All rights reserved.
            </p>
          </div>
        </div>


      </div>
    </div>

  </>
}

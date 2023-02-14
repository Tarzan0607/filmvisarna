import { useStates } from "../../utilities/states";
import '../../css/style-footer.css';


export default function Home() {
 let s = useStates('main');
 return <>
   <div className="footer">
     <div className="sb_footer section_padding">
       <div className="sb_footer-links">
         <div className="sb_footer-links_div">
           <h4>Contact With Us</h4>
           <a href="/address">
             <p>Address</p>
           </a>
           <a href="/address2">
             <p>Östra Fejkadress 28, </p>
           </a>
           <a href="/address3">
             <p>213 44 Malmö</p>
           </a>


         </div>
         <div className="sb_footer-links_div">
           <h4>Theaters</h4>
           <a href="/cinema">
             <p>IMAX</p>
           </a>
           <a href="/cinema2">
             <p>4DX</p>
           </a>
          


         </div>
         <div className="sb_footer-links_div">
           <h4>Download App</h4>
           <a href="/app">
             <p>Android</p>
           </a>
           <a href="/app2">
             <p>ios</p>
           </a>
          


         </div>


         <div className="sb_footer-links_div">
           <h4>Follow Us</h4>
           <div className="socialmedia">
             <p><img src='/images/facebook.png' alt=""/></p>
             <p><img src='/images/instagram.png' alt=""/></p>
             <p><img src='/images/twiter.png' alt=""/></p>
             <p><img src='/images/linkdin.png' alt=""/></p>


           </div>
         </div>


       </div>
       
       <div className="sb_footer-below">
         <div className="sb_footer-copyright">
           <p>
             @Filmvisarna - 2013.All rights reserved.
           </p>


         </div>
        
       </div>


     </div>
   </div>

 </>
}

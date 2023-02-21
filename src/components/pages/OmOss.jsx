import { useEffect } from 'react';

export default function OmOss() {

  useEffect(() => {
    let elementToScrollTo = location.hash && document.querySelector(location.hash);
    if (!elementToScrollTo) { return; }
    window.scrollTo(0, elementToScrollTo.getBoundingClientRect().top + window.innerHeight - elementToScrollTo.offsetHeight)
  }, []);


  return <>
    <div className="textOmOss">
      <h2 className="h2omoss">Filmvisarna</h2>
      <p>Filmvisarna är en nyöppnad biograf i centrala Malmö.  Vi siktar på ett erbjuda en unik filmupplevelse med den bästa och nyaste tekniken på marknaden </p>
      <ul>
        <h2>Regler</h2>
        <li>Ta inte med egen mat och dryck in i lokalen</li>
        <li>Var tyst under filmens gång</li>
        <li>Var snäll och ställ in mobilen på ljudlös för att inte störa andra i publiken</li>
        <li>Nödutgångar finns tydligt skyltade i alla våra salonger</li>
      </ul>
      <h3 className="h3omoss">Information</h3>
      <p>Pris: 130 kr/biljett </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum enim libero, non vulputate nunc mattis eget. Nullam tempor nisl nec facilisis sollicitudin. Morbi ultricies egestas justo eget pretium. Donec ut velit eget lorem varius lacinia. Nam sodales dictum elit, ac placerat massa fringilla vitae. Sed feugiat, erat quis convallis.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae minus consequuntur, aliquid sapiente alias possimus numquam, cupiditate earum vitae iure labore debitis incidunt quam? Iure quae quasi ea aperiam inventore.</p>
    </div>
    <div className="bilder">
      <img src='./images/Butik/theatre1.jpg'></img>
      <img src='./images/Butik/theatre2.jpg'></img>
    </div>

    <div className="theatre-options" id='theatre-anchor'>
      <div className="option" onClick={() => handleOptionClick('IMAX')}>
        <h3>IMAX</h3>
        <img src='./images/Butik/imax2.jpg' />

      </div>
      <div className="option" onClick={() => handleOptionClick('4DX')}>
        <h3>4DX</h3>
        <img src='./images/Butik/4dx.jpg' />

      </div>

    </div>
  </>
}

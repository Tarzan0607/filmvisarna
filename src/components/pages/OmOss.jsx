import { useEffect } from 'react';

export default function OmOss() {

  useEffect(() => {
    let elementToScrollTo = location.hash && document.querySelector(location.hash);
    if (!elementToScrollTo) { return; }
    window.scrollTo(0, elementToScrollTo.getBoundingClientRect().top + window.innerHeight - elementToScrollTo.offsetHeight)
  }, []);

  const handleImaxClick = () => {
    open('https://www.youtube.com/watch?v=B_UvdLYSk7Q&t=3s&ab_channel=IMAX');
  }

  const handle4dxClick = () => {
    open('https://www.youtube.com/watch?v=-Wm2y5028ds&t=5s&ab_channel=4DX');
  }

  return <>


    <div className="textOmOss">
      <h1 className="h1omoss">Filmvisarna</h1>
      <p>Filmvisarna är en nyöppnad biograf i centrala Malmö.  Vi siktar på ett erbjuda en unik filmupplevelse med den bästa och nyaste tekniken på marknaden </p>
      <ul>
        <h2>Regler</h2>
        <li>Ta inte med egen mat och dryck in i lokalen</li>
        <li>Var tyst under filmens gång</li>
        <li>Var snäll och ställ in mobilen på ljudlös för att inte störa andra i publiken</li>
        <li>Nödutgångar finns tydligt skyltade i alla våra salonger</li>
      </ul>
      <h2 className="h2omoss">Information</h2>
      <p>Pris: 130kr/biljett </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum enim libero, non vulputate nunc mattis eget. Nullam tempor nisl nec facilisis sollicitudin. Morbi ultricies egestas justo eget pretium. Donec ut velit eget lorem varius lacinia. Nam sodales dictum elit, ac placerat massa fringilla vitae. Sed feugiat, erat quis convallis.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae minus consequuntur, aliquid sapiente alias possimus numquam, cupiditate earum vitae iure labore debitis incidunt quam? Iure quae quasi ea aperiam inventore.</p>
    </div>
    <div className="bilder">
      <img src='./images/Butik/theatre1.jpg'></img>
      <img src='./images/Butik/theatre2.jpg'></img>
    </div>

    <div className="textOmOss">
      <h2 className="h2omoss"></h2>
      <div className="theatre-options">
        <div className="option" >
          <h3>IMAX</h3>
          <img src='./images/Butik/imax2.jpg' onClick={handleImaxClick} />

        </div>
        <div className="option" >
          <h3>4DX</h3>
          <img src='./images/Butik/4dx.jpg' onClick={handle4dxClick} />

        </div>

      </div>
    </div>
  </>
}


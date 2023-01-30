import { useStates } from "../../utilities/states";

export default function Home() {
  let s = useStates('main');
  return <>
    <h4>Filmvisarna © 2022</h4>
    <p>Östra Fejkadress 28, 213 44 Malmö </p>
    <p>040 - 586 33 00 </p>
    <p>info@filmvisarna.se </p>
    <img src='./images/Twitter_icon.png' />
    <img src='./images/Facebook_icon.jpg' />
    <img src='./images/Instagram_icon.png' />
  </>
}
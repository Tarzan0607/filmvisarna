import { useStates } from "../../utilities/states";

export default function Home() {
  let s = useStates('main');
  return <>
    <a>Filmvisarna © </a> <img src='./images/Facebook_icon.jpg' /> <img src='./images/Instagram_icon.png' />
  </>
}
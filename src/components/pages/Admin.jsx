import { useStates } from "../../utilities/states";
import '../../css/style-admin.css';
import {
    get
} from '../../utilities/backend-talk';
import { useEffect, useState } from "react";

import Pagination from '../admin/Pagination';

export default function Admin() {

    const [bokningarData, setBokningarData] = useState([]);
    const [bokningarPerPage, setBokningarPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    const [sortId, setSortId] = useState("");
    const [sortDone, setSortDone] = useState("");
    
    function onInput(event) {
        const input = document.getElementById("filterBox").value;

        setSortId(input.toLowerCase());
    }

    function sortById() {
        return bokningarData.sort(a => {
            return a.bokningsNummer.toLowerCase() ==~ sortId ? 1 : -1;
        });

        //return bokningarData.filter(bokning => bokning.bokningsNummer.toLowerCase().includes(sortId));
    }

  useEffect(() => {
    (async () => {
        const bokningar = await get('/api/admin');
        
        const bokningarArray = Object.values(grupperaIn((bokning) => bokning.booking_number, bokningar.response));

        const bokningsArray = [];
        bokningarArray.map(bokning => {
            const date = new Date(bokning[0].time);
            bokningsArray.push({bokningsNummer: bokning[0].booking_number, Film: bokning[0].title, visningsTid: remakeDate(date), bokningsID: bokning[0].booking_id, bokning: bokning});
        });

        setBokningarData(bokningsArray);
    })();
  }, []);

  useEffect(() => {
    if (sortId === sortDone) { return; }

    setSortDone(sortId.toLowerCase());
  }, [sortId]);

  //POSSIBLY REMOVE SORTING?

  const lastPostIndex = currentPage * bokningarPerPage;
  const firstPostIndex = lastPostIndex - bokningarPerPage;
  const currentPost = bokningarData.slice(firstPostIndex, lastPostIndex);

  //currenPost.map will map up one page at a time and make pagination work (HAVE TO FIX ISSUES WITH FILTERING)

  return <div>
    <h1 className="allaBokningar">Alla bokningar</h1>
    <div className="input">
        <input className="input-box" id="filterBox" placeholder="Filtrera på ID" onInput={onInput} />
    </div>
    {bokningarData.filter(bokning => bokning.bokningsNummer.toLowerCase().includes(sortId)).map(({bokningsNummer, bokning, visningsTid, bokningsID, Film}) => <div className="bokning">
        <h2>Bokning: {bokningsNummer}</h2>
        <p>Film: {Film}</p>
        <p>Visningstid: {visningsTid}</p>
        <p>BokningsID: {bokningsID}</p>
        {bokning.map(({ticketType_id, seat_id}) => <div className="ticketBox">
           <p>TicketType: {ticketType_id === 1 ? "Vuxen" : ticketType_id === 2 ? "Barn" : ticketType_id === 3 ? "Senior" : "Undefined"}</p>
           <p>StolID: {seat_id}</p>
        </div>
        )}
        <hr />
    </div>)}
    <Pagination totalPosts={bokningarData.length} bokningarPerPage={bokningarPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
  </div>
}

function grupperaIn(gruppFn, array) {
    const groups = {};
  
    array.forEach((bokning) => {
      const key = gruppFn(bokning);
  
      if (groups[key] !== undefined) {
        groups[key].push(bokning);
      } else {
        groups[key] = [bokning];
      }
    });
  
    return groups;
}

function remakeDate(date) {
    const AD = date;
    const ADY = AD.getFullYear();
    let ADM = AD.getMonth() + 1;
    let ADD = AD.getDate();
    let ADH = AD.getHours();
    let ADMI = AD.getMinutes();
    let ADS = AD.getSeconds();

    if (ADD < 10) {
        ADD = '0' + AD.getDate();
    }
    if (ADM < 10) {
        ADM = '0' + ADM;
    }
    if (ADH < 10) {
        ADH = '0' + AD.getHours();
    }
    if (ADMI < 10) {
        ADMI = '0' + AD.getMinutes();
    }
    if (ADS < 10) {
        ADS = '0' + AD.getSeconds();
    }

    return `${ADY}-${ADM}-${ADD} ${ADH}:${ADMI}:${ADS}`;
}
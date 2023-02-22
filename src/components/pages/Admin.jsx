import { useStates } from "../../utilities/states";
import '../../css/style-admin.css';
import {
    get
} from '../../utilities/backend-talk';
import { useEffect, useState } from "react";

import Pagination from '../admin/Pagination';

export default function Admin() {

    const [bokningarData, setBokningarData] = useState([]);
    const [sortId, setSortId] = useState("");
    
    function onInput(event) {
        const input = event.target.value;

        setSortId(input.toLowerCase());
    }

  useEffect(() => {
    (async () => {
        const bokningar = await get('/api/admin');
        
        const bokningarArray = Object.values(grupperaIn((bokning) => bokning.booking_number, bokningar.response));

        const bokningsArray = [];
        bokningarArray.map(bokning => {
            const date = new Date(bokning[0].time);
            bokningsArray.push({bokningsNummer: bokning[0].booking_number, Film: bokning[0].title, visningsTid: remakeDate(date), bokningsID: bokning[0].booking_id, bokning: bokning, email: bokning[0].email});
        });

        setBokningarData(bokningsArray);
    })();
  }, []);

  return <div>
    <h1 className="allaBokningar">Alla bokningar</h1>
    <div className="input">
        <input className="input-box" id="filterBox" placeholder="Filtrera på ID" onInput={onInput} />
    </div>
    {bokningarData.filter(bokning => bokning.bokningsNummer.toLowerCase().includes(sortId)).map(({bokningsNummer, bokning, visningsTid, bokningsID, Film, email}) => <div key={bokningsNummer} className="bokning">
        <h2>Bokning: {bokningsNummer}</h2>
        <p>Film: {Film}</p>
        <p>Visningstid: {visningsTid}</p>
        <p>BokningsEmail: {email}</p>
        <p>BokningsID: {bokningsID}</p>
        {bokning.map(({ticketType_id, seat_id}) => <div key={bokningsNummer + "_" + seat_id} className="ticketBox">
           <p>TicketType: {ticketType_id === 1 ? "Vuxen" : ticketType_id === 2 ? "Barn" : ticketType_id === 3 ? "Senior" : "Undefined"}</p>
           <p>StolID: {seat_id}</p>
        </div>
        )}
        <hr />
    </div>)}
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

    return `${ADY}-${ADM}-${ADD} ${ADH}:${ADMI}`;
}
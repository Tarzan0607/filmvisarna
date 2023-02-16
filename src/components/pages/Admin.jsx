import { useStates } from "../../utilities/states";
import '../../css/style-admin.css';
import {
    get
} from '../../utilities/backend-talk';
import { useEffect } from "react";

export default function Spelschema() {

    const s = useStates({
        bokningar: []
    });

  useEffect(() => {
    (async () => {
        const bokningar = await get('/api/admin');
        
        const bokningarArray = Object.values(grupperaIn((bokning) => bokning.booking_number, bokningar.response));

        const bokningsArray = [];
        bokningarArray.map(bokning => {
            const date = new Date(bokning[0].time);
            bokningsArray.push({bokningsNummer: bokning[0].booking_number, visningsTid: remakeDate(date), bokningsID: bokning[0].booking_id, bokning: bokning});
        });

        s.bokningar = bokningsArray;
    })();
  }, []);

  return <div className='showingsTitle'>
    <h1 className="allaBokningar">Alla bokningar</h1>
    {s.bokningar.map(({bokningsNummer, bokning, visningsTid, bokningsID}) => <div className="bokning">
        <h2>Bokning: {bokningsNummer}</h2>
        <p>Visningstid: {visningsTid}</p>
        <p>BokningsID: {bokningsID}</p>
        <br />
        {bokning.map(({ticketType_id, seat_id}) => <div className="ticketBox">
            <p>TicketType: {ticketType_id}</p>
            <p>StolID: {seat_id}</p>
        </div>)}
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
};

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
import '../../css/MovieDetails.css';
import {
    Navigate,
    useParams
} from 'react-router-dom'
import { useStates } from '../../utilities/states';

export default function moveDetails() {

    const s = useStates('main');

    const { MoviePath } = useParams();
    const movie = s.films.find(movie => movie.path === '/movie/' + MoviePath);
    if (!movie) return <h1>No movie could be found!</h1>

    const { title, images, youtubeTrailers, director, productionYear, actors, language, subtitles, length } = movie;

    let description = movie && movie.description.split('<p>')
    .map(x => x.replace(/<\/p>/g, ''))
    .map(x => <p>{x}</p>)
    function remakeLength(num) { 
        var hours = Math.floor(num / 60);  
        var minutes = num % 60;
        return hours + " tim "  + minutes + " min";
    }

    return <body className='detailsBody'>
        <iframe src={'https://www.youtube.com/embed/' + youtubeTrailers[0]} className="moviesTrailer" height="750"></iframe>
        <img src={'/images/' + images} className="moviesPoster" height="750" />
        <div className='moviesContainer'>
            <div className='moviesInfo'>
                <h2 className='moviesTitle'>{title}</h2>
                <p className='moviesDescription'>{description}</p>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Produktionsår:</div>
                <div className='moviesInfoDesc'>{productionYear}</div>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Regi:</div>
                <div className='moviesInfoDesc'>{director}</div>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Cast:</div>
                <div className='moviesInfoDesc'>{actors.join(', ')}</div>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Språk:</div>
                <div className='moviesInfoDesc'>{language}</div>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Undertexter:</div>
                <div className='moviesInfoDesc'>{subtitles}</div>
            </div>
            <div className='moviesInfo'>
                <div className='moviesInfoTitle'>Speltid:</div>
                <div className='moviesInfoDesc'>{remakeLength(length)}</div>
            </div>
        </div>
        <button className='moviesBuyTicket'>Köp Biljetter</button>
    </body>
}
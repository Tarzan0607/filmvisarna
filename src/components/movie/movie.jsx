import { useStates } from "../../utilities/states";

export default function Movie({ id }) {
    let s = useStates('main');

    let movie = s.films.find(movie => movie.id === id);
    let { title, length, subtitles, description, images, path } = movie;
    let showcaseImage = "./images/" + images

    return <div className="movie">
        <h1 className="movieTitle">{title}</h1>
        <div className="moviePreview">
            <Link to={movie.path}><img src={showcaseImage} /></Link>
        </div>
    </div>
}
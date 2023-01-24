import { useStates } from "../../utilities/states";

export default function Movie({id}) {
    let s = useStates('main');

    let movie = s.films.find(movie => movie.id === id);
    let {title, length, subtitles, description, images} = movie;
    let showcaseImage = "./public/images/" + images

    return <div className="movie">
        <h1 className="movieTitle">{title}</h1>
        <div className="moviePreview">
            <img src={showcaseImage} />
        </div>
    </div>
}
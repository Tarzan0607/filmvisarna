import { useStates } from "../../utilities/states";

export default function Movie({id}) {
    let s = useStates('main');

    let movie = s.films.find(movie => movie.id === id);
    let {title, length, subtitles} = movie;

    return <div className="movie">
        <h1>{title} {length}</h1>
    </div>
}
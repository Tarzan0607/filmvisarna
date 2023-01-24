import { useStates } from "../../utilities/states";
import Movie from './movie'

export default function movieList() {

    let s = useStates('main');

    return<div className="movieBox"> 
    {
        s.films.map(({id}) => <Movie id={id}/>)
    }
    </div>
}
import MovieList from '../movie/MovieList';

export default function Home() {
    return<>
        <h1 className='movieTitle'>All available Films</h1>
        <MovieList />
    </>
}
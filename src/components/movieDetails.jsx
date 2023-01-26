export default function moveDetails() {

    const { moviePath } = useParams();
    const movie = s.films.find(movie => movie.path === '/' + moviePath);


    return <>
        <h1>Insert info about 1 movie here</h1>
    </>
}
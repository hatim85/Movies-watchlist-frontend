import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import MovieList from './components/MovieList'
import SignUp from './pages/SignUp'
import MovieItem from './components/MovieItem'
import AddMovieForm from './components/AddMovieForm'
import EditMovieForm from './components/EditMovieForm'
import MovieDetails from './components/MovieDetails'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <MovieList/> </ProtectedRoute>} />
        <Route path='/editmovie/:id' element={<ProtectedRoute> <EditMovieForm/> </ProtectedRoute>} />
        <Route path='/moviedetails/:id' element={<ProtectedRoute> <MovieDetails/> </ProtectedRoute>} />
        <Route path='/addmovie' element={<ProtectedRoute> <AddMovieForm/> </ProtectedRoute>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

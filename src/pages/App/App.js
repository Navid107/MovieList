import React, { useState, useEffect }  from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import {favorite, getAll, remove } from '../../utils/postApi'
import ProfilePage from "../ProfilePage/ProfilePage";
import userService from "../../utils/userService";
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import Protected from '../../components/Protected/Protected';
import axios from 'axios'
import PageHeader from '../../components/Header/Header'
import SearchForMovie from '../../components/SearchForMovie/SearchForMovie'
import Results from '../../components/Results/Results'
import Detail  from '../../components/Detail/Detail'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const [favorites, setFavorites] = useState([]);

	async function removeHandler(){
		try{
			console.log(state.selected)
			const {id} = state.selected 
			const response = await remove(id)
			if(response.data === 'good'){
				const copyFavorites = [...favorites].filter(element => element.favorite.id !== id)
				setFavorites(copyFavorites)
				const newSelected = {...state.selected}
				newSelected.favorited = false
				setState({...state, selected: newSelected})
			}
			console.log(response)
		}catch(err){
			console.log(err)
		}
	}

  async function fetchFavorites() {
    try {
      const data = await getAll();
      if(data instanceof Error){
        throw new Error(data)
      }
			if(data && data.posts){
				setFavorites(data.posts);
			}

    } catch (err) {

      console.log(err, " this is the error");
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=d2d13be";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openDetail = id => {
    axios('http://www.omdbapi.com/' + "?i=" + id + '&apikey=d2d13be').then(({ data }) => {
      let result = data;
      console.log(result);
      result.id = id
			//is id in favorites?
			//http://localhost:3000/
			const exists = favorites.find(movie => movie.favorite.id === id)
			if(exists){
				result.favorited = true
			}
			console.log(exists, id, '<--- this is my id')
      setState(prevState => {
        return { ...prevState, selected: result }
        
      });
      console.log(state)
    });
  }

  const closeDetail = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  
  async function addToFavorite(){
    try{
      const response = await favorite(state.selected);
			setState({...state, selected: { ...state.selected, favorited: true }})
    } catch(err){
			console.log(err)
			return err
    }
  }
	async function removeFavorite(uniqueId){
    try{
      const response = await favorite(state.selected);
    } catch(err){
			console.log(err)
			return err
    }
  }
  // decode our jwt token
  const [user, setUser] = useState(userService.getUser());
  // store the payload, aka the users infor in state


  function handleSignUpOrLogin() {
    // this function we want to call after we signup or login
    // always be in the handleSubmit of the form
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

if (user) {
  return (

    <Routes>
      
			<Route
				path="/" element={ 
					<div className="App">  
						<PageHeader user={user} handleLogout={handleLogout} />  
						<main>
							<SearchForMovie handleInput={handleInput} search={search} />
							<Results results={state.results} openDetail={openDetail} />
							{(typeof state.selected.Title != "undefined") ?
								<Detail favorites={favorites} selected={state.selected} closeDetail={closeDetail}
									addToFavorite={addToFavorite}
									removeFavorite={removeFavorite}
							/> : false}
						</main>
					</div>
				}>
			</Route>

        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />

        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="/:username" element={<Protected user={user}>
          <ProfilePage user={user}
         favorites={favorites} closeDetail={closeDetail}
         openDetail={openDetail} removeFavorite={removeFavorite} addToFavorite={addToFavorite}/>
         
         {(typeof state.selected.Title != "undefined") ?
								<Detail favorites={favorites} selected={state.selected} closeDetail={closeDetail}
									addToFavorite={addToFavorite}
									removeFavorite={removeFavorite}
							/> : false}
         
         
         </Protected>} />
      
    </Routes>
  );
}

return (
  <Routes>
    <Route
      path="/login"
      element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
    />

    <Route
      path="/signup"
      element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
    />
    <Route path="/*" element={<Navigate to="/login" />} />
  </Routes>
);
}

export default App;
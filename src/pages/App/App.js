import React, { useState }  from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import {favorite} from '../../utils/postApi'
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

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
    console.log(id, '<--- this is my id')
  }

  const closeDetail = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  
  async function addToFavorite(){
    console.log(state.selected)
    try{
      const response = await favorite(state.selected);
      console.log(response)

    } catch(err){

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
            <Detail selected={state.selected} closeDetail={closeDetail}
            addToFavorite={addToFavorite} /> : false}
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
        <Route path="/:username" element={<Protected user={user}><ProfilePage user={user} /></Protected>} />
      
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

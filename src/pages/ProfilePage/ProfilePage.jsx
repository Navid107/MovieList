import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import Detail from "../../components/Detail/Detail";
import { favorite } from "../../utils/postApi";
import Results2 from "../../components/Results/Results2";
import FoundMovie from "../../components/FoundMovie/FoundMovie";




export default function ProfilePage(props) {
//   const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

  // This variable name is coming from the route definition in app.js
  const { username } = useParams();

  useEffect(() => {
    // async and await on this anoymous function ^

    getProfile();
  }, [username]);

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
    //   setPosts(data.posts);
      setUser(data.user);
    //   setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }
  

  // Always check the error before loading, because if there is an error
  // we know something went wrong with the fetch call, therefore the http request
  // is complete


  const  favorites  = props.favorites
  console.log(favorites)
	const favoritesMap = favorites.map((favorite, index)=> {
		
		return(
    <li key={index}>
				{/* {Title}
				<br />
				<img src={Poster}/> */}
        <Detail selected={favorite.favorite} closeDetail={props.closeDetail}
         remove={props.removeFavorite} addToFavorite={props.addToFavorite} />
			</li>
		)
	})
	return(
		<main>
      <PageHeader user={user}/>
			my faves 
			<br />
      <Results2 results={favorites} openDetail={props.openDetail}/>
      
		</main>
	)
}
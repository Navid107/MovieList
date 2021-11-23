import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";



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


  const { favorites } = props

	const favoritesMap = favorites.map(({favorite: {Title, Poster, ...rest}, ...doc})=> {
		console.log(rest, doc)
		return(
			<>
				{Title}
				<br />
				<img src={Poster}/>
			</>
		)
	})
	return(
		<main>
      <PageHeader user={user}/>
			my faves 
			<br />
			{favoritesMap}
		</main>
	)
}
import React, { useState, useEffect } from "react";
import { Image, Grid, Segment } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import * as postApi from "../../utils/postApi";


export default function ProfileBio({ user }) {
  const [posts, setPosts] = useState([]);

  async function addFavorites() {
    try {
      console.log('this is addfavorite')
      const data = await postApi.getAll();
      if(!data.post){
        throw new Error(data)
      }
      const {posts} = data
      console.log(data,"this is data")
      setPosts([...data.posts]);

    } catch (err) {

      console.log(err, " this is the error");
    }
  }

  useEffect(() => {
    addFavorites();
  }, []);



  return (
    <><PageHeader user={user} /><Grid textAlign="center" columns={2} className="Profile">
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${user.photoUrl
              ? user.photoUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `}
            avatar
            size="small" />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h3>{user.username}</h3>
          </Segment>
          <Segment>
            <span> Bio: {user.bio}</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid></>
  );
}

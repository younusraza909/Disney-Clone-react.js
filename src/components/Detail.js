import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Redirect } from "react-router-dom";
import db from "../firebase";

const Detail = () => {
  const { id } = useParams();
  const [MovieData, setMovieData] = useState({});
  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMovieData(doc.data());
        } else {
          <Redirect to='/' />;
        }
      });
  }, []);
  return (
    <Container>
      {MovieData && (
        <>
          <Background>
            <img src={MovieData.backgroundImg} alt='' />
          </Background>
          <ImageTitle>
            <img src={MovieData.titleImg} alt='' />
          </ImageTitle>
          <Controls>
            <PlayButton>
              <img src='/images/play-icon-black.png' alt='' />
              <span>PLAY</span>
            </PlayButton>
            <TrailerButton>
              <img src='/images/play-icon-white.png' alt='' />
              <span>TRAILER</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src='/images/group-icon.png' alt='' />
            </GroupWatchButton>
          </Controls>
          <SubTitle>{MovieData.subTitle}</SubTitle>
          <Description>{MovieData.description}</Description>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  min-width: 200px;
  width: 35vw;
  margin-top: 5rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayButton = styled.button`
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  height: 56px;
  background-color: rgb(249, 249, 249);
  border: none;
  padding: 0px 24px;
  margin-right: 22px;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background-color: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background-color: rgba(0, 0, 0, 0.3);
  color: rgb(249, 249, 249);
  border: 1px solid rgb(249, 249, 249);
`;
const AddButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid white;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 16px;
  span {
    font-size: 30px;
    color: white;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background-color: rgb(0, 0, 0);
`;

const SubTitle = styled.div`
  color: rgba(249, 249, 249, 0.7);
  font-size: 15px;
  min-height: 20px;
  margin-top: 26px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
  width: 50%;
`;

export default Detail;

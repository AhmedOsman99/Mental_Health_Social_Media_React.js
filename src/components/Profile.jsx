import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../css/style.css';
import { EditModal, PhotosModal } from "./ModalDialog";
import { Post } from "./Post";
import { postContext } from "./contexts/PostContext";
import AuthContext from "../context/AuthContext";
import { addNewPost, fetchProfilePosts, getUserById, sendRequest, isFriend } from "../APIs/utils";
import { useParams } from "react-router";
export function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [aboutContent, setAboutContent] = useState("about her");
  const [photos, setPhotos] = useState([]); // Array to store the photos
  let { contextData } = useContext(AuthContext);
  let { user, userInfo } = contextData;
  let { posts, setPosts } = useContext(postContext);

  let [newPost, setNewPost] = useState({
    content: "",
  });

  let operationHandler = (event) => {
    setNewPost({ content: event.target.value });
  };

  let addPost = async () => {
    let response = await addNewPost(newPost);
    // setPosts({...posts, newPost});
    console.log(response.data);
  };

  let fetchAllPosts = async () => {
    let response = await fetchProfilePosts(id);
    setPosts(response.data);
  };
  let [userById, setuserById] = useState({
    id: "",
    first_name: "",
    last_name: "",
  });
  // console.log(userById.id);

  let getUser = async () => {
    let userdata = await getUserById(id);
    console.log(userdata.data.user.id);
    setuserById(userdata.data.user);
    return userdata;
  };
  // console.log(getUser);
  const { id } = useParams();
  useEffect(() => {
    fetchAllPosts();
    getUser();
  }, []);

  const handleEditAbout = () => {
    setShowEditModal(true);
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    // Perform save action here
    setShowEditModal(false);
  };

  const handleViewPhotos = () => {
    setShowPhotosModal(true);
  };

  // handle conect button
  const [connectButtonText, setConnectButtonText] = useState("Connect");
  const [connectButtonVariant, setConnectButtonVariant] = useState("light");
  const [connectButtonDisabled, setConnectButtonDisabled] = useState(false);

  const sendConnectRequest = async () => {
      let response = await sendRequest(id);
      console.log(response);
      window.location.reload();
      }


      useEffect(() => {
        const fetchData = async () => {
          const response = await isFriend(id);
          console.log(response);
          const friendStatus = response.data[0].status;

          
      if (friendStatus === "pending") {
        // if friend request is pending, update button to show "Pending"
        setConnectButtonText("Pending");
        setConnectButtonVariant("secondary");
        setConnectButtonDisabled(true);
      } else if (friendStatus === "accepted") {
        // if friend request is accepted, update button to show "Friend"
        setConnectButtonText("Friend");
        setConnectButtonVariant("secondary");
        setConnectButtonDisabled(true);}

        else {
          // if friend request is rejected, update button to show "Connect"
          setConnectButtonText("Connect");
          setConnectButtonVariant("light");
          setConnectButtonDisabled(false);}
      }

      fetchData();
   }, [id] );


   
  return (
    <div className="app-container">
      <Container>
        <Row
          className="group1 justify-content-center pt-2 mt-3"
          style={{
            background:
              "linear-gradient(180deg, rgb(201, 214, 255) 0%, rgb(226, 226, 226) 100%)",
            borderRadius: "16px",
            minHeight: "300px",
          }}
        >
          <Col lg={10}>
            <Row className="align-items-center">
              <Col xs={12} md={4} className="text-center">
                <div className="image-wrapper">
                  <Image
                    className="ellipse w-75"
                    alt="Ellipse"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    fluid
                  />
                </div>
              </Col>
              <Col
                xs={12}
                md={8}
                className="text-md-start mt-4 mt-md-0 d-flex flex-column align-items-md-start"
              >
                <div className="d-flex align-items-center">
                  <h1 className="mb-4">Dr. {userById.first_name}</h1>
                </div>
                <div className="buttons-wrapper">
                <Button
                  onClick={sendConnectRequest}
                  className="custom-button frame-3 me-3 connect-button"
                  variant={connectButtonVariant}
                  style={{
                    backgroundColor: "#83c5be",
                    borderRadius: "20px",
                    minWidth: "120px",
                  }}
                  disabled={connectButtonDisabled}
                >
                  <span>{connectButtonText}</span>
                </Button>
                  <Button
                    className="custom-button frame-3 me-3 reservation-button"
                    variant="light"
                    style={{
                      backgroundColor: "#83c5be",
                      borderRadius: "20px",
                      minWidth: "120px",
                    }}
                  >
                    <span>Reservation</span>
                  </Button>
                  <Button
                    className="frame-4 me-3 btn-outline-secondary"
                    variant="#83c5be"
                    style={{ borderRadius: "20px", minWidth: "120px" }}
                  >
                    {/* <span>Message</span> */}
                  </Button>
                  <Button
                    className="div-wrapper btn-outline-secondary"
                    variant="#83c5be"
                    style={{ borderRadius: "20px", minWidth: "120px" }}
                  >
                    {/* <span>More</span> */}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} lg={4} className="leftcol mx-0 mx-md-4">
            <Row>
              <Col
                className="mt-4 col-12 bg-white shadow-lg"
                style={{ borderRadius: "20px" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h2>About</h2>
                  <span
                    className="bi bi-pencil"
                    onClick={handleEditAbout}
                  ></span>
                </div>
                <p>{aboutContent}</p>
              </Col>
            </Row>
            <Row>
              <Col
                className="mt-4 col-12 bg-white shadow-lg"
                style={{ borderRadius: "20px" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Photos</h2>
                  <Button
                    variant="link"
                    style={{
                      border: "none",
                      boxShadow: "none",
                      textDecoration: "none",
                      color: "#83c5be",
                    }}
                    onClick={handleViewPhotos}
                  >
                    <span>See All</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={6} lg={7} className="rightcol">
            <Row>
              <Col className="mt-2 col-12 " style={{ borderRadius: "20px" }}>
                <Row
                  className="mt-3 py-1 bg-white shadow-lg"
                  style={{ borderRadius: "20px" }}
                >
                  <h2>Posts</h2>
                </Row>
                <Row>
                  {posts.length > 0 ? (
                    posts.map((post) => <Post post={post} />)
                  ) : (
                    <p>No posts to show.</p>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal for editing the About content */}
      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSaveAbout={handleSaveAbout}
        aboutContent={aboutContent}
        setAboutContent={setAboutContent}
      />
      {/* Modal for viewing all photos */}
      <PhotosModal
        show={showPhotosModal}
        handleClose={() => setShowPhotosModal(false)}
        photos={photos}
      />
    </div>
  );
}

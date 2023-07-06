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
import {
  addNewPost,
  fetchProfilePosts,
  getUserById,
  isFriend,
  sendRequest,
} from "../APIs/utils";
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
  let [userType, setuserType] = useState({});
  const { id } = useParams();
  console.log(userById.id);
  console.log(userType);
  let getUser = async () => {
    let userdata = await getUserById(id);
    // console.log(userdata.data.user_type);
    setuserById(userdata.data.user);
    setuserType(userdata.data.user_type);
    return userdata;
  };
  // console.log(getUser);
  useEffect(() => {
    fetchAllPosts();
    getUser();
  }, [id]);

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
  const [connectButtonText, setConnectButtonText] = useState("Connect");
  const [connectButtonVariant, setConnectButtonVariant] = useState("light");
  const [connectButtonDisabled, setConnectButtonDisabled] = useState(false);

  const sendConnectRequest = async () => {
    let response = await sendRequest(id);
    console.log(response);
    window.location.reload();
  };

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
        setConnectButtonDisabled(true);
      } else {
        // if friend request is rejected, update button to show "Connect"
        setConnectButtonText("Connect");
        setConnectButtonVariant("light");
        setConnectButtonDisabled(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="app-container">
      <Container>
        <Row
          className="group1 justify-content-center pt-4 mt-3"
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
                  <h1 className="mb-4">
                    {userType === "doctor" && (
                      <h1 className="mb-4">
                        Dr. {userById.first_name + " " + userById.last_name}
                      </h1>
                    )}
                    {userType === "person" && (
                      <h1 className="mb-4">
                        {userById.first_name + " " + userById.last_name}
                      </h1>
                    )}
                  </h1>
                </div>

                {userType === "doctor" && (
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
                      <span>Message</span>
                    </Button>
                    <Button
                      className="div-wrapper btn-outline-secondary"
                      variant="#83c5be"
                      style={{ borderRadius: "20px", minWidth: "120px" }}
                    >
                      <span>More</span>
                    </Button>
                  </div>
                )}
                {userType === "person" && (
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
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} lg={4} className="leftcol mx-0 mx-md-4">
            <Row>
              {userType === "doctor" && (
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
              )}
              {userType === "person" && (
                <Row>
                  <Col
                    className="mt-4  bg-white shadow-lg"
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
              )}
            </Row>
            <Row>
              {userType === "doctor" && (
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
                  <Row className="g-2">
                    {posts.slice(0, 4).map((post, index) => (
                      <Col
                        key={post.id}
                        xs={12}
                        sm={6}
                        md={index < 2 ? 6 : 4}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div className="photo-container ">
                          <Image
                            src={post.image}
                            rounded
                            className="photo-img"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
          <Col md={6} lg={7} className="rightcol">
            <Row>
              {userType === "doctor" && (
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
              )}
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

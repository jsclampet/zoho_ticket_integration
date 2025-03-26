import { useState } from "react";
import { getAccessToken } from "./utilities/tokens";
import dayjs from "dayjs";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { BsTicket } from "react-icons/bs";
import "./App.css";

type AccessToken = {
  access_token: string;
  created_time: string;
  expiry_time: string;
};

function App() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const ensureValidToken = async () => {
    try {
      const storedToken = localStorage.getItem("accessToken");
      const accessToken: AccessToken | null = storedToken
        ? JSON.parse(storedToken)
        : null;
      if (accessToken && dayjs(accessToken.expiry_time).isAfter(dayjs())) {
        setIsAuth(true);
        console.log("Access Token already exist and non-expired");
        return;
      } else {
        const response = await getAccessToken();
        const tokenData = response.data;
        localStorage.setItem("accessToken", JSON.stringify(tokenData));
        console.log(response);
        console.log(
          "***CREATED ACCESS TOKEN",
          localStorage.getItem("accessToken")
        );
        setIsAuth(true);
      }
    } catch (error) {
      setIsAuth(false);
      console.error("Error in ensureValidToken():", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    await ensureValidToken();
    setIsLoading(false);
    try {
      const ticketResponse = await axios.post(
        "http://localhost:3008/create_request",
        {
          auth: localStorage.getItem("accessToken"),
        }
      );
      console.log(ticketResponse);
    } catch (error) {
      console.log(error.message);
    }

    console.log(ticketResponse);
    handleClose();
  };

  return (
    <>
      <Button variant="warning" className="sdp-btn-icon" onClick={handleShow}>
        <BsTicket className="sdp-btn-icon" />
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Submit a ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="ticket.details">
                <Form.Label>Dealership</Form.Label>
                <Form.Control
                  type="text"
                  value="Beach Mazda"
                  readOnly
                  disabled
                  autoFocus
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="ticket.details">
                <Form.Label>Dealer Group</Form.Label>
                <Form.Control
                  type="text"
                  value="Beach Automotive"
                  readOnly
                  autoFocus
                  disabled
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="ticket.category">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option>Select an option below</option>
                  <option>DMS</option>
                  <option>Horizon</option>
                  <option>VPN</option>
                  <option>Manufacture</option>
                  <option>Access Request</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="ticket.subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticket.description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Send
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;

import { useState } from "react";
import { useEffect } from "react";
import { getAccessToken } from "./utilities/tokens";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { LuTicket } from "react-icons/lu";
import "./App.css";

function App() {
  useEffect(() => {
    async function getAuth() {
      try {
        const response = await getAccessToken();
        const tokenData = response.data;
        await localStorage.setItem("authtoken", JSON.stringify(tokenData));
        console.log(response);
        console.log(localStorage.getItem("authtoken"));
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        console.log(error);
      }
    }
    getAuth();
  }, []);

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await getAccessToken();
    console.log(response);
    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <LuTicket />
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
              <Form.Label>Issue or Request</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: 'I am having issues logging into the DMS'"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ticket.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Please provide all relevant details and specifics."
                rows={4}
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple files input example</Form.Label>
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

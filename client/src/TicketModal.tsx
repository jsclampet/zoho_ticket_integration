import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LuTicket } from "react-icons/lu";
import "./App.css";

function TicketModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <LuTicket /> Submit Ticket <LuTicket />
      </Button>

      <Modal show={show} onHide={handleClose}>
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
                <Form.Label>DMS</Form.Label>
                <Form.Control
                  type="text"
                  value="CDK"
                  readOnly
                  autoFocus
                  disabled
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="ticket.details">
                <Form.Label>VPN</Form.Label>
                <Form.Control
                  type="text"
                  value="Cisco Anyconnect"
                  readOnly
                  disabled
                  autoFocus
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="ticket.details">
                <Form.Label>Manufacture Site</Form.Label>
                <Form.Control
                  type="text"
                  value="www.mazda.com"
                  readOnly
                  autoFocus
                  disabled
                />
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TicketModal;

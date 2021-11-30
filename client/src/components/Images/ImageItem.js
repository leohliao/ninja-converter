import React, { useState } from 'react';
import { Modal, Container, Card, Image, Row, Col} from 'react-bootstrap'

function ImageItem({ image, fileTitle }) {
    const [show, setShow] = useState(false);

  const handleToggleModal = () => {
    setShow(!show);
  };
  return (
    <Card
      key={image.id}
      className="my-3 p-3 rounded"
      onClick={handleToggleModal}>
      <Card.Img src={image.image_url} />
      <Modal
        show={show}
        onHide={handleToggleModal}
        aria-labelledby="contained-modal-title-vcenter"
        animation={false}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{fileTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Image src={image.image_url} fluid></Image>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <p>&copy;</p>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ImageItem

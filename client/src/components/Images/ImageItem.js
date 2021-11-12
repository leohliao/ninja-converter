import React from 'react'
import { Modal, Container, Button, Image, Row, Col} from 'react-bootstrap'

function ImageItem({ show, image, fileTitle, handleToggleModal }) {
  console.log('show: ', show);
  console.log('image: ', image);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleToggleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{fileTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Woohoo, you're reading this text in a modal!
            <Container>
                <Row>
                    <Col>
                        <Image src={image.image_url}></Image>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ImageItem

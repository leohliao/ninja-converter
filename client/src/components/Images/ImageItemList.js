import React, { useState } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap';
import ImageItem from './ImageItem'

export default function ImageItemList({images, fileTitle}) {
  console.log(images)
  const [show, setShow] = useState(false);
  const handleToggleModal = () => {
    console.log('show: ', show)
    setShow(!show);
  }
  return (
    <Container>
      <Row>
        {images.map((image) => (
          <Col key={image.id} sm={12} md={6} lg={4} xl={3}>
            <Card
              key={image.id}
              className="my-3 p-3 rounded"
              onClick={handleToggleModal}
            >
              <Card.Img src={image.image_url} />
              <ImageItem
                show={show}
                image={image}
                fileTitle={fileTitle}
                handleToggleModal={handleToggleModal}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

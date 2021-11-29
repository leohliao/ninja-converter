import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ImageItem from './ImageItem'

export default function ImageItemList({images, fileTitle}) {

  return (
    <Container>
      <Row>
        {images.map((image) => (
          <Col key={image.id} sm={12} md={6} lg={4} xl={3}>
              <ImageItem
                key={image.id}
                image={image}
                fileTitle={fileTitle}
              />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

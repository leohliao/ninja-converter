import React from 'react'
import { Container, Card } from 'react-bootstrap';

export default function ImageItemList({images}) {
    console.log(images)
    return (
      <Container>
        {
            images.map((image) => (
                <Card key={image.id} className="my-3 p-3 rounded">
                    <Card.Img src={image.image_url}/>
                </Card>
            ))
        }
      </Container>
    );
}

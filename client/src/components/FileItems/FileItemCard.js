import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FileItemCard({file}) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/file/${file.id}`}>
                <Card.Img src={file.cover_image_url}/>
            </Link>
                <Card.Body>
                    <Card.Title className="custom-card-title">
                        <strong>{file.title}</strong>
                    </Card.Title>
                    <Card.Text as="h6">
                        Pages: 12
                    </Card.Text>
                </Card.Body>
        </Card>
    )
}

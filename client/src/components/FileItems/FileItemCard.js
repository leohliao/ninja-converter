import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FileItemCard({file}) {

    const handleCheckImageUrl = () => {
        if (file.cover_image_url) {
            return (
                <div className="image-max-height">
                    <Card.Img src={file.cover_image_url} />
                </div>
            )
        } else {
            return (
              <div className="no-img image-max-height">
                  <i className="fas fa-ban custom-icon-size"></i>
              </div>
            );
        }
    }
    return (
      <Link className="text-decoration-none" to={`/file/${file.id}`}>
        <Card className="my-3 p-3 rounded custom-card">
          {handleCheckImageUrl()}
          <Card.Body>
            <Card.Title className="custom-card-title">
              <strong>{file.title}</strong>
            </Card.Title>
            <Card.Text as="h6">Pages: {file.total_pages || 0}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
}

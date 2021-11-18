import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchImage } from '../../utils/util_images'

export default function FileItemCard({file}) {
    const [imgSrc, setImgSrc] = useState("")

    useEffect(() => {
        async function handleFetchImage() {
            const { data } = await fetchImage(file.image_id);
            console.log('FileItemCard: data => ', data);
            setImgSrc(data.image_url);
        }

        handleFetchImage();
    }, [file.image_id]);
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/file/${file.id}`}>
                <Card.Img src={imgSrc}/>
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

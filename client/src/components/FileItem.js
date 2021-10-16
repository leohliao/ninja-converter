import React from 'react'
import { Link  } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import model_file from '../testData/model_file.json';
import model_image from '../testData/model_image.json'
import ImageItemList from './ImageItemList';

export default function FileItem({match}) {
    const file = model_file.find((f) => f.id == match.params.id)
    const images = model_image.filter((i) => i.file_id == match.params.id)
    return (
        <div>
            <Row>
                <Col md={1}>
                    <Link to='/' className="btn btn-light my-3">Go Back</Link>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>{file.title}</h2>
                    <p>Created: {file.created_datetime}</p>
                    <Image src={file.cover_image_url} alt={file.title} fluid ></Image>
                </Col>
                <Col md={6}>
                    <ListGroup.Item>
                        <ImageItemList images={images}/>
                    </ListGroup.Item>
                </Col>

            </Row>
        </div>
    )
}

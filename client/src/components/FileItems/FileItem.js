import React, { useState, useEffect } from 'react'
import { Link  } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import ImageItemList from '../Images/ImageItemList';
import { fetchFile } from '../../utils/util_files';
import { fetchImages } from '../../utils/util_images';

export default function FileItem({match}) {
    const [file, setFile] = useState({})
    const [images, setImages] = useState([])

    useEffect(() => {
        async function handleFetchFile(pk) {
            const { data } = await fetchFile(pk);
            if (data.length > 0) {
                console.log('data: ', data)
                setFile(data);
            }
        }
        async function handleFetchImages(pk) {
            const resp = await fetchImages(pk);
            const {data} = resp;
            if (data.length > 0) {
                setImages(data);
            }
        }

        handleFetchFile(match.params.id);
        handleFetchImages(match.params.id);
    }, [match])

    return (
        <div>
            <Row>
                <Col md={1}>
                    <Link to='/' className="btn btn-light my-3">Go Back</Link>
                </Col>
            </Row>
            <Row>
                <Col md={1}>
                    <Image src={file.cover_image_url} alt={file.title} fluid ></Image>
                </Col>
                <Col md={10}>
                    <h2>{file.title}</h2>
                    <p>Created: {file.created_datetime}</p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ListGroup.Item>
                        <ImageItemList images={images} fileTitle={file.title}/>
                    </ListGroup.Item>
                </Col>
            </Row>
        </div>
    )
}

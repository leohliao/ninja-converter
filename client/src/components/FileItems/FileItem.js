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
        async function handleFetchFile(match) {
            const { data } = await fetchFile(match);
            if (data.length > 0) {
                setFile(data);
            }
        }
        async function handleFetchImages(match) {
            const resp = await fetchImages(match);
            console.log('resp: ', resp)
            const {data} = resp;
            if (data.length > 0) {
                setImages(data);
            }
        }

        handleFetchFile(match);
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

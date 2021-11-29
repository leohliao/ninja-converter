import React, { useState, useEffect } from 'react'
import { Link  } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import ImageItemList from '../Images/ImageItemList';
import { fetchFile } from '../../utils/util_files';
import { fetchImages } from '../../utils/util_images';

export default function FileItem({match}) {
    const [file, setFile] = useState({})
    const [images, setImages] = useState([])

    const getTimestamp = (timestamp) => {
      const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
      const d = new Date(timestamp);

      return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${pad(
        d.getFullYear(),4)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    useEffect(() => {
        async function handleFetchFile(pk) {
            const resp = await fetchFile(pk);
            if (resp && resp.status === 200) {
                const { data } = resp;
                setFile(data);
            }
        }
        async function handleFetchImages(pk) {
            const resp = await fetchImages(pk);
            if (resp && resp.status === 200) {
                const { data } = resp;
                setImages(data);
            }
        }

        handleFetchFile(match.params.id);
        handleFetchImages(match.params.id);
    }, [match])

    const handleCheckImageUrl = () => {
        if (file.cover_image_url) {
            return <Image src={file.cover_image_url} alt={file.title} fluid ></Image>
        } else {
            return (
                <div className="no-img">
                    <i className="fas fa-ban"></i>
                </div>
            )
        }
    };

    return (
        <div>
            <Row>
                <Col md={1} className="item-row-thumbnail">
                    {handleCheckImageUrl()}
                </Col>
                <Col md={10} className="item-row-title">
                    <h2>{file.title}</h2>
                    <p>Created: {getTimestamp(file.created_datetime)}</p>
                </Col>
                <Col md={1}>
                    <Link to='/' className="btn btn-light my-3">Go Back</Link>
                </Col>
            </Row>
            <Row className="item-row-images">
                <Col md={12}>
                    <ListGroup.Item>
                        <ImageItemList images={images} fileTitle={file.title}/>
                    </ListGroup.Item>
                </Col>
            </Row>
        </div>
    )
}

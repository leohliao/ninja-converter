import React from 'react'
import { Row, Col } from 'react-bootstrap'
import FileItemCard from './FileItemCard'

import model_file from '../testData/model_file.json'

function FileItemLists() {
    const files = model_file;
    return (
        <div>
            <h2>Your files:</h2>
            <Row>
                {files.map(file => (
                    <Col key={file.id} sm={12} md={6} lg={4} xl={3}>
                        <FileItemCard file={file} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default FileItemLists

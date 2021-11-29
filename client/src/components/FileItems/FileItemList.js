import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import FileItemCard from './FileItemCard'
import { fetchFiles } from '../../utils/util_files';

function FileItemLists() {
    const [files, setFiles] = useState([])

    useEffect(() => {

        // Fetch all the files upon componentDidMount
        async function handleFetchFiles() {
            const { data } = await fetchFiles();
            setFiles(data);
        }
        
        handleFetchFiles();
    }, [])
    return (
        <div>
            <h2>Converted Files:</h2>
            <Row className="embed-responsive embed-responsive-4by3 gy-4">
                {files.map(file => (
                    <Col className="embed-responsive-item" key={file.id} sm={12} md={6} lg={4} xl={3}>
                        <FileItemCard file={file} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default FileItemLists

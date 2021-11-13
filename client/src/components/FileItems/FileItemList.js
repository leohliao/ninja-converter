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

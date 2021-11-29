import React, { useState } from 'react'
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { uploadFile } from '../../utils/util_files';
import { errorHandler } from '../../handlers/errorHandlers';

function ConverterIndex() {
    const hiddenFileInput = React.useRef(null);
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    };

    const toggleShow = () => setShow(!show);

    const handleChange = async (event) => {
        const formData = new FormData();
        // User can only upload 1 file at a time
        const uploadedFile = event.target.files[0];
        // lastModified: 1613095037055
        // lastModifiedDate: Thu Feb 11 2021 17:57:17 GMT-0800 (Pacific Standard Time) {}
        // name: "Sequoia Architecture.pptx"
        // size: 3356050
        // type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        // webkitRelativePath: ""
        formData.append('file', uploadedFile);
        formData.append('lastModified', uploadedFile.lastModified);
        formData.append('type', uploadedFile.type);
        try {
          const resp = await errorHandler(uploadFile(formData));
          setStatus(resp.data.status);
          setMsg(resp.data.msg)
          toggleShow();
        } catch (err) {
          setStatus('error');
          setMsg('Unknown error has occured');
          toggleShow();
        }
        // Todo: Activate loading bar
    };
    return (
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col md="auto text-align-center">
            <h1>Converter</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto text-align-center">
            <p className="text-muted">
              Convert you file by clicking on the button:
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto text-align-center">
            <p className="text-muted">(You can only upload 1 file at a time)</p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <input
              type="file"
              accept="application/pdf, application/vnd.ms-powerpoint, .ppt, .pptx"
              style={{ display: 'none' }}
              id="converter-input-button"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <label htmlFor="converter-input-button">
              <Button
                className="btn btn-dark my-3"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Upload File
              </Button>
            </label>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Toast show={show} onClose={toggleShow} animation={false} delay={5000} autohide>
            <Toast.Header>
              <i className="fas fa-exclamation-circle"></i>
              <strong className="me-auto">&nbsp; &nbsp; {status}</strong>
            </Toast.Header>
            <Toast.Body>
              {msg}
            </Toast.Body>
          </Toast>
        </Row>
      </Container>
    );
}

export default ConverterIndex

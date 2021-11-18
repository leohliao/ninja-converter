import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { uploadFile } from '../../utils/util_files';

function ConverterIndex() {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const formData = new FormData();
        const uploadedFile = event.target.files[0];
        // lastModified: 1613095037055
        // lastModifiedDate: Thu Feb 11 2021 17:57:17 GMT-0800 (Pacific Standard Time) {}
        // name: "Sequoia Architecture.pptx"
        // size: 3356050
        // type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        // webkitRelativePath: ""
        formData.append('file', uploadedFile);
        uploadFile(formData);
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
      </Container>
    );
}

export default ConverterIndex

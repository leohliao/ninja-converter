import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

function ConverterIndex() {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        console.log('fileUploaded: ', fileUploaded);
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
              accept="pdf/*"
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

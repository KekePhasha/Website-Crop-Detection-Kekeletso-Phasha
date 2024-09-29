
import './App.css';
import { Row, Col, Container, Button } from "react-bootstrap";

//image
import crop from './assets/crops.jpg';

function App() {
  return (
    <div className="App">
      <Row style={{ height: "100%" }}>
        <Col md={6}>
          <Container className='p-5'>
            <h1 style={{ fontSize: "2.5em", fontWeight: "bold" }}>
              Crop Disease Detection Using Beyond Visible Spectrum Data and Deep Leaning
            </h1>
            <br />

            <h3>
              By: Kekeletso Phasha
            </h3>

            <br />
            <h3>
              Project Description
            </h3>
            <p>
              This project aims to detect crop diseases using beyond visible spectrum data and deep learning. The project will use a dataset of crop images taken using a hyperspectral camera. The images will be pre-processed and fed into a deep learning model to classify the images into healthy and diseased crops. The project will evaluate the performance of the model and compare it with existing methods for crop disease detection. The project will also explore the potential of using beyond visible spectrum data for crop disease detection and its advantages over visible spectrum data.
            </p>
            <br />
            <form>
              <input type="file" name="image" />
              <br />
              <br />
              <Button type="submit">Upload Image</Button>

            </form>



          </Container>
        </Col>
        <Col md={6}>
          <img src={crop} alt="crop"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

        </Col>
      </Row>
    </div>
  );
}

export default App;

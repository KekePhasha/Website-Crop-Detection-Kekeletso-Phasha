
import './App.css';
import React, { useState } from 'react';
import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import specific elements
import crop from './assets/crops.jpg';

ChartJS.register(ArcElement, Tooltip, Legend); // Register the elements


//image

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [predictionData, setPredictionData] = useState({});


  const handleImageChange = (e) => {
    console.log("File Selected");
    setFile(e.target.files[0]);
  }

  //on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5001/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      setResponse(res.data.predicted_class);
      setPredictionData(res.data.prediction_percentages);
      handleShow();
    } catch (error) {
      console.log(error);
    }
  }
  // Prepare data for pie chart
  const chartData = {
    labels: Object.keys(predictionData),
    datasets: [
      {
        data: Object.values(predictionData), // Get values for the pie chart
        backgroundColor: ['#FF6384', '#36A2EB'], // Colors for each slice
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };


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
              <input type="file" name="file" accept='.pt'
                onChange={handleImageChange}
              />
              <br />
              <br />
              <Button
                type='submit'
                onClick={handleSubmit}
              >Upload Image</Button>

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>AI Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Center */}

          <h1
            style={{ textAlign: "center" }}
          >{response}</h1>
          <Pie data={chartData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default App;

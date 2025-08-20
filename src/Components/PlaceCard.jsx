import Card from "react-bootstrap/Card";

const PlaceCard = ({ place }) => {
  console.log(place);

  return (
    <div className="place-card-container">
      {place.map((item, index) => (
        <Card key={index} className="custom-card">
          <Card.Body>
            <Card.Title className="card-title">{item.name}</Card.Title>
            <Card.Subtitle className="card-subtitle mb-2 text-muted">
              {item.label}
            </Card.Subtitle>
            <Card.Text className="card-text">{item.address}</Card.Text>
            <Card.Text className="card-rating">
              Note : {item.global_rating}
            </Card.Text>

            <div className="d-flex justify-content-end"></div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PlaceCard;

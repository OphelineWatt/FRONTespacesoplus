import Card from "react-bootstrap/Card";

const PlaceCard = ({ place }) => {
  return (
    <>
      {place.map((item) => (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.label}
            </Card.Subtitle>
            <Card.Text>{item.address}</Card.Text>
            <Card.Text>Note: {item.global_rating}</Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default PlaceCard;

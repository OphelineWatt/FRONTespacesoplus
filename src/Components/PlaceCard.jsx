import Card from "react-bootstrap/Card";

const PlaceCard = ({ place }) => {
  return (
 <div className="d-flex flex-wrap gap-4 justify-content-center">
      {place.map((item, index) => (
        <Card
          key={index}
          style={{ width: "18rem", backgroundColor: "#d8e4cd", border: "none" }}
          className="shadow-sm"
        >
          <Card.Body>
            <Card.Title style={{ color: "#4f7b9e" }}>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2" style={{ color: "#85bce4" }}>
              {item.label}
            </Card.Subtitle>
            <Card.Text>{item.address}</Card.Text>
            <Card.Text>
              Note : {item.global_rating}
            </Card.Text>
            <div className="d-flex justify-content-between mt-3">
              <Card.Link href="#" style={{ color: "#4f7b9e" }}>
                Détails
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

  );
};

export default PlaceCard;

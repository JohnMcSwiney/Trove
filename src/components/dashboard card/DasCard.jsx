import React from "react";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

const DasCard = ({ data }) => {
  return (
    <NavLink to={data.url} style={{ textDecoration: "none" }}>
      <Card className="dashboard-cards" style={{ width: "15rem" }}>
        <Card.Body>
          <Card.Title>
            <h4>
              {data.total} {data.header}
            </h4>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{data.icon}</Card.Subtitle>
          {/* <Card.Text>
          <p>
            {data.new} New {data.unit}
          </p>
        </Card.Text> */}
        </Card.Body>
      </Card>
    </NavLink>
  );
};

export default DasCard;

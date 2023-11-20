import React from 'react';
import Card from 'react-bootstrap/Card';

function BlogTile({ blog }) {
  <div className='blogtile' style={{backgroundColor:'purple'}}></div>
  return (
    <>
      <div style={{ width: '30rem' }}>
        <Card
          style={{
            transition: 'transform 0.3s ease',
            transformOrigin: 'center center',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Card.Img
            variant="top"
            src={blog.imageUrl}
            style={{
              width: '100%', 
              height: 'auto', 
            }}
          />
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      </>
  );
}

export default BlogTile;


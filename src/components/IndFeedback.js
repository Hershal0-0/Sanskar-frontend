import React from 'react'
import {Card,CardBody,CardTitle,CardSubtitle,CardText} from 'reactstrap'

const IndFeedback = ({feedback}) => {
    return(
        <div className="mr-2">
          <Card style={{height:"270px",width:"200px"}} className="mr-1 mb-2" >
            {/* <CardImg top width="100%" src="" alt="Card image cap" /> */}
            <div className="d-flex justify-content-end">        
            </div>
            <CardBody style={{overflow:"auto"}}> 
              <CardTitle tag="h5">{feedback.name}</CardTitle><hr/>
              {/* <CardSubtitle tag="h6" className="mb-2 text-muted">{feedback.email}</CardSubtitle> */}
              <CardText>          
                  {feedback.feedback}      
              </CardText>
            </CardBody>
          </Card>
        </div>
        )
}

export default IndFeedback

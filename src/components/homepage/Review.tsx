import React, { useState } from "react";
import { Rate, Input, Button, Card, Typography } from "antd";
import { useAppSelector } from "../../redux/hook";
import Container from "../ui/Container";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;

interface Review {
  rating: number;
  feedback: string;
  user: string; // Assume you want to show the user's name
}

const Review: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (rating && feedback) {
      const newReview = {
        rating,
        feedback,
        user: user?.name || "Anonymous", // Use the user's name or 'Anonymous'
      };
      setReviews([...reviews, newReview]);
      setRating(0);
      setFeedback("");
    }
  };



  // Calculate the average rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="">
      <Container>
        <div className="relative bg-white my-shadow-1 rounded-md p-4">
          <CommonSectionBanner
            title="Review"
            subTitle="Share your thoughts and help us improve!"
            align="left"
          />

          {!user && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-md z-50">
              <Typography.Title level={4} style={{ color: 'white' }}>
                Please log in to leave a review
              </Typography.Title>
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  className="cursor-pointer"
                  onClick={()=> navigate('/signin')}
                >
                  Signin
                </Button>
            </div>
          )}

          <div className={`${!user && 'opacity-50'}`}>
            <div className="my-10">
              <Rate onChange={setRating} value={rating} disabled={!user} />
              <TextArea
                rows={4}
                placeholder="Leave your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={!user}
              />
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{ marginTop: "10px" }}
                disabled={!user}
              >
                Submit
              </Button>
            </div>
            <div className="rounded-md my-shadow-1 my-4 p-7">
              <Typography.Title level={4}>
                Average Rating: {averageRating.toFixed(1)} / 5
              </Typography.Title>
            </div>
            <div>
              <h3>Latest Reviews</h3>
              {reviews.slice(-2).map((review, index) => (
                <Card key={index} style={{ marginBottom: "10px" }}>
                  <Rate disabled value={review.rating} />
                  <Typography.Paragraph>{review.feedback}</Typography.Paragraph>
                  <Typography.Text type="secondary">
                    - {review.user}
                  </Typography.Text>
                </Card>
              ))}
            </div>
          </div>

          <Button
            type="default"
            onClick={() => {
              /* Redirect to Reviews page */
            }}
          >
            See All Reviews
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Review;

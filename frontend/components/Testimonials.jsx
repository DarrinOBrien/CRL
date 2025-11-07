import Quote from '/src/assets/quote.svg';
import Generic from '/src/assets/genericProfilePic.jpg'
import { reviews } from './reviewData';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';


const Testimonial = () => {
  return (
    <section className='testimonial-container'>
      <div className="title">
        <h1>Testimonials</h1>
      </div>

      <div className='slider-container'>
        <blockquote>
            <img className="top-quote quote" src={Quote} alt="quote"/>
            <img className="bottom-quote quote" src={Quote} alt="quote"/>
        </blockquote>
        <div className="testimonial-background">
          <Splide options={{ perPage: 1, arrows: false, pagination: true , autoplay: true, speed: 1000, rewind:true, rewindByDrag: true}}>
            {reviews.map((review) => (
              <SplideSlide key={review.id}>
                <div className="testimonial-slide">
                  <img src={review.image} className='review-img' alt='' />
                  {/* <img src={Generic} className='review-img' alt='' /> */}
                  <div className="content">
                    <p className="text">{review.text}</p>
                    <div className="info">
                      <p className='user'>{review.name}</p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
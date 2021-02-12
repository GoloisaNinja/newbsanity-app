import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitContact } from '../actions/contact';
import Alert from './Alert';

const About = ({ submitContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { name, email, subject, message } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    submitContact(formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Fragment>
      <Alert />
      <div className='content-container'>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>About</span>{' '}
            <span className='low-weight-span'> Us</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            NEWBSANITY is for anyone who embraces the thrill of a challenge. To
            us NEWBSANITY is not just a name, it is a lifestyle. We are part
            adrenaline junkie, part fitness enthusiast and definitely on the fun
            side of crazy. As a member of this group you will have the
            opportunity to participate in events, activities and adventures that
            you will be proud to accomplish...and your friends will actually
            want to hear about.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            At the heart of NEWBSANITY is the idea: “Live Life on the Edge.” We
            create unique events and corporate outings that are both challenging
            and fun. Our events, such as the Mud Gauntlet, Extreme Ravine 5K and
            Commando Cup, leave participants feeling a combination of
            exhilaration and exhaustion.
          </p>
        </div>
        <h3>
          <span className='red-span'>The</span>{' '}
          <span className='low-weight-span'>Founders</span>
        </h3>
        <Fragment>
          <div className='flex-container'>
            <div>
              <img
                className='about-img'
                loading='lazy'
                src='/img/jerM1.jpg'
                alt='jerry'
                onMouseOver={(e) => (e.currentTarget.src = '/img/jerM2.jpg')}
                onMouseOut={(e) => (e.currentTarget.src = '/img/jerM1.jpg')}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
              }}>
              <h3 className='event-title'>
                Jarrett <span className='low-weight-span'>D. Newby</span>
              </h3>
              <p className='event-text'>
                When it comes to NEWBSANITY, Jarry is the obstacle building
                guru. He brings over 30 years of experience in construction and
                land development. His ability to create well-built and
                challenging structures enables NEWBSANITY to offer obstacles
                that go toe-to-toe with any of the national event brands. With
                an additional 10+ years of event management experience as a
                professional motocross race official, he knows how to make event
                day run smoothly. In his spare time, he enjoys being a certified
                badass: he races motocross, runs marathons and is a 4-time age
                group winner at World’s Toughest Mudder!
              </p>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className='flex-container'>
            <div>
              <img
                className='about-img'
                loading='lazy'
                src='/img/jar1.jpg'
                alt='jerry'
                onMouseOver={(e) => (e.currentTarget.src = '/img/jarM2.jpg')}
                onMouseOut={(e) => (e.currentTarget.src = '/img/jar1.jpg')}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
              }}>
              <h3 className='event-title'>
                Jarrett <span className='low-weight-span'>S. Newby</span>
              </h3>
              <p className='event-text'>
                When it comes to NEWBSANITY, Jarrett is the brains and good
                looks behind the operation (He also writes the
                marketing/informational materials...like this website).
                Jarrett’s background includes time working at the NCAA, where he
                was involved in event management for various championships and
                5+ year with the professional motocross series as a race
                official. He is a former Division I track & field/cross country
                stand-out and more recently a 3-time World’s Toughest Mudder
                competitor, with a best finish of 8th overall. Jarrett’s other
                hobbies include: motocross, hiking, triathlons and crossfit.
              </p>
            </div>
          </div>
        </Fragment>
        <h3>
          <span className='red-span'>Life</span>{' '}
          <span className='low-weight-span'>on the edge</span>
        </h3>
        <Fragment>
          <div className='flex-container'>
            <div>
              <img
                className='about-img'
                loading='lazy'
                src='/img/jerjar.jpg'
                alt='father and son'
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1000px',
              }}>
              <h3 className='event-title'>
                Father <span className='low-weight-span'>And Son</span>
              </h3>
              <p className='event-text'>
                Whether it’s riding motocross, competing in 24-hour obstacle mud
                races or waterskiing around icebergs, these two embrace the
                NEWBSANITY motto of “Live Life on the Edge.” Their quest for new
                and exciting adventures and the desire to share these
                experiences with others is how NEWBSANITY was born. Together
                they form a team that is passionate about creating unique events
                that participants will have fun doing and be proud to
                accomplish.
              </p>
            </div>
          </div>
        </Fragment>
        <div className='landing-intro'>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className='red-span'>Contact</span>{' '}
            <span className='low-weight-span'> Us</span>
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Want to reach out? We'd love to hear from you! Maybe you've got
            questions like: "How does the Worst Birthday Ever Work?" or "Did you
            really challenge *Justin to sleep in an obstacle all night and burn
            his shirt when he failed?". Or maybe you'd just like more
            information on an event/obstacle. Just fill out the contact form
            below and one of our helpful representatives will be in touch!
          </p>
          <p style={{ fontSize: '1rem' }}>*yes</p>
        </div>
        <h3 style={{ marginBottom: '2rem' }}>
          <span className='red-span'>Contact </span>{' '}
          <span className='low-weight-span'>Form</span>
        </h3>
        <div className='form-container'>
          <form className='form-login' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                className='form-input'
                type='text'
                required
                id='name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}></input>
              <label className='form-label'>Your Name</label>
            </div>
            <div className='form-group'>
              <input
                className='form-input'
                type='email'
                required
                id='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}></input>
              <label className='form-label'>your email</label>
            </div>
            <div className='form-group'>
              <input
                className='form-input'
                type='text'
                required
                id='subject'
                name='subject'
                value={subject}
                onChange={(e) => onChange(e)}></input>
              <label className='form-label'>Subject</label>
            </div>
            <div className='form-group'>
              <textarea
                className='form-input'
                type='text'
                required
                cols='6'
                rows='10'
                maxLength='500'
                id='message'
                name='message'
                value={message}
                onChange={(e) => onChange(e)}></textarea>
              <label className='form-label'>your message</label>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.2rem' }} id='message-count'>
                  {500 - message.length} characters remaining
                </span>
              </div>
            </div>

            <button className='btn'>Submit Contact Form</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

About.propTypes = {
  submitContact: PropTypes.func.isRequired,
};

export default connect(null, { submitContact })(About);

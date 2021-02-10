import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getProfile } from '../../../actions/profile';
import Alert from '../../Alert';

const CreateProfileForm = ({
  user: { _id },
  profile: { loading, profile },
  createProfile,
  getProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    bio: '',
    age: 1,
    gender: '',
    location: '',
    careerfield: '',
    currentfitnesslevel: '',
    goalfitnesslevel: '',
    hobbies: '',
    personalwebsite: '',
    facebook: '',
    twitter: '',
    instagram: '',
    reddit: '',
    linkedin: '',
    youtube: '',
  });

  const {
    bio,
    age,
    gender,
    location,
    careerfield,
    currentfitnesslevel,
    goalfitnesslevel,
    hobbies,
    personalwebsite,
    facebook,
    twitter,
    instagram,
    reddit,
    linkedin,
    youtube,
  } = formData;

  const [socialToggle, setSocialToggle] = useState(false);

  useEffect(() => {
    getProfile(_id);
    profile !== null &&
      setFormData({
        bio: loading || !profile.bio ? '' : profile.bio,
        age: loading || !profile.age ? 1 : profile.age,
        gender: loading || !profile.gender ? '' : profile.gender,
        location: loading || !profile.location ? '' : profile.location,
        careerfield: loading || !profile.careerfield ? '' : profile.careerfield,
        currentfitnesslevel:
          loading || !profile.currentfitnesslevel
            ? ''
            : profile.currentfitnesslevel,
        goalfitnesslevel:
          loading || !profile.goalfitnesslevel ? '' : profile.goalfitnesslevel,
        hobbies: loading || !profile.hobbies ? '' : profile.hobbies.join(','),
        personalwebsite:
          loading || !profile.personalwebsite ? '' : profile.personalwebsite,
        facebook:
          loading || !profile.social.facebook ? '' : profile.social.facebook,
        twitter:
          loading || !profile.social.twitter ? '' : profile.social.twitter,
        instagram:
          loading || !profile.social.instagram ? '' : profile.social.instagram,
        reddit: loading || !profile.social.reddit ? '' : profile.social.reddit,
        linkedin:
          loading || !profile.social.linkedin ? '' : profile.social.linkedin,
        youtube:
          loading || !profile.social.youtube ? '' : profile.social.youtube,
      });
  }, [loading, getProfile, profile, _id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (profile === null) {
      createProfile(formData, history);
    } else {
      createProfile(formData, history, true);
    }
  };

  return (
    <div className='content-container'>
      <Alert />
      <div style={{ marginBottom: '2rem' }}>
        <Link to='/dashboard' className='btn profile-social'>
          Go Back to Dashboard
        </Link>
      </div>
      <div className='landing-intro'>
        <h1 style={{ marginBottom: '1rem' }}>
          <span className='red-span'>Create/Edit</span>{' '}
          <span className='low-weight-span'>your profile</span>
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Thank you for joining the Newbsanity community! Your profile can be as
          rich or as thin as you like. There are no required fields. Age and
          gender, if filled out, might be used to assist our event co-ordinators
          with age/gender bracketing.
        </p>
      </div>

      <div className='form-container'>
        <form className='form-profile' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label className='profile-label' htmlFor='bio'>
              Short Bio: Tell us about yourself...
            </label>
            <textarea
              className='form-input'
              placeholder='i like magnets but not CGI Yoda...'
              cols='30'
              rows='4'
              id='bio'
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='age'>
              Age
            </label>
            <input
              className='form-input'
              type='number'
              min='1'
              max='125'
              id='age'
              name='age'
              value={age}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='gender'>
              Gender
            </label>
            <input
              className='form-input'
              type='text'
              id='gender'
              name='gender'
              value={gender}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='location'>
              Location
            </label>
            <input
              className='form-input'
              placeholder='boston, ma'
              type='text'
              id='location'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='careerfield'>
              Career Field
            </label>
            <input
              className='form-input'
              placeholder='sugar cube design'
              type='text'
              id='careerfield'
              name='careerfield'
              value={careerfield}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='location'>
              Current Fitness Level
            </label>
            <select
              value={currentfitnesslevel}
              className='form-input'
              name='currentfitnesslevel'
              onChange={(e) => onChange(e)}>
              <option value='0'>Choose current fitness level</option>
              <option value='Patrick Star'>Patrick Star</option>
              <option value='Spongebob'>SpongeBob</option>
              <option value='Squilliam Fancyson'>Squilliam Fancyson</option>
              <option value='Larry the Lobster'>Larry the Lobster</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='location'>
              Goal Fitness Level
            </label>
            <select
              value={goalfitnesslevel}
              className='form-input'
              name='goalfitnesslevel'
              onChange={(e) => onChange(e)}>
              <option value='0'>Choose goal fitness level</option>
              <option value='Patrick Star'>Patrick Star</option>
              <option value='Spongebob'>SpongeBob</option>
              <option value='Squilliam Fancyson'>Squilliam Fancyson</option>
              <option value='Larry the Lobster'>Larry the Lobster</option>
            </select>
          </div>
          <div className='form-group'>
            <label className='profile-label' htmlFor='hobbies'>
              Tell us about your interests: MUST use comma separated values!
              (e.g. pogs, keytars, trapper keepers)
            </label>
            <input
              className='form-input'
              placeholder='dogs, whistles, dog whistles'
              type='text'
              id='hobbies'
              name='hobbies'
              value={hobbies}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div style={{ width: '100%' }}>
            <button
              type='button'
              className='btn profile-social'
              onClick={() => setSocialToggle(!socialToggle)}>
              {socialToggle
                ? 'hide Social network links'
                : 'show social network links'}
            </button>
          </div>
          {socialToggle && (
            <Fragment>
              <div className='form-group'>
                <i id='form-icons' className='fas fa-globe' />
                <input
                  className='form-input'
                  type='text'
                  placeholder='https://my-website.com'
                  id='personalwebsite'
                  name='personalwebsite'
                  value={personalwebsite}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-facebook-square' />
                <input
                  className='form-input'
                  type='text'
                  placeholder='https://your-profile.facebook.com'
                  id='facebook'
                  name='facebook'
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-twitter-square' />
                <input
                  className='form-input'
                  type='text'
                  placeholder='https://your-profile.twitter.com'
                  id='twitter'
                  name='twitter'
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-instagram-square' />
                <input
                  className='form-input'
                  type='text'
                  placeholder='https://your-profile.instagram.com'
                  id='instagram'
                  name='instagram'
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-reddit-square' />
                <input
                  className='form-input'
                  placeholder='https://your-profile.reddit.com'
                  type='text'
                  id='reddit'
                  name='reddit'
                  value={reddit}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-linkedin' />
                <input
                  className='form-input'
                  placeholder='https://your-profile.linkedin.com'
                  type='text'
                  id='linkedin'
                  name='linkedin'
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <i id='form-icons' className='fab fa-youtube-square' />
                <input
                  className='form-input'
                  placeholder='https://your-profile.youtube.com'
                  type='text'
                  id='youtube'
                  name='youtube'
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}
          <div>
            <input
              type='submit'
              className='btn profile-submit'
              value={
                profile === null ? 'Create your profile' : 'Edit your profile'
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

CreateProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { createProfile, getProfile })(
  withRouter(CreateProfileForm)
);

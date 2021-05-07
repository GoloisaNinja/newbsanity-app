import React from 'react';

const Footer = () => {
	return (
		<div className='footer'>
			<div style={{ margin: '0 auto', display: 'flex' }}>
				<div className='footer-sectionOne'>
					<p className='footer__text lead'>Come and Train with us!</p>
					<p className='footer__text'>Newbsanity Adventure Center</p>
					<p className='footer__text'>790 Dunham Hill Road</p>
					<p className='footer__text'>Binghamton, NY 13905</p>
					<p className='footer__text'>
						Icons made by{' '}
						<a href='https://www.freepik.com' title='Freepik'>
							Freepik
						</a>{' '}
						from{' '}
						<a href='https://www.flaticon.com/' title='Flaticon'>
							www.flaticon.com
						</a>
					</p>
				</div>
				<div className='footer-sectionTwo'>
					<p className='footer__text lead'>find us on social media!</p>
					<i className='fab fa-facebook-f' id='footer__icons' />
					<i className='fab fa-twitter' id='footer__icons' />
					<i className='fab fa-instagram' id='footer__icons' />
					<i className='fab fa-reddit-alien' id='footer__icons' />
					<i className='fab fa-linkedin' id='footer__icons' />
					<i className='fab fa-youtube' id='footer__icons last' />
					<p className='footer__text hashtag'>
						#seeing<span className='red-span'>red</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;

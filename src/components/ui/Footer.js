import React from 'react';
import { Button, Grid, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';

import footerLogo from '../../assets/logo.png';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';
import { useStyles } from './Footer-styles';

const Footer = ({ setValue, setSelectedIndex }) => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Hidden mdDown>
				<Grid container justify="center" className={classes.gridContainer}>
					<Hidden mdUp>
						<Grid item className={classes.gridItem}>
							<Grid container spacing={2}>
								<Grid item component={Link} to="/" onClick={() => setValue(0)} className={classes.link}>
									Accueil
								</Grid>
							</Grid>
						</Grid>
					</Hidden>
					<Grid item className={classes.gridItem}>
						<Grid container direction="column" spacing={2}>
							<Grid
								item
								component={Link}
								to="/services"
								onClick={() => {
									setValue(1);
									setSelectedIndex(0);
								}}
								className={classes.link}
							>
								Services
							</Grid>
							<Grid
								item
								component={Link}
								to="/project-management"
								onClick={() => {
									setValue(1);
									setSelectedIndex(1);
								}}
								className={classes.link}
							>
								Gestion de projets
							</Grid>
							<Grid
								item
								component={Link}
								to="/pomodoro"
								onClick={() => {
									setValue(1);
									setSelectedIndex(2);
								}}
								className={classes.link}
							>
								La Technique Pomodoro
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.gridItem}>
						<Grid container direction="column" spacing={2}>
							<Grid item component={Link} to="/cenator-team" onClick={() => setValue(2)} className={classes.link}>
								The Cenator Team
							</Grid>
							<Grid item component={Link} to="/cenator-team" onClick={() => setValue(2)} className={classes.link}>
								Notre Vision
							</Grid>
							<Grid item component={Link} to="/cenator-team" onClick={() => setValue(2)} className={classes.link}>
								Nos perspectives
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.gridItem}>
						<Grid container direction="column" spacing={2}>
							<Grid item component={Link} to="/about-cenator" onClick={() => setValue(3)} className={classes.link}>
								C'est quoi Cenator ?
							</Grid>
							<Grid item component={Link} to="/about-cenator" onClick={() => setValue(3)} className={classes.link}>
								L'histoire du projet
							</Grid>
							<Grid item component={Link} to="/about-cenator" onClick={() => setValue(3)} className={classes.link}>
								L'équipe derrière le projet
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.gridItem}>
						<Grid container direction="column" spacing={2}>
							<Grid item component={Link} to="/contact-us" onClick={() => setValue(4)} className={classes.link}>
								Nous Contacter
							</Grid>
							<Grid item component={Link} to="/contact-us" onClick={() => setValue(4)} className={classes.link}>
								CGU
							</Grid>
							<Grid item component={Link} to="/contact-us" onClick={() => setValue(4)} className={classes.link}>
								Mentions Légales
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			{/* <Button component={Link} to="/" disableRipple onClick={() => setValue(0)} className={classes.logoContainer}> */}
			{/* <img src={footerLogo} alt="company logo" className={classes.logo} /> */}
			{/* </Button> */}
			<Button component={Link} to="/" disableRipple onClick={() => setValue(0)} className={classes.logoContainer}>
				<img src={footerLogo} alt="Black Decorative slash" className={classes.adornment} />
			</Button>
			<Grid container justify="flex-end" spacing={2} className={classes.socialIconContainer}>
				<Grid item component={'a'} href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
					<img alt="facebook logo" src={facebook} className={classes.socialIcon} />
				</Grid>
				<Grid item component={'a'} href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
					<img alt="twitter logo" src={twitter} className={classes.socialIcon} />
				</Grid>
				<Grid item component={'a'} href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
					<img alt="instagram logo" src={instagram} className={classes.socialIcon} />
				</Grid>
			</Grid>
		</footer>
	);
};
export default Footer;

import { Button, Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../animations/landinganimation/data';
import ButtonArrow from '../ButtonArrow';
import CustomSoftwareIcon from '../../assets/Custom Software Icon.svg';

const useStyles = makeStyles((theme) => ({
	animation: {
		maxWidth: '50em',
		minWidth: '21em',
		marginTop: '2em',
		marginLeft: '10%',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '32em' // 30em
		}
	},
	estimateBtn: {
		...theme.typography.estimateBtn,
		backgroundColor: theme.palette.common.orange,
		borderRadius: 50,
		width: 145,
		height: 45,
		marginRight: 40,
		textShadow: '1px 1px 2px #000',
		'&:hover': {
			background: theme.palette.secondary.light
		}
	},
	btnContainer: {
		marginTop: '1em'
	},
	learnMoreBtnHeroBlock: {
        ...theme.typography.learnMoreBtn,
		width: 145,
		height: 45,
		fontSize: '0.9rem',
	},
    learnMoreBtnServicesBlock: {
        ...theme.typography.learnMoreBtn,
		height: 35,
		fontSize: '0.7rem',
        padding: 5
    },
	mainContainer: {
		marginTop: '5em',
		[theme.breakpoints.down('md')]: {
			marginTop: '3em'
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '2em'
		}
	},
	heroTextContainer: {
		minWidth: '21.5em',
		marginLeft: '1em',
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0
		}
	},
    specialText: {
        color: theme.palette.common.orange,
        fontFamily: "Pacifico"
    },
    subtitle: {
        marginBottom: "1em"
    }

}));

const LandingPage = () => {
	const classes = useStyles();
	const theme = useTheme();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};
	return (
		<Grid container direction="column" className={classes.mainContainer}>
			<Grid item>
				{' '}
				{/*--- Hero Block */}
				<Grid container direction="row" justify="flex-end" alignItems="center">
					<Grid item sm className={classes.heroTextContainer}>
						<Typography variant="h2" align="center">
							Bringing West Coast Technology <br /> to the midwest
						</Typography>
						<Grid container justify="center" className={classes.btnContainer}>
							<Grid item>
								<Button variant="contained" className={classes.estimateBtn}>
									Free Estimate
								</Button>
							</Grid>
							<Grid item>
								<Button variant="outlined" className={classes.learnMoreBtnHeroBlock}>
									<Typography component="span" style={{ marginRight: 10 }}>
										Learn More
									</Typography>
									<ButtonArrow fill={theme.palette.common.blue} />
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item sm className={classes.animation}>
						<Lottie options={defaultOptions} height={'100%'} width={'100%'} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				{' '}
				{/*--- Services Block */}
				<Grid container direction="row">
					<Grid item>
						<Typography variant="h4">Custom Software Development</Typography>
						<Typography variant="subtitle1" className={classes.subtitle}>Save Energy. Save Time. Save Money.</Typography>
						<Typography variant="subtitle1">
							Complete digital solutions, from investigation to <span className={classes.specialText}>celebration.</span>
						</Typography>
						<Button variant="outlined" className={classes.learnMoreBtnServicesBlock}>
							<Typography component="span" style={{ marginRight: 10 }}>
								Learn More
							</Typography>
							<ButtonArrow fill={theme.palette.common.blue} />
						</Button>
					</Grid>
                    <Grid item>
                        <img src={CustomSoftwareIcon} alt="custom software icon"/>
                    </Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default LandingPage;

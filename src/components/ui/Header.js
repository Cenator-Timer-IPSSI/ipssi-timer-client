import React, { useState, useEffect, Fragment } from 'react';
import {
	AppBar,
	Toolbar,
	Tabs,
	Tab,
	Button,
	Menu,
	MenuItem,
	useTheme,
	useMediaQuery,
	SwipeableDrawer,
	IconButton,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useStyles } from './Header-styles';
    
function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ openMenu, setOpenMenu ] = useState(false);
	const [ openDrawer, setOpenDrawer ] = useState(false);
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const toolbarList = [
		{ name: 'Accueil', link: '/', activeIndex: 0 },
		{
			name: 'Services',
			link: '/services',
			activeIndex: 1,
			ariaControls: anchorEl ? 'simple-menu' : undefined,
			hasPopup: anchorEl ? 'true' : undefined,
			mouseOver: (event) => handleClick(event)
		},
		{ name: "C'est quoi Cenator ?", link: '/about-cenator', activeIndex: 2 },
		{ name: 'La Team Cenator', link: '/cenator-team', activeIndex: 3 },
		{ name: 'Nous Contacter', link: '/contact-us', activeIndex: 4 }
	];

	const menuList = [
		{ name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
		{ name: 'Gestion de projets', link: '/project-management', activeIndex: 1, selectedIndex: 1 },
		{ name: 'La technique Pomodoro', link: '/pomodoro', activeIndex: 1, selectedIndex: 2 }
	];

	const handleChangeState = (event, newValue) => {
		return event.type === 'click' ? setValue(newValue) : null;
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = (event) => {
		setOpenMenu(false);
		setAnchorEl(null);
	};

	const handleClickItem = (event, index) => {
		setAnchorEl(null);
		setOpenMenu(false);

		setValue(1);
		setSelectedIndex(index);
	};

	useEffect(
		() => {
			[ ...toolbarList, ...menuList ].forEach((route) => {
				switch (window.location.pathname) {
					case `${route.link}`:
						if (value !== route.activeIndex) {
							setValue(route.activeIndex);
							if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
								setSelectedIndex(route.selectedIndex);
							}
						}
						break;
					default:
						break;
				}
			});
		},
		[ value, setValue, selectedIndex, setSelectedIndex, toolbarList, menuList ]
	);

	const drawer = (
		<Fragment>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onOpen={() => setOpenDrawer(true)}
				onClose={() => setOpenDrawer(false)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.marginToolbar} />
				<List disablePadding>
					{toolbarList.map((item, index) => (
						<ListItem
							key={`${item.name.trim()}${index}`}
							divider
							button
							component={Link}
							to={item.link}
							onClick={() => {
								setOpenDrawer(false);
								setValue(item.activeIndex);
							}}
							selected={item.activeIndex === value}
							classes={{ selected: classes.drawerItemSelected }}
						>
							<ListItemText className={classes.drawerItem} disableTypography>
								{item.name}
							</ListItemText>
						</ListItem>
					))}
					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						divider
						button
						classes={{ root: classes.drawerAuthItem, selected: classes.drawerItemSelected }}
						component={Link}
						to="/login"
						selected={value === 5}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Se connecter
						</ListItemText>
					</ListItem>
					<ListItem
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						divider
						button
						classes={{ root: classes.drawerAuthItem, selected: classes.drawerItemSelected }}
						component={Link}
						to="/register"
						selected={value === 5}
					>
						<ListItemText className={classes.drawerItem} disableTypography>
							Créer un compte
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton disableRipple onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
				<MenuIcon className={classes.drawerMenuIcon} />
			</IconButton>
		</Fragment>
	);

	const tabs = (
		<Fragment>
			<Tabs className={classes.tabContainer} value={value} onChange={handleChangeState} indicatorColor="primary">
				{toolbarList.map((tab, index) => (
					<Tab
						key={`${tab.name}${index}`}
						className={classes.tab}
						component={Link}
						to={tab.link}
						label={tab.name}
						aria-controls={tab.ariaControls}
						aria-haspopup={tab.hasPopup}
						onMouseOver={tab.mouseOver}
					/>
				))}
			</Tabs>
			<Button variant="contained" color="secondary" className={classes.authBtn} component={Link} to="/login">
				Se connecter
			</Button>
			<Button variant="contained" color="secondary" className={classes.authBtn} component={Link} to="/register">
				Créer un compte
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(openMenu)}
				MenuListProps={{ onMouseLeave: handleClose }}
				classes={{ paper: classes.menu }}
				style={{ zIndex: 1302 }}
				elevation={0}
				keepMounted
			>
				{menuList.map((menu, index) => (
					<MenuItem
						key={`${menu.name}${index}`}
						component={Link}
						to={menu.link}
						onClick={(event) => {
							handleClickItem(event, index);
							handleClose();
						}}
						classes={{ root: classes.menuItem, selected: classes.selectedMenuItem }}
						selected={selectedIndex === menu.selectedIndex}
					>
						{menu.name}
					</MenuItem>
				))}
			</Menu>
		</Fragment>
	);

	return (
		<Fragment>
			<ElevationScroll>
				<AppBar position="fixed" color="primary" className={classes.appBar}>
					<Toolbar disableGutters>
						<Button component={Link} to="/" disableRipple onClick={() => setValue(0)} className={classes.logoContainer}>
							<img src={logo} alt="company logo" className={classes.logo} />
						</Button>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.marginToolbar} />
		</Fragment>
	);
};

export default Header;

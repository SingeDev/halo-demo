import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
	padding: ${(p) => p.theme.space.xs} ${(p) => p.theme.space.m};
	background-color: ${(p) => p.theme.colors.bg};
	color: ${(p) => p.theme.colors.primary};
	border: ${(p) => p.theme.borders.button} ${(p) => p.theme.colors.primary};
	border-radius: ${(p) => p.theme.radii.button};
	font-size: ${(p) => p.theme.fontSizes.m};
	font-family: ${(p) => p.theme.fonts.base};
	user-select: none;
	text-decoration: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${(p) => p.theme.colors.hover};
		border-color: ${(p) => p.theme.colors.hover};
		cursor: pointer;
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;
